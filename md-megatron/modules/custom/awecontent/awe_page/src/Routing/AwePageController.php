<?php

/**
 * @file
 * Contains \Drupal\awe_page\Routing\AwePageController.
 */
namespace Drupal\awe_page\Routing;

use Drupal\awe_builder\AweBuilder\AweBuilderRender;
use Drupal\awe_builder\AweElementManager;
use Drupal\awe_page\AwePageManagerInterface;
use Drupal\Core\Routing\RouteMatchInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;

/**
 * Defines a page controller to execute and render a view.
 */
class AwePageController implements ContainerInjectionInterface {

  /**
   * @var \Drupal\awe_page\AwePageManagerInterface
   */
  protected $awePageManger;

  /**
   * @var
   */
  protected $aweElementManager;

  public function __construct(AwePageManagerInterface $awePage, AweElementManager $aweElement) {
    $this->awePageManger = $awePage;
    $this->aweElementManager = $aweElement;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('awe_page.manager'),
      $container->get('plugin.manager.awe_element')
    );
  }

  /**
   * @param \Drupal\Core\Routing\RouteMatchInterface $route_match
   * @return array
   */
  public function handle(RouteMatchInterface $route_match) {
    $elements = $this->aweElementManager->getListElement();
    $route = $route_match->getRouteObject();
    $pid = $route->getOption('_awe_page');
    $awe_page = $this->awePageManger->selectAwePage($pid);
    $settings = unserialize($awe_page['build_data']);
    $data = AweBuilderRender::processData($settings, $elements);
    $data['#contextual_links'] = [
      'awe_page' => [
        'route_parameters' => [
          'pid' => $pid
        ]
      ]
    ];

    return [
      '#theme' => 'awe_sections',
      '#el_content' => $data,
      '#el_wrap_class' => 'ac-wrapper-page-' . $pid,
      '#page_id' => $pid,
      '#cache' => [
        'tags' => ['awe_page']
      ],
      '#attached' => [
        'library' => ["awe_builder/awe_page_{$pid}"]
      ]
    ];

  }

}
