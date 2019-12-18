<?php
/**
 * @file
 * Contains \Drupal\awe_builder\Plugin\AweElement\AlertAweElement.
 */
namespace Drupal\awe_infobox\Plugin\AweElement;

use Drupal\awe_builder\AweElementBase;

/**
 * Provides a 'text' AweElement.
 *
 * @AweElement(
 *   id = "infobox",
 *   title = @Translation("Infobox"),
 *   name = "el-infobox",
 *   theme = "el_infobox",
 *   belongTheme = true
 * )
 */

class InfoboxAweElement extends AweElementBase {

  /**
   * {@inheritdoc}
   */
  public function defineLibraries() {
    $libraries = [
      'id'=>'infobox',
      'title' => t('Infobox'),
      'name' => 'el-infobox',
      'theme' => 'el_infobox',
      'jsFile' => 'el-infobox.js',
      'jsTemplate' => 'el-infobox.tpl.js',
	  'libraries'=>array(
        'elInfobox'=>array(
          'destination'=>array('frontend'),
          'files'=>array(
            'el-infobox.css'=>array('type'=>'css')
          )
        )
      )
    ];

    return $libraries;
  }
}