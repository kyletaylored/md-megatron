<?php

/**
 * @file
 * Contains \Drupal\awe_field\Plugin\Field\FieldType\AweBuilderItem.
 */
namespace Drupal\awe_field\Plugin\Field\FieldType;

use Drupal\awe_builder\AweBuilder\AweBuilderLibraries;
use Drupal\awe_builder\AweBuilder\AweBuilderRenderStyle;
use Drupal\Component\Serialization\Json;
use Drupal\Core\Field\FieldItemBase;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\TypedData\DataDefinition;

/**
 * Plugin implementation of the 'awe_field' field type.
 *
 * @FieldType(
 *   id = "field_awe_builder",
 *   label = @Translation("AweContent"),
 *   module = "awe_field",
 *   description = @Translation("Create content with drag, drop."),
 *   default_widget = "awe_builder_widget",
 *   default_formatter = "awe_builder_formatter"
 * )
 */
class AweBuilderItem extends FieldItemBase {
  /**
   * {@inheritdoc}
   */
  public static function schema(FieldStorageDefinitionInterface $field_definition) {
    return [
      'columns' => [
        'value' => [
          'type' => 'blob',
          'size' => 'big',
          'not null' => FALSE,
        ],
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function isEmpty() {
    $value = $this->get('value')->getValue();
    return $value === NULL || $value === '';
  }

  /**
   * {@inheritdoc}
   */
  public static function propertyDefinitions(FieldStorageDefinitionInterface $field_definition) {
    $properties['value'] = DataDefinition::create('string')
      ->setLabel(t('Awe Builder'));

    return $properties;
  }

  /**
   * {@inheritdoc}
   */
  public function preSave() {
    $value = $this->get('value')->getValue();
    $data = Json::decode($value);

    // Get libraries of page
    $libraries = new AweBuilderLibraries($data);
    $files = $libraries->getLibraries();

    // Save css file
    $id = $this->getEntity()->id();
    $entityType = $this->getEntity()->getEntityType()->id();
    $bundle = $this->getEntity()->bundle();
    $wrap_class = "ac-wrapper-field-{$entityType}_{$bundle}_{$id}";
    $style = new AweBuilderRenderStyle($data, $wrap_class);

    $css = $style->saveFileCss('field', "awe_field_{$entityType}_{$bundle}_{$id}");
    $files['css']['theme'][$css] = [];

    $config = \Drupal::service('config.factory')
      ->getEditable('awe_field.libraries');

    $config->set("awe_field_{$entityType}_{$bundle}_{$id}", serialize($files));
    $config->save();

    // Clear cache
    \Drupal::service('library.discovery')->clearCachedDefinitions();

    //Reset config AweField
    $config = \Drupal::service('config.factory')
      ->getEditable('awe_field.setting');
    $config->set("{$entityType}.{$bundle}", 0);
    $config->save();
  }



}
