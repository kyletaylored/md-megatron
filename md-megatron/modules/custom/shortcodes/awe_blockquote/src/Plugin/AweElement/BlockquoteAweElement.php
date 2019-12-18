<?php
/**
 * @file
 * Contains \Drupal\awe_builder\Plugin\AweElement\AlertAweElement.
 */
namespace Drupal\awe_blockquote\Plugin\AweElement;

use Drupal\awe_builder\AweElementBase;

/**
 * Provides a 'text' AweElement.
 *
 * @AweElement(
 *   id = "blockquote",
 *   title = @Translation("Blockquote"),
 *   name = "el-blockquote",
 *   theme = "el_blockquote",
 *   belongTheme = true
 * )
 */

class BlockquoteAweElement extends AweElementBase {

  /**
   * {@inheritdoc}
   */
  public function defineLibraries() {
    $libraries = [
      'id'=>'blockquote',
      'title' => t('Blockquote'),
      'name' => 'el-blockquote',
      'theme' => 'el_blockquote',
      'jsFile' => 'el-blockquote.js',
      'jsTemplate' => 'el-blockquote.tpl.js',
	  'libraries'=>array(
        'elBlockquote'=>array(
          'destination'=>array('frontend'),
          'files'=>array(
            'el-blockquote.css'=>array('type'=>'css')
          )
        )
      )
    ];

    return $libraries;
  }
}