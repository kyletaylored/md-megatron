<?php

/**
 * @file
 * Enables modules and site configuration for a standard site installation.
 */

use Drupal\contact\Entity\ContactForm;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Config\ConfigFactoryInterface;

/**
 * Implements hook_form_FORM_ID_alter() for install_configure_form().
 *
 * Allows the profile to alter the site configuration form.
 */
function mdmegatron_logistics_form_install_configure_form_alter(&$form, FormStateInterface $form_state) {
  $form['site_information']['site_name']['#default_value'] = 'MD Megatron Logistics';
  $form['#submit'][] = 'mdmegatron_logistics_form_install_configure_submit';
}

/**
 * Submission handler to sync the contact.form.feedback recipient.
 */
function mdmegatron_logistics_form_install_configure_submit($form, FormStateInterface $form_state) {
  global $user;
  $sql_file = dirname(__FILE__) . '/mdmegatron_logistics.sql';
  $count = mdmegatron_logistics_import_sql($sql_file);  
  drupal_set_message("For security purposes, it's recommended that you delete $sql_file, or it out of your webroot.");
  $config = \Drupal::getContainer()->get('config.factory')->getEditable('system.site'); 
  $config->set('name', $form_state->getValue('site_name'))
    ->set('mail', $form_state->getValue('site_mail'))
    ->save();
  //set contact email
  Drupal::getContainer()->get('config.factory')->getEditable('contact.form.feedback')->set('recipients', array($form_state->getValue('site_mail')))->save();
  
  $configDate = \Drupal::getContainer()->get('config.factory')->getEditable('system.date');
  $timezone = $configDate->get('timezone');
  $timezone['default'] = $form_state->getValue('date_default_timezone');
  $country = $configDate->get('country');
  $country['default'] = $form_state->getValue('site_default_country');
  $configDate->set('timezone', $timezone)
    ->set('country', $country)
    ->save();

  // Enable update.module if this option was selected.
  if ($form_state->getValue('enable_update_status_module')) {   
    \Drupal::service('module_installer')->install(array('update'), FALSE);
  }
  // Add the site maintenance account's email address to the list of
  // addresses to be notified when updates are available, if selected.
  if ($form_state->getValue('enable_update_status_emails')) {
    $configSettings = \Drupal::getContainer()->get('config.factory')->getEditable('update.settings');
    $notification = $configSettings->get('notification');
    $notification['emails'][0] = $form_state->getValue('account')['mail'];
    $configSettings->set('notification', $notification)->save();
  }

  // We precreated user 1 with placeholder values. Let's save the real values.
  $account = user_load(1);   
  $merge_data = array('init' => $form_state->getValue('account')['mail'], 'roles' => !empty($account->getRoles()) ? $account->getRoles() : array(), 'status' => 1);
  $merge_data = array_merge($form_state->getValue('account'), $merge_data);
  // update account
  $account->setUsername($merge_data['name']);
  $account->setExistingPassword($merge_data['pass']);
  $account->setEmail($merge_data['mail']);
  $account->set('roles', $merge_data['roles']);
  $account->set('status', $merge_data['status']);
  $account->save(); 
  
  // Record when this install ran.
  \Drupal::state()->set('install_time', $_SERVER['REQUEST_TIME']);
  
  // Load global $user and perform final login tasks.
  $user = user_load(1);
  user_login_finalize($user);
}

function mdmegatron_logistics_import_sql($filename) {
  $databasesName = array(
    "pgsql" => "PostgreSQL",
    "sqlite" => "SQLite"
  );
  
  $db = \Drupal::database();
  // Backup current settings site
  $cron_key = \Drupal::state()->get('system.cron_key');

  $private_key = \Drupal::state()->get('system.private_key');

  // Import database from sql file
  $connectOption = $db->getConnectionOptions();
  $count = 0;
  $file = @fopen($filename, "r");
  if ($file) {
    $sql_command = "";

    // Open connect to database
    switch ($connectOption["driver"]) {
      case "mysql":
        $connect = new PDO(sprintf("mysql:host=%s;port=%s;dbname=%s", $connectOption["host"], $connectOption["port"], $connectOption["database"]), $connectOption["username"], $connectOption["password"]);
        break;

      case "pgsql":
        $connect = NULL;
        break;

      case "sqlite":
        $connect = NULL;
    }
    
    if ($connect) {
      while (!feof($file)) {
        $line = fgets($file);
        $sql_command .= $line;

        if (preg_match('|;$|', $line)) {
          try {
            $connect->exec(mdmegatron_logistics_prefixTables($sql_command));
          } catch (PDOException $ex) {
            pass;
          }
          $sql_command = "";
          $count++;
        }
      }
      
      \Drupal::state()->set('system.cron_key', $cron_key);
      \Drupal::state()->set('system.private_key', $private_key);
      drupal_set_message(t("Import demo data successful."));

      // Close database connection
      $connect = NULL;
    }
    else {
      drupal_set_message(t(sprintf("Import demo data unsuccessful. We are only support demo data for MySQL database. You are using %s database.", $databasesName[$databases["default"]["default"]["driver"]])), "warning");
    }

    fclose($file);
  }

  return $count;
}

function mdmegatron_logistics_prefixTables($sql) {
  $db = \Drupal::database();
  $connectOption = $db->getConnectionOptions();
  $prefix = isset($connectOption["prefix"]["default"]) ? $connectOption["prefix"]["default"] : '';
  return str_replace("md8_", $prefix, $sql);
}