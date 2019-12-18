<?php
/**
 * @file
 * Contains \Drupal\awe_builder\Plugin\AweElement\AlertAweElement.
 */
namespace Drupal\awe_pricing\Plugin\AweElement;

use Drupal\awe_builder\AweElementBase;

/**
 * Provides a 'text' AweElement.
 *
 * @AweElement(
 *   id = "pricing",
 *   title = @Translation("Pricing"),
 *   name = "el-pricing",
 *   theme = "el_pricing",
 *   belongTheme = true
 * )
 */

class PricingAweElement extends AweElementBase {

  /**
   * {@inheritdoc}
   */
  public function defineLibraries() {
    $libraries = [
      'id'=>'pricing',
      'title' => t('Pricing'),
      'name' => 'el-pricing',
      'theme' => 'el_pricing',
      'jsFile' => 'el-pricing.js',
      'jsTemplate' => 'el-pricing.tpl.js',
	  'libraries'=>array(
        'elPricing'=>array(
          'destination'=>array('frontend'),
          'files'=>array(
            'el-pricing.css'=>array('type'=>'css')
          )
        )
      )
    ];

    return $libraries;
  }
}