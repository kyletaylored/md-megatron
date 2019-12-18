<?php
/**
 * @file
 * Contains \Drupal\awe_builder\Plugin\AweElement\AlertAweElement.
 */
namespace Drupal\awe_feature\Plugin\AweElement;

use Drupal\awe_builder\AweElementBase;

/**
 * Provides a 'text' AweElement.
 *
 * @AweElement(
 *   id = "feature",
 *   title = @Translation("Feature"),
 *   name = "el-feature",
 *   theme = "el_feature",
 *   belongTheme = true
 * )
 */

class FeatureAweElement extends AweElementBase {

  /**
   * {@inheritdoc}
   */
  public function defineLibraries() {
    $libraries = [
      'id'=>'feature',
      'title' => t('Feature'),
      'name' => 'el-feature',
      'theme' => 'el_feature',
      'jsFile' => 'el-feature.js',
      'jsTemplate' => 'el-feature.tpl.js',
	  'libraries'=>array(
        'elFeature'=>array(
          'destination'=>array('frontend'),
          'files'=>array(
            'el-feature.css'=>array('type'=>'css')
          )
        )
      )
    ];

    return $libraries;
  }
}