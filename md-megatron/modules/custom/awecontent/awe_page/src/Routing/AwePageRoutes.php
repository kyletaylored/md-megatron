<?php

/**
 * @file
 * Contains \Drupal\awe_page\Routing\AwePageRoutes.
 */
namespace Drupal\awe_page\Routing;

use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Routing\Route;
use Drupal\awe_page\AwePageManager;

/**
 * Defines dynamic routes.
 */
class AwePageRoutes implements ContainerInjectionInterface {
  /**
   * @var AwePageManager
   */
  protected $awePageManager;

  /**
   * List all AwePage settings
   * @var array
   */
  protected $awePage;

  /**
   * AwePageRoutes constructor.
   * @param \Drupal\awe_page\AwePageManager $awePageManager
   */
  public function __construct(AwePageManager $awePageManager) {
    $this->awePageManager = $awePageManager;
    $this->awePage = $this->getAwePageSettings();
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('awe_page.manager')
    );
  }

  public function getAwePageSettings() {

    $pages = $this->awePageManager->findAll();
    $awepages = [];

    foreach ($pages as $index => $page) {
      $settings = unserialize($page['settings']);
      $awepages[$index] = [
        'path' => $page['path'],
        'title' => $page['title'],
        'pid' => $page['pid'],
        'langcode' => $page['langcode'],
      ];
      $awepages[$index]['menu']['type'] = $settings['menu']['type'];
      if ($settings['permission']['type'] == 'none') {
        $awepages[$index]['requirements'] = [
          '_permission' => 'access content',
        ];
      }
      if ($settings['permission']['type'] == 'perm') {
        $awepages[$index]['requirements'] = [
          '_permission' => $settings['permission']['perm'],
        ];
      }
      if ($settings['permission']['type'] == 'role') {
        $roles = [];
        foreach ($settings['permission']['role'] as $role => $check) {
          if ($check !== 0) {
            $roles[] = $role;
          }
        }
        $roles = count($roles) > 0 ? $roles : array('anonymous');
        $role_string = implode('+', $roles);
        $awepages[$index]['requirements'] = [
          '_role' => $role_string,
        ];
      }
    }

    return $awepages;
  }


  /**
   * {@inheritdoc}
   */
  public function routes() {
    $routes = [];
    foreach ($this->awePage as $index => $awepage) {
      $default_tab = $awepage['menu']['type'] == 'default tab' ? 1 : 0;
      $route_path = $this->convertPath($awepage['path'], $default_tab);

      $routes['awepage.page_' . $awepage['pid']] = new Route(
        $route_path,
        array(
          '_controller' => '\Drupal\awe_page\Routing\AwePageController::handle',
          '_title' => $awepage['title'],
        ),
        $awepage['requirements'],
        array(
          '_awe_page' => $awepage['pid'],
        )
      );
    }

    return $routes;
  }

  /**
   * Convert setting to path able
   * @param $path
   * @param $default_tab
   * @return string
   */
  protected function convertPath($path, $default_tab) {
    $bits = explode('/', $path);
    $arg_counter = 0;
    foreach ($bits as $pos => $bit) {
      if ($bit == '%') {
        $arg_id = 'arg_' . $arg_counter++;
        $bits[$pos] = '{' . $arg_id . '}';
      }
      elseif (strpos($bit, '%') === 0) {
        $parameter_name = substr($bit, 1);
        $bits[$pos] = '{' . $parameter_name . '}';
      }
    }

    // If this is to be a default tab, create the route for the parent path.
    if ($default_tab) {
      $bit = array_pop($bits);
      if (empty($bits)) {
        $bits[] = $bit;
      }
    }

    $path = '/' . implode('/', $bits);

    return $path;
  }
}