<?php
/**
 * @file
 * Contains \Drupal\article\Plugin\Block\XaiBlock.
 */

namespace Drupal\nav_left\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use \Drupal\Core\Menu\MenuTreeParameters;


/**
 * Provides a 'navigation' block.
 *
 * @Block(
 *   id = "nav_left_block",
 *   admin_label = @Translation("Main Left Nav"),
 *   category = @Translation("Custom nav block")
 * )
 */
class NavLeftBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
  	$logo = theme_get_setting('logo.use_default');
	$logo_path = "";
	
	$menu = \Drupal::menuTree()->load('main', new MenuTreeParameters());
	$main_menu = \Drupal::menuTree()->build($menu);
	
	$sitename = \Drupal::config('system.site')->get('name');
	
	$block = \Drupal\block\Entity\Block::load('md_megatron_search');
	$search_block = \Drupal::entityManager()->getViewBuilder('block')->view($block);
	
	$block = \Drupal\block\Entity\Block::load('socialicons');
	$social_block = \Drupal::entityManager()->getViewBuilder('block')->view($block);
	
	if(!$logo) {
		$logo_path = theme_get_setting('logo.path');
	}
  	
  	return array(
		'#theme' => 'nav_left_template',
		'#logo' => $logo_path,
		'#menu' => $main_menu,
		'#sitename' => $sitename,
		'#search' => $search_block,
		'#social' => $social_block,
		'#base_path' => base_path()
	);
  }
}
