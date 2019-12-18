<?php

/**
 * @file
 * Contains \Drupal\awe_page\Form\AwePageImportForm.
 */
namespace Drupal\awe_page\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\awe_page\AwePageManagerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\awe_builder\AweBuilder\AweBuilderImport;
use Drupal\awe_builder\AweBuilder\AweBuilderLibraries;
use Drupal\awe_builder\AweBuilder\AweBuilderRenderStyle;
use Drupal\Core\Cache\Cache;

class AwePageImportForm extends FormBase {
  /**
   * @var \Drupal\awe_page\AwePageManagerInterface
   */
  protected $awePageManager;

  /**
   * @var \Drupal\awe_builder\AweBuilder\AweBuilderImport
   */
  protected $aweImport;

  public function __construct(AwePageManagerInterface $awePageManager, AweBuilderImport $aweImport) {
    $this->awePageManager = $awePageManager;
    $this->aweImport = $aweImport;
  }
  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('awe_page.manager'),
      $container->get('aw_builder.import')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'awe_page_import';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['import_file'] = array(
      '#type' => 'file',
      '#title' => t('File zip'),
      '#default_value' => ''
    );
    $form['bt_submit'] = array(
      '#type' => 'submit',
      '#default_value' => t('Submit')
    );
    return $form;
  }

  public function validateForm(array &$form, FormStateInterface $form_state) {
    $file = file_save_upload('import_file', array(
      'file_validate_extensions' => array('zip'),
    ));
    if ($file && isset($file[0]) && $file[0]) {
      if ($file = file_move($file[0], 'public://')) {
        // Save the file for use in the submit handler.
        $form_state->setValue('file_upload', $file);
      }
      else {
        $form_state->setErrorByName('import_file', $this->t("Failed to write the uploaded file to the site's file folder."));
      }
    }
    else {
      $form_state->setErrorByName('import_file', $this->t('No file was uploaded.'));
    }
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $file = $form_state->getValue('file_upload');
    $pages_data = $this->aweImport->importBuilderData($file);
    $user = $this->currentUser();
    foreach($pages_data as $fields){
      unset($fields['pid']);
      $fields['uid'] = $user->id();
      $fields['created'] = REQUEST_TIME;
      $pid = $this->awePageManager->insertAwePage($fields);
      $settings = unserialize($fields['settings']);
      // Get libraries of page
      $data = unserialize($fields['build_data']);
      $libraries = new AweBuilderLibraries($data);
      $files = $libraries->getLibraries();

      // Save css file
      $style = new AweBuilderRenderStyle($data, 'ac-wrapper-page-' . $pid);
      $css = $style->saveFileCss('page', "awe_page_{$pid}");
      $files['css']['theme'][$css] = [];
      $settings['libraries'] = $files;
      $fields['settings'] = serialize($settings);

      $this->awePageManager->updateAwePage($fields, $pid);
    }
    Cache::invalidateTags(['awe_page']);

    // Rebuild routing
    \Drupal::service("router.builder")->rebuild();

    // Clear cache
    \Drupal::service('library.discovery')->clearCachedDefinitions();

    drupal_set_message(t('Import pages successfully'));
  }
}