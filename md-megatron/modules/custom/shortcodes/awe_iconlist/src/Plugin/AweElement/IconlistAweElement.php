<?php
/**
 * @file
 * Contains \Drupal\awe_builder\Plugin\AweElement\AlertAweElement.
 */
namespace Drupal\awe_iconlist\Plugin\AweElement;

use Drupal\awe_builder\AweElementBase;

/**
 * Provides a 'text' AweElement.
 *
 * @AweElement(
 *   id = "iconlist",
 *   title = @Translation("Icon List"),
 *   name = "el-iconlist",
 *   theme = "el_iconlist",
 *   belongTheme = true
 * )
 */

class IconlistAweElement extends AweElementBase {

  /**
   * {@inheritdoc}
   */
  public function defineLibraries() {
    $libraries = [
      'id'=>'iconlist',
      'title' => t('Icon List'),
      'name' => 'el-iconlist',
      'theme' => 'el_iconlist',
      'jsFile' => 'el-iconlist.js',
      'jsTemplate' => 'el-iconlist.tpl.js'
    ];

    return $libraries;
  }
}