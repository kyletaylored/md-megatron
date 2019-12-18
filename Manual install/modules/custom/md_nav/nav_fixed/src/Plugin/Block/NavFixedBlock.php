<?php
/**
 * @file
 * Contains \Drupal\article\Plugin\Block\XaiBlock.
 */

namespace Drupal\nav_fixed\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use \Drupal\Core\Menu\MenuTreeParameters;


/**
 * Provides a 'navigation' block.
 *
 * @Block(
 *   id = "nav_fixed_block",
 *   admin_label = @Translation("Main Fixed Nav"),
 *   category = @Translation("Custom nav block")
 * )
 */
class NavFixedBlock extends BlockBase {

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
		'#theme' => 'nav_fixed_template',
		'#logo' => $logo_path,
		'#menu' => $main_menu,
		'#sitename' => $sitename,
		'#base_path' => base_path()
	);
  }
}
