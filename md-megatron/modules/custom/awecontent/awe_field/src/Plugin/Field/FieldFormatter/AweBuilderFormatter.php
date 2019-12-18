<?php

/**
 * @file
 * Contains \Drupal\awe_field\Plugin\Field\FieldFormatter\AweBuilderFormatter.
 */
namespace Drupal\awe_field\Plugin\Field\FieldFormatter;

use Drupal\awe_builder\AweBuilder\AweBuilderRender;
use Drupal\Component\Serialization\Json;
use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Field\FieldItemListInterface;

/**
 * Plugin implementation of the 'field_example_simple_text' formatter.
 *
 * @FieldFormatter(
 *   id = "awe_builder_formatter",
 *   module = "awe_field",
 *   label = @Translation("Awe Builder Formatter"),
 *   field_types = {
 *     "field_awe_builder"
 *   },
 *   quickedit = {
 *     "editor" = "disabled"
 *   }
 * )
 */
class AweBuilderFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $entity = $items->getEntity();
    $check_arr['eid'] = $id = $entity->id();
    $check_arr['type'] = $entityType = $entity->getEntityType()->id();
    $check_arr['bundle'] = $bundle = $entity->bundle();

    $elements = [];
    $check = TRUE;

    $post = \Drupal::request()->query->all();
    if (is_array($post) && count($post) == 3) {
      foreach ($post as $key => $value) {
        if ($value != $check_arr[$key]) {
          $check = FALSE;
          break;
        }
      }
    }
    else {
      $check = FALSE;
    }

    if ($check) {
      $elements = [
        '#markup' => '<div class="js-ac-page-wrapper ac_page-wrapper ac_guides"></div>'
      ];
      $elements['#attached'] = [
        'library' => ['awe_builder/awe_builder.iframe'],
      ];
    }
    else {
      $aweItems = \Drupal::service('plugin.manager.awe_element')
        ->getListElement();
      foreach ($items as $delta => $item) {
        $data = Json::decode($item->value);        
        $data = AweBuilderRender::processData($data, $aweItems);
        $elements[$delta] = [
          '#theme' => 'awe_sections',
          '#el_content' => $data,
          '#el_wrap_class' => "ac-wrapper-field-{$entityType}_{$bundle}_{$id}",
          '#attached' => [
            'library' => [
              "awe_field/awe_field.front",
              "awe_builder/awe_field_{$entityType}_{$bundle}_{$id}"
            ]
          ]
        ];
      }
    }
    if (\Drupal::hasService('md_fontello')) {
      $fontello = \Drupal::service('md_fontello');
      $libraries = $fontello->getListLibraries();
      foreach ($libraries as $library) {
        $elements['#attached']['library'][] = $library;
      }
    }
    $elements['#cache'] = [
      'contexts' => ['url.query_args'],
    ];

    return $elements;
  }

}
