<?php
/**
 * @file
 * Contains \Drupal\article\Plugin\Block\XaiBlock.
 */

namespace Drupal\display_title\Plugin\Block;

use Drupal\Core\Block\BlockBase;


/**
 * Provides a 'article' block.
 *
 * @Block(
 *   id = "display_title_block",
 *   admin_label = @Translation("Display Title block"),
 *   category = @Translation("Custom block")
 * )
 */
class DisplayTitleBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
  	$request = \Drupal::request();
  	$route_match = \Drupal::routeMatch();
  	$title = \Drupal::service('title_resolver')->getTitle($request, $route_match->getRouteObject());
  	
  	return array(
		'#theme' => 'display_title_template',
		'#title' => $title
	);
  }
}
