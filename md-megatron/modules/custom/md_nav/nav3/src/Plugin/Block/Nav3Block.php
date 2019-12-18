<?php
/**
 * @file
 * Contains \Drupal\article\Plugin\Block\XaiBlock.
 */

namespace Drupal\nav3\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use \Drupal\Core\Menu\MenuTreeParameters;


/**
 * Provides a 'navigation' block.
 *
 * @Block(
 *   id = "nav3_block",
 *   admin_label = @Translation("Main Nav 3"),
 *   category = @Translation("Custom nav block")
 * )
 */
class Nav3Block extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
  	$logo = theme_get_setting('logo.use_default');
	$logo_path = "";
	
	$menu = \Drupal::menuTree()->load('main', new MenuTreeParameters());
	$main_menu = \Drupal::menuTree()->build($menu);
	
	$sitename = \Drupal::config('system.site')->get('name');
	
	if(!$logo) {
		$logo_path = theme_get_setting('logo.path');
	}
  	
  	return array(
		'#theme' => 'nav3_template',
		'#logo' => $logo_path,
		'#menu' => $main_menu,
		'#sitename' => $sitename
	);
  }
}
