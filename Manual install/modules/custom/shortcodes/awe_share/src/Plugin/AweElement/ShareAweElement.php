<?php
/**
 * @file
 * Contains \Drupal\awe_builder\Plugin\AweElement\AlertAweElement.
 */
namespace Drupal\awe_share\Plugin\AweElement;

use Drupal\awe_builder\AweElementBase;

/**
 * Provides a 'text' AweElement.
 *
 * @AweElement(
 *   id = "share",
 *   title = @Translation("Social Share"),
 *   name = "el-share",
 *   theme = "el_share",
 *   belongTheme = true
 * )
 */

class ShareAweElement extends AweElementBase {

  /**
   * {@inheritdoc}
   */
  public function defineLibraries() {
    $libraries = [
      'id'=>'share',
      'title' => t('Social Share'),
      'name' => 'el-share',
      'theme' => 'el_share',
      'jsFile' => 'el-share.js',
      'jsTemplate' => 'el-share.tpl.js',
	  'libraries'=>array(
        '$.fn.mdShare'=>array(
          'version'=>'1.0.2',
          'destination'=>array('frontend'),
          'files'=>array(
            'jquery.mdShare.js'=>array('type'=>'js')
          )
        ),
		'elService'=>array(
          'destination'=>array('frontend'),
          'files'=>array(
            'el-share.css'=>array('type'=>'css')
          )
        )
      )
    ];

    return $libraries;
  }
}