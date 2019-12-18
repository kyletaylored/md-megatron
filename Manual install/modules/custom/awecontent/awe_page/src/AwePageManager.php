<?php

/**
 * @file
 * container AwePageManager.php
 */
namespace Drupal\awe_page;

use Drupal\Core\Database\Connection;

class AwePageManager implements AwePageManagerInterface {
  /**
   * Data table name
   * @var string
   */
  protected $table = 'awe_page';

  /**
   *
   * @var \Drupal\Core\Database\Connection
   */
  protected $connection;

  /**
   * AwePageManager constructor.
   * @param \Drupal\Core\Database\Connection $connection
   */
  function __construct(Connection $connection) {
    $this->connection = $connection;
  }

  /**
   * {@inheritdoc}
   */
  public function getConnection() {
    return $this->connection;
  }

  /**
   * {@inheritdoc}
   */
  public function findAll() {
    return $this->connection->query('SELECT * FROM {awe_page}')
      ->fetchAll(\PDO::FETCH_ASSOC);
  }

  /**
   * {@inheritdoc}
   */
  public function selectAwePage($pid) {
    $db_select = $this->connection->select($this->table, 'pages')
      ->fields('pages')
      ->condition('pid', $pid, '=');
    $awe_page = $db_select->execute()->fetchAll(\PDO::FETCH_ASSOC);
    return reset($awe_page);
  }

  public function getOwnAwePage($pid) {
    $db_select = $this->connection->select($this->table, 'pages')
      ->fields('pages', array('uid'))
      ->condition('pid', $pid, '=');
    $awe_page = $db_select->execute()->fetchAll(\PDO::FETCH_ASSOC);
    return reset($awe_page);
  }
  /**
   * {@inheritdoc}
   */
  public function insertAwePage($fields = array()) {
    if (!empty($fields)) {
      return $this->connection->insert($this->table)
        ->fields($fields)
        ->execute();
    }
  }

  /**
   * {@inheritdoc}
   */
  public function updateAwePage($fields = array(), $pid) {
    if (!empty($fields)) {
      $db_update = $this->connection->update($this->table)->fields($fields)
        ->condition('pid', $pid);
      return $db_update->execute();
    }
  }

  /**
   * {@inheritdoc}
   */
  public function deleteAwePage($pid) {
    $this->connection->delete('awe_page')
      ->condition('pid', $pid)
      ->execute();
  }
}

