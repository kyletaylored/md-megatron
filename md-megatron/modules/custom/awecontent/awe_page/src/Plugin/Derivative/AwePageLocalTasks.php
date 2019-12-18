<?php

/**
 * @file
 * Contains \Drupal\awe_page\Plugin\Derivative\AwePageLocalTasks.
 */
namespace Drupal\awe_page\Plugin\Derivative;

use Drupal\awe_page\AwePageManagerInterface;
use Drupal\Component\Plugin\Derivative\DeriverBase;
use Drupal\Core\Plugin\Discovery\ContainerDeriverInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Defines dynamic local tasks.
 */
class AwePageLocalTasks extends DeriverBase implements ContainerDeriverInterface {

  /**
   * @var
   */
  protected $awepageManager;

  /**
   * The base plugin ID.
   *
   * @var string
   */
  protected $basePluginId;


  /**
   * AwePageLocalTasks constructor.
   * @param $base_plugin_id
   * @param \Drupal\awe_page\AwePageManagerInterface $awePageManager
   */
  public function __construct($base_plugin_id, AwePageManagerInterface $awePageManager) {
    $this->basePluginId = $base_plugin_id;
    $this->awepageManager = $awePageManager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, $base_plugin_id) {
    return new static(
      $base_plugin_id,
      $container->get('awe_page.manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getDerivativeDefinitions($base_plugin_definition) {
    $this->derivatives = [];
    $awepages = $this->awepageManager->findAll();
    foreach ($awepages as $index => $awepage) {
      $settings = unserialize($awepage['settings']);
      $menu = $settings['menu'];
      if ($menu['type'] == 'tab' || $menu['type'] == 'default tab') {

      }
    }
    return $this->derivatives;
  }


}