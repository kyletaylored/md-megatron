<?php
/**
 * @file
 * Contains \Drupal\awe_builder\Plugin\AweElement\AlertAweElement.
 */
namespace Drupal\awe_list\Plugin\AweElement;

use Drupal\awe_builder\AweElementBase;

/**
 * Provides a 'text' AweElement.
 *
 * @AweElement(
 *   id = "list",
 *   title = @Translation("List"),
 *   name = "el-list",
 *   theme = "el_list",
 *   belongTheme = true
 * )
 */

class ListAweElement extends AweElementBase {

  /**
   * {@inheritdoc}
   */
  public function defineLibraries() {
    $libraries = [
      'id'=>'list',
      'title' => t('List'),
      'name' => 'el-list',
      'theme' => 'el_list',
      'jsFile' => 'el-list.js',
      'jsTemplate' => 'el-list.tpl.js',
	  'libraries'=>array(
        'elList'=>array(
          'destination'=>array('frontend'),
          'files'=>array(
            'el-list.css'=>array('type'=>'css')
          )
        )
      )
    ];

    return $libraries;
  }
}