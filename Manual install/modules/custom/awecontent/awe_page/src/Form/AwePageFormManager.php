<?php

/**
 * @file
 * Contains \Drupal\awe_page\Form\AwePageFormManager.
 */
namespace Drupal\awe_page\Form;

use Drupal\awe_builder\AweBuilder\AweBuilderExport;
use Drupal\awe_page\AwePageManagerInterface;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Drupal\file\Entity\File;
use Symfony\Component\DependencyInjection\ContainerInterface;

class AwePageFormManager extends FormBase {

  /**
   * @var \Drupal\awe_page\AwePageManagerInterface
   */
  protected $awePageManager;

  protected $aweExport;

  public function __construct(AwePageManagerInterface $awePageManager, AweBuilderExport $aweExport) {
    $this->awePageManager = $awePageManager;
    $this->aweExport = $aweExport;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('awe_page.manager'),
      $container->get('aw_builder.export')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'awepage_manager_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state) {
    $awePages = $this->awePageManager->findAll();

    $form['options'] = array(
      '#type' => 'details',
      '#title' => $this->t('Update options'),
      '#open' => TRUE,
      '#attributes' => array('class' => array('container-inline')),
    );

    $options['export'] = $this->t('Export the selected awe pages');
    $options['delete'] = $this->t('Delete the selected awe pages');

    $form['options']['operation'] = array(
      '#type' => 'select',
      '#title' => $this->t('Action'),
      '#title_display' => 'invisible',
      '#options' => $options,
      '#default_value' => 'publish',
    );

    $form['options']['submit'] = array(
      '#type' => 'submit',
      '#value' => $this->t('Apply to selected items'),
    );

    $header = [
      'title' => [
        'data' => $this->t('Title'),
        'specifier' => 'title',
      ],
      'path' => [
        'data' => $this->t('Path'),
        'specifier' => 'path',
      ],
      'operations' => $this->t('Operations'),
    ];

    $options = [];
    foreach ($awePages as $index => $awePage) {
      $options[$awePage['pid']]['pid'] = $awePage['pid'];
      $options[$awePage['pid']]['title'] = [
        'data' => [
          '#type' => 'link',
          '#title' => $awePage['title'],
          '#url' => Url::fromRoute("awepage.page_{$awePage['pid']}")
        ]
      ];

      $options[$awePage['pid']]['path'] = $awePage['path'];
      $operations = [
        '#type' => 'operations',
        '#links' => [
          'edit' => [
            'url' => Url::fromRoute('awe_page.admin.edit', ['pid' => $awePage['pid']]),
            'title' => 'Edit '
          ],
          'delete' => [
            'url' => Url::fromRoute('awe_page.admin.delete', ['pid' => $awePage['pid']]),
            'title' => 'Delete'
          ],
          'clone' => [
            'url' => Url::fromRoute('awe_page.admin.clone', ['pid' => $awePage['pid']]),
            'title' => 'Clone'
          ],
        ]
      ];
      $options[$awePage['pid']]['operations'] = ['data' => $operations];
    }

    $form['awe_pages'] = [
      '#type' => 'tableselect',
      '#header' => $header,
      '#options' => $options,
      '#empty' => $this->t('No page available. <a href=":url">Add Page</a>.', array(':url' => Url::fromRoute('awe_page.admin.add')->toString())),
    ];
    return $form;
  }

  public function validateForm(array &$form, FormStateInterface $form_state) {
    $form_state->setValue('awe_pages', array_diff($form_state->getValue('awe_pages'), array(0)));

    if (count($form_state->getValue('awe_pages')) == 0) {
      $form_state->setErrorByName('', $this->t('Select one or more awe pages to perform the update on.'));
    }
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $operation = $form_state->getValue('operation');
    $pids = $form_state->getValue('awe_pages');

    if ($operation == 'delete') {
      foreach ($pids as $pid) {
        $this->awePageManager->deleteAwePage($pid);
      }
      // Rebuild routing
      \Drupal::service("router.builder")->rebuild();
      // Clear cache
      \Drupal::service('library.discovery')->clearCachedDefinitions();
      drupal_set_message($this->t('The delete has been performed.'));
      $form_state->setRedirect('awe_page.admin');
    }
    if ($operation == 'export') {
      $connection = $this->awePageManager->getConnection();
      $awe_pages = $connection->select('awe_page', 'pages')
        ->fields('pages')
        ->condition('pid', $pids, 'IN')
        ->execute()
        ->fetchAll(\PDO::FETCH_ASSOC);
      $uri = $this->aweExport->exportBuilder($awe_pages, 'page');

      $file = File::create([
        'uid' => 1,
        'uri' => $uri,
        'status' => 0,
      ]);

      $file->save();

      header('Content-disposition: attachment; filename=' . $file->getFilename());
      header('Content-type: application/zip');
      readfile(\Drupal::service('file_system')->realpath($file->getFileUri()));
      exit();
    }
  }
}