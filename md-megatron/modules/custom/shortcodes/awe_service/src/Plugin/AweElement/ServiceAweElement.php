<?php
/**
 * @file
 * Contains \Drupal\awe_builder\Plugin\AweElement\AlertAweElement.
 */
namespace Drupal\awe_service\Plugin\AweElement;

use Drupal\awe_builder\AweElementBase;

/**
 * Provides a 'text' AweElement.
 *
 * @AweElement(
 *   id = "service",
 *   title = @Translation("Service"),
 *   name = "el-service",
 *   theme = "el_service",
 *   belongTheme = true
 * )
 */

class ServiceAweElement extends AweElementBase {

  /**
   * {@inheritdoc}
   */
  public function defineLibraries() {
    $libraries = [
      'id'=>'service',
      'title' => t('Service'),
      'name' => 'el-service',
      'theme' => 'el_service',
      'jsFile' => 'el-service.js',
      'jsTemplate' => 'el-service.tpl.js',
	  'libraries'=>array(
        'elService'=>array(
          'destination'=>array('frontend'),
          'files'=>array(
            'el-service.css'=>array('type'=>'css')
          )
        )
      )
    ];

    return $libraries;
  }
}