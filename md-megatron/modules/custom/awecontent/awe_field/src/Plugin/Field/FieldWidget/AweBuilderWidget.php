<?php

/**
 * @file
 * Contains \Drupal\awe_field\Plugin\Field\FieldWidget\AweBuilderWidget.
 */
namespace Drupal\awe_field\Plugin\Field\FieldWidget;

use Drupal\awe_builder\AweBuilder\AweBuilderRender;
use Drupal\block\Entity\Block;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Url;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * Plugin implementation of the 'field_example_text' widget.
 *
 * @FieldWidget(
 *   id = "awe_builder_widget",
 *   module = "awe_field",
 *   label = @Translation("Awebuilder Field"),
 *   field_types = {
 *     "field_awe_builder"
 *   }
 * )
 */
class AweBuilderWidget extends WidgetBase {

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    $value = isset($items[$delta]->value) ? $items[$delta]->value : '{}';
    $entity = $form_state->getFormObject()->getEntity();
    $entityType = $entity->getEntityType()->id();
    $bundle = $entity->bundle();
    //Redirect to form edit entity.

    if ($entity->isNew() && $bundle && $entityType != 'field_config') {
      $config = \Drupal::service('config.factory')
        ->getEditable('awe_field.setting');
      $entityID = $config->get("{$entityType}.{$bundle}");

      //Create new Entity
      if (!$entityID) {
        $newEntity = $entity::create([
          'title' => 'AweBuilder',
          'type' => $bundle,
          'uid' => 1,
          'created' => REQUEST_TIME,
          'changed' => REQUEST_TIME,
        ]);
        $newEntity->save();

        $config->set("{$entityType}.{$bundle}", $newEntity->id());
        $config->save();
      }
      else {
        $newEntity = $entity::load($entityID);
      }

      $url = $newEntity->toUrl('edit-form')->toString();
      $response = new RedirectResponse($url);
      $response->send();
    }

    if ($entityType != 'field_config') {

      $url = $entity->toUrl('canonical')
        ->setRouteParameter('type', $entityType)
        ->setRouteParameter('bundle', $bundle)
        ->setRouteParameter('eid', $entity->id())
        ->setAbsolute()
        ->toString();

      if ($entityType == 'block_content') {
        $block_id = $this->getSettingsBlock($entity);
        $block = Block::load($block_id);
        $url = Url::fromRoute('awe_builder.admin.block_view',
          [
            'block_id' => $block_id,
            'type' => $entityType,
            'bundle' => $bundle,
            'eid' => $entity->id()
          ],
          ['absolute' => TRUE]
        )->toString();
      }

      $pathConfigurations = AweBuilderRender::getAweUrlConfig();
      $pathConfigurations['buildPage'] = $url;

      $element += [
        '#type' => 'textarea',
        '#default_value' => $value,
        '#suffix' => $this->t('<div class="ac_toolbar__group ac_enable-tooltip"><a class="ac_toolbar__button awe-btn-build awe-btn-build-normal" href="#" data-tooltip="Open AweContent"><i class="acicon acicon-pen"></i></a></div>'),
        '#attributes' => [
          'class' => ['awe-field-content', 'awe-hidden']
        ],
        '#attached' => [
          'library' => ['awe_field/awe_field.admin', 'awe_builder/toolbar.fix'],
          'drupalSettings' => [
            'pathConfigurations' => $pathConfigurations,
            'getListBlock' => Url::fromRoute('awe_builder.admin.list_block', [], ['absolute' => TRUE])
              ->toString(),
            'getPlaceBlock' => Url::fromRoute('awe_builder.admin.place_block', [], ['absolute' => TRUE])
              ->toString()
          ]
        ],
      ];
      if (\Drupal::hasService('md_fontello')) {
        $fontello = \Drupal::service('md_fontello');
        $libraries = $fontello->getListLibraries();
        foreach ($libraries as $library) {
          $element['#attached']['library'][] = $library;
        }
      }
    }
    return ['value' => $element];
  }

  protected function getSettingsBlock($entity) {
    if ($blocks = $entity->getInstances()) {
      $block_ids = array_keys($blocks);
      return $block_ids[0];
    }
    else {
      $plugin_id = 'block_content:' . $entity->uuid();
      $id = 'awe_block_' . REQUEST_TIME;
      $values = [
        'id' => $id,
        'plugin' => $plugin_id,
        'region' => -1,
        'settings' => [
          'label' => 'Awe Block',
        ],
        'theme' => \Drupal::configFactory()
          ->get('system.theme')
          ->get('default'),
        'visibility' => [],
        'weight' => 0,
      ];
      $block = Block::create($values);
      $block->save();
      $block_id = $block->id();
      return $block_id;
    }

  }

}
