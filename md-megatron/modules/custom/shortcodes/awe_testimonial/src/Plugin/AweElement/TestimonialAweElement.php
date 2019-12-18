<?php
/**
 * @file
 * Contains \Drupal\awe_builder\Plugin\AweElement\AlertAweElement.
 */
namespace Drupal\awe_testimonial\Plugin\AweElement;

use Drupal\awe_builder\AweElementBase;

/**
 * Provides a 'text' AweElement.
 *
 * @AweElement(
 *   id = "testimonial",
 *   title = @Translation("Testimonial"),
 *   name = "el-testimonial",
 *   theme = "el_testimonial",
 *   belongTheme = true
 * )
 */

class TestimonialAweElement extends AweElementBase {

  /**
   * {@inheritdoc}
   */
  public function defineLibraries() {
    $libraries = [
      'id'=>'testimonial',
      'title' => t('Testimonial'),
      'name' => 'el-testimonial',
      'theme' => 'el_testimonial',
      'jsFile' => 'el-testimonial.js',
      'jsTemplate' => 'el-testimonial.tpl.js',
	  'libraries'=>array(
        'elTestimonial'=>array(
          'destination'=>array('frontend'),
          'files'=>array(
            'el-testimonial.css'=>array('type'=>'css')
          )
        )
      )
    ];

    return $libraries;
  }
}