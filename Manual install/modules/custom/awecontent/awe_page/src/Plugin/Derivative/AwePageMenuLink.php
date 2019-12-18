<?php

/**
 * @file
 * Contains \Drupal\awe_page\Plugin\Derivative\AwePageMenuLink.
 */
namespace Drupal\awe_page\Plugin\Derivative;

use Drupal\awe_page\AwePageManager;
use Drupal\Component\Plugin\Derivative\DeriverBase;
use Drupal\Core\Plugin\Discovery\ContainerDeriverInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides menu links for Views.
 *
 * @see \Drupal\views\Plugin\Menu\ViewsMenuLink
 */
class AwePageMenuLink extends DeriverBase implements ContainerDeriverInterface {

  /**
   * @var
   */
  protected $awePageManager;

  public function __construct(AwePageManager $awePageManager) {
    $this->awePageManager = $awePageManager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, $base_plugin_id) {
    return new static(
      $container->get('awe_page.manager')
    );
  }


  /**
   * {@inheritdoc}
   */
  public function getDerivativeDefinitions($base_plugin_definition) {
    $links = [];
    $awepages = $this->awePageManager->findAll();
    foreach ($awepages as $index => $page) {
      $settings = unserialize($page['settings']);
      $menu = $settings['menu'];
      if ($menu['type'] == 'normal') {
        $menu_link_id = 'awepage.page_' . $page['pid'];
        $links[$menu_link_id] = $this->getMenuLinks($page, $menu, $page['pid']) + $base_plugin_definition;
      }
    }
    return $links;
  }

  public function getMenuLinks($page, $menu, $pid) {
    $links = [];
    $bits = explode('/', $page['path']);
    foreach ($bits as $pos => $bit) {
      if ($bit == '%') {
        return array();
      }
    }
    $path = implode('/', $bits);

    if ($path) {
        $menu_link_id = 'awepage.page_' . $page['pid'];
        // Some views might override existing paths, so we have to set the route
        // name based upon the altering.
        $links = array(
          'route_name' => $menu_link_id,
          'id' => $menu_link_id,
        );
        $links['title'] = $menu['title'];
        $links['description'] = $menu['description'];
        $links['parent'] = isset($menu['parent']) ? $menu['parent'] : '';
        $links['enabled'] = 1;
        $links['expanded'] = $menu['expanded'];

        if (isset($menu['weight'])) {
          $links['weight'] = intval($menu['weight']);
        }

        // Insert item into the proper menu.
        $links['menu_name'] = isset($menu['menu_name']) ? $menu['menu_name'] : '';
        // Keep track of where we came from.
        $links['metadata'] = array(
          'awepage' => $pid,
        );
    }

    return $links;
  }

}
