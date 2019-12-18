<?php
/**
 * @file
 * Contains \Drupal\awe_builder\Plugin\AweElement\AlertAweElement.
 */
namespace Drupal\awe_funfact\Plugin\AweElement;

use Drupal\awe_builder\AweElementBase;

/**
 * Provides a 'text' AweElement.
 *
 * @AweElement(
 *   id = "funfact",
 *   title = @Translation("Funfact"),
 *   name = "el-funfact",
 *   theme = "el_funfact",
 *   belongTheme = true
 * )
 */

class FunfactAweElement extends AweElementBase {

  /**
   * {@inheritdoc}
   */
  public function defineLibraries() {
    $libraries = [
      'id'=>'funfact',
      'title' => t('Funfact'),
      'name' => 'el-funfact',
      'theme' => 'el_funfact',
      'jsFile' => 'el-funfact.js',
      'jsTemplate' => 'el-funfact.tpl.js',
	  'libraries'=>array(
        '$.fn.countTo'=>array(
          'version'=>'1.0.2',
          'destination'=>array('frontend'),
          'files'=>array(
            'jquery.countTo.js'=>array('type'=>'js')
          )
        ),
        '$.fn.mdCounter'=>array(
          'version'=>'1.0.2',
          'destination'=>array('frontend'),
          'files'=>array(
            'jquery.mdCounter.js'=>array('type'=>'js')
          )
        ),
		'elFunfact'=>array(
          'destination'=>array('frontend'),
          'files'=>array(
            'el-funfact.css'=>array('type'=>'css')
          )
        )
      )
    ];

    return $libraries;
  }
}