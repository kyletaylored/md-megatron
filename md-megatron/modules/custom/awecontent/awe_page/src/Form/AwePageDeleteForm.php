<?php

/**
 * @file
 * Contains \Drupal\awe_page\Form\AwePageDeleteForm.
 */
namespace Drupal\awe_page\Form;


use Drupal\awe_page\AwePageManagerInterface;
use Drupal\Core\Form\ConfirmFormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AwePageDeleteForm extends ConfirmFormBase {

  /**
   * @var int AwePage ID
   */
  protected $pid;

  /**
   * @var array data awepage
   */
  protected $awePage;

  /**
   * @var \Drupal\awe_page\AwePageManagerInterface
   */
  protected $awePageManager;

  public function __construct(AwePageManagerInterface $awePageManager) {
    $this->awePageManager = $awePageManager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('awe_page.manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getDescription() {
    return $this->t('This action cannot be undone.');
  }

  /**
   * {@inheritdoc}
   */
  public function getQuestion() {
    return $this->t('Do you want to delete AwePage: %title?', array('%title' => $this->awePage['title']));
  }

  /**
   * {@inheritdoc}
   */
  public function getCancelUrl() {
    return  Url::fromRoute('awe_page.admin');
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'awe_page_delete';
  }

  /**
   * {@inheritdoc}
   *
   * @param int $pid
   *   The id of AwePage.
   */
  public function buildForm(array $form, FormStateInterface $form_state, $pid = '') {
    $this->pid = $pid;
    if (!$this->awePage = $this->awePageManager->selectAwePage($pid)) {
      throw new NotFoundHttpException();
    }
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {

    $this->awePageManager->deleteAwePage($this->pid);

    // Rebuild routing
    \Drupal::service("router.builder")->rebuild();

    // Clear cache
    \Drupal::service('library.discovery')->clearCachedDefinitions();

    drupal_set_message($this->t('The AwePage %title was deleted.', array('%title' => $this->awePage['title'])));
    $form_state->setRedirectUrl($this->getCancelUrl());

  }
}
