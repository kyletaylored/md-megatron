<?php
/**
 * @file
 * Contains \Drupal\awe_builder\Plugin\AweElement\AlertAweElement.
 */
namespace Drupal\awe_message\Plugin\AweElement;

use Drupal\awe_builder\AweElementBase;

/**
 * Provides a 'text' AweElement.
 *
 * @AweElement(
 *   id = "message",
 *   title = @Translation("Message"),
 *   name = "el-message",
 *   theme = "el_message",
 *   belongTheme = true
 * )
 */

class MessageAweElement extends AweElementBase {

  /**
   * {@inheritdoc}
   */
  public function defineLibraries() {
    $libraries = [
      'id'=>'message',
      'title' => t('Alert Message'),
      'name' => 'el-message',
      'theme' => 'el_message',
      'jsFile' => 'el-message.js',
      'jsTemplate' => 'el-message.tpl.js',
	  'libraries'=>array(
        '$.fn.aweAlert'=>array(
          'version'=> '1.0',
          'destination'=>array('frontend'),
          'files'=>array(
            'alert-frontend.js'=>array('type'=>'js')
          )
        ),
		'elMessage'=>array(
          'destination'=>array('frontend'),
          'files'=>array(
            'el-message.css'=>array('type'=>'css')
          )
        )
      )
    ];

    return $libraries;
  }
}