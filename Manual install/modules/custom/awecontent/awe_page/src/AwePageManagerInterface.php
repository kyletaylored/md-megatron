<?php

/**
 * @file
 * Contains \Drupal\awe_page\AwePageManagerInterface.
 */
namespace Drupal\awe_page;

interface AwePageManagerInterface {

  /**
   * @return \Drupal\Core\Database\Connection
   */
  public function getConnection();

  /**
   * @return \Drupal\Core\Database\StatementInterface|int|null
   */
  public function findAll();

  /**
   * Select AwePage from database
   * @param $pid
   * @return mixed
   */
  public function selectAwePage($pid);

  /**
   * Insert new AwePage to database
   * @param array $fields
   * @return \Drupal\Core\Database\StatementInterface|int|null
   */
  public function insertAwePage($fields = array());

  /**
   * Update AwePage to database
   * @param array $fields
   * @param $pid
   */
  public function updateAwePage($fields = array(), $pid);

  /**
   * Delete AwePage
   * @param $pid
   * @return mixed
   */
  public function deleteAwePage($pid);

}