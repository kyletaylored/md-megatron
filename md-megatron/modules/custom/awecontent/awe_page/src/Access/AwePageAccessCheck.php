<?php

/**
 * @file
 * Contains \Drupal\awe_page\Access\AwePageAccessCheck.
 */
namespace Drupal\awe_page\Access;

use Drupal\Core\Access\AccessResult;
use Drupal\Core\Routing\Access\AccessInterface;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\Session\AccountInterface;

class AwePageAccessCheck implements AccessInterface {

  public function access(AccountInterface $account, RouteMatchInterface $route_match) {
    $route_name = $route_match->getRouteName();

    switch ($route_name) {
      case 'awe_page.admin.add':
      case 'awe_page.admin.import':
        return AccessResult::allowedIf(
          $account->hasPermission('administer awe page')
          ||$account->hasPermission('create awe page')
        );
        break;

      case 'awe_page.admin.edit':
        if ($account->hasPermission('administer awe page') || $account->hasPermission('edit any awe page')) {
          return AccessResult::allowed();
        }
        if ($account->hasPermission('edit own awe page')) {
          $pid = $route_match->getParameter('pid');
          $awePageManager = \Drupal::service('awe_page.manager');
          $uid = $awePageManager->getOwnAwePage($pid);
          if ($uid['uid'] == $account->id()) {
            return AccessResult::allowed();
          }
        }
        return AccessResult::neutral();
        break;

      case 'awe_page.admin.delete':
        if ($account->hasPermission('administer awe page') || $account->hasPermission('delete any awe page')) {
          return AccessResult::allowed();
        }
        if ($account->hasPermission('delete own awe page')) {
          $pid = $route_match->getParameter('pid');
          $awePageManager = \Drupal::service('awe_page.manager');
          $uid = $awePageManager->getOwnAwePage($pid);
          if ($uid['uid'] == $account->id()) {
            return AccessResult::allowed();
          }
        }
        return AccessResult::neutral();
        break;

      case 'awe_page.admin.clone':
        if ($account->hasPermission('administer awe page') || $account->hasPermission('clone any awe page')) {
          return AccessResult::allowed();
        }
        if ($account->hasPermission('clone own awe page')) {
          $pid = $route_match->getParameter('pid');
          $awePageManager = \Drupal::service('awe_page.manager');
          $uid = $awePageManager->getOwnAwePage($pid);
          if ($uid['uid'] == $account->id()) {
            return AccessResult::allowed();
          }
        }
        return AccessResult::neutral();
        break;

      default:
        return AccessResult::neutral();
    }





  }
}