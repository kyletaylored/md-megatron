<?php
/**
 * @file
 * Contains \Drupal\awe_builder\Plugin\AweElement\AlertAweElement.
 */
namespace Drupal\awe_team\Plugin\AweElement;

use Drupal\awe_builder\AweElementBase;

/**
 * Provides a 'text' AweElement.
 *
 * @AweElement(
 *   id = "team",
 *   title = @Translation("Team"),
 *   name = "el-team",
 *   theme = "el_team",
 *   belongTheme = true
 * )
 */

class TeamAweElement extends AweElementBase {

  /**
   * {@inheritdoc}
   */
  public function defineLibraries() {
    $libraries = [
      'id'=>'team',
      'title' => t('Team'),
      'name' => 'el-team',
      'theme' => 'el_team',
      'jsFile' => 'el-team.js',
      'jsTemplate' => 'el-team.tpl.js',
	  'libraries'=>array(
        'elTeam'=>array(
          'destination'=>array('frontend'),
          'files'=>array(
            'el-team.css'=>array('type'=>'css')
          )
        )
      )
    ];

    return $libraries;
  }
}