<?php
/**
 * @file
 * Contains \Drupal\awe_builder\Plugin\AweElement\AlertAweElement.
 */
namespace Drupal\awe_process\Plugin\AweElement;

use Drupal\awe_builder\AweElementBase;

/**
 * Provides a 'text' AweElement.
 *
 * @AweElement(
 *   id = "process",
 *   title = @Translation("Process"),
 *   name = "el-process",
 *   theme = "el_process",
 *   belongTheme = true
 * )
 */

class ProcessAweElement extends AweElementBase {

  /**
   * {@inheritdoc}
   */
  public function defineLibraries() {
    $libraries = [
      'id'=>'process',
      'title' => t('Process'),
      'name' => 'el-process',
      'theme' => 'el_process',
      'jsFile' => 'el-process.js',
      'jsTemplate' => 'el-process.tpl.js',
	  'libraries'=>array(
        'elProcess'=>array(
          'destination'=>array('frontend'),
          'files'=>array(
            'el-process.css'=>array('type'=>'css')
          )
        )
      )
    ];

    return $libraries;
  }
}