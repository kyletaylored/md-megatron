<?php

/**
 * @file
 * Contains \Drupal\awe_page\Routing\ExampleRoutes.
 */
namespace Drupal\awe_page\Controller;

use Drupal\awe_page\AwePageManagerInterface;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Link;
use Drupal\Core\Routing\CurrentRouteMatch;
use Drupal\Core\Url;
use Symfony\Component\DependencyInjection\ContainerInterface;

class AwePageController extends ControllerBase {

  protected $route_match;

  protected $awePageManager;

  /**
   * AwePageController constructor.
   * @param \Drupal\Core\Routing\CurrentRouteMatch $route_match
   * @param \Drupal\awe_page\AwePageManagerInterface $awePageManager
   */
  public function __construct(CurrentRouteMatch $route_match, AwePageManagerInterface $awePageManager) {
    $this->route_match = $route_match;
    $this->awePageManager = $awePageManager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('current_route_match'),
      $container->get('awe_page.manager')
    );
  }

  /**
   *
   */
  public function listAwePage() {
    $awePages = $this->awePageManager->findAll();

    $header = [
      'page-title' => $this->t('Title'),
      'path' => $this->t('Path'),
      'operations' => $this->t('Operations')
    ];

    $rows = [];
    foreach ($awePages as $index => $awePage) {
      $url = Url::fromRoute("awepage.page_{$awePage['pid']}");
      $rows[$index]['page-title'] = Link::fromTextAndUrl($awePage['title'], $url);
      $rows[$index]['path'] = $awePage['path'];
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
      $rows[$index]['operations'] = ['data' => $operations];
    }

    return [
      '#theme' => 'table',
      '#header' => $header,
      '#rows' => $rows,
      '#empty' => $this->t('No page available. <a href=":url">Add page</a>.', array(':url' => Url::fromRoute('awe_page.admin.add')->toString())),
      '#attributes' => array('id' => 'md-slider'),
    ];
  }

  /**
   * @return mixed
   */
  public function pageIframe() {
    $build['#attached']['library'][] = 'awe_page/awe_page.iframe';
    if (\Drupal::hasService('md_fontello')) {
      $fontello = \Drupal::service('md_fontello');
      $libraries = $fontello->getListLibraries();
      foreach ($libraries as $library) {
        $build['#attached']['library'][] = $library;
      }
    }
    $build['#markup'] = '<div class="js-ac-page-wrapper ac_page-wrapper awe-page-wrapper ac_guides"></div>';
    return $build;
  }

}