<?php

/**
 * @file
 * Contains \Drupal\awe_page\Form\AwePageForm.
 */
namespace Drupal\awe_page\Form;

use Drupal\awe_builder\AweBuilder\AweBuilderLibraries;
use Drupal\awe_builder\AweBuilder\AweBuilderRender;
use Drupal\awe_builder\AweBuilder\AweBuilderRenderStyle;
use Drupal\Component\Serialization\Json;
use Drupal\Component\Utility\UrlHelper;
use Drupal\Core\Cache\Cache;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Language\LanguageInterface;
use Drupal\Core\Routing\RequestContext;
use Drupal\Core\Url;
use Drupal\user\PermissionHandlerInterface;
use Drupal\user\RoleStorageInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\awe_page\AwePageManagerInterface;


class AwePageForm extends FormBase {

  /**
   * @var string
   */
  protected $activeTheme;

  /**
   * @var
   */
  protected $themeHandler;

  /**
   * @var bool
   */
  protected $isNew = TRUE;

  /**
   * @var array
   */
  protected $regions;

  /**
   * @var \Drupal\user\PermissionHandlerInterface
   */
  protected $permissionHandler;

  /**
   * @var \Drupal\user\RoleStorageInterface
   */
  protected $roleStorage;

  /**
   * @var \Drupal\Core\Extension\ModuleHandlerInterface
   */
  protected $moduleHandler;

  /**
   * @var \Drupal\awe_page\AwePageManager|\Drupal\awe_page\AwePageManagerInterface
   */
  protected $awePageManager;

  /**
   * @var array
   */
  protected $options;

  /**
   * @var int ID of AwePage
   */
  protected $pid;

  /**
   * The request context.
   *
   * @var \Drupal\Core\Routing\RequestContext
   */
  protected $requestContext;

  /**
   * AwePageForm constructor.
   * @param \Drupal\user\PermissionHandlerInterface $permission_handler
   * @param \Drupal\user\RoleStorageInterface $role_storage
   * @param \Drupal\Core\Extension\ModuleHandlerInterface $module_handler
   * @param \Drupal\awe_page\AwePageManager|\Drupal\awe_page\AwePageManagerInterface $awePageManager
   * @param \Drupal\Core\Routing\RequestContext $request_context
   * @internal param \Drupal\Core\Extension\ThemeHandlerInterface $themeManager
   */
  public function __construct(PermissionHandlerInterface $permission_handler, RoleStorageInterface $role_storage,
                              ModuleHandlerInterface $module_handler, AwePageManagerInterface $awePageManager, RequestContext $request_context) {
    $this->activeTheme = $this->config('system.theme')->get('default');
    $this->regions = system_region_list($this->activeTheme, REGIONS_ALL);
    $this->permissionHandler = $permission_handler;
    $this->roleStorage = $role_storage;
    $this->moduleHandler = $module_handler;
    $this->awePageManager = $awePageManager;
    $this->requestContext = $request_context;
  }


  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('user.permissions'),
      $container->get('entity.manager')->getStorage('user_role'),
      $container->get('module_handler'),
      $container->get('awe_page.manager'),
      $container->get('router.request_context')
    );
  }


  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'awe_page';
  }


  /**
   * Gets the roles to display in this form
   */
  protected function getRoles() {
    $roles = $this->roleStorage->loadMultiple();
    $options = [];
    foreach ($roles as $role_name => $role) {
      $options[$role_name] = $role->label();
    }
    return $options;
  }

  /**
   * List array permission
   * @return array option permission
   */
  protected function getPermission() {
    $permissions = $this->permissionHandler->getPermissions();
    $options = [];

    foreach ($permissions as $permission_name => $permission) {
      $options[$permission['provider']][$permission_name] = $permission['title'];
    }

    return $options;
  }

  protected function getAweUrlConfig($pid = NULL) {
    $url_settings = AweBuilderRender::getAweUrlConfig();
    $url_settings['buildPage'] = Url::fromRoute('awe_page.admin.iframe', ['pid' => $pid], ['absolute' => TRUE])
      ->toString();
    return $url_settings;
  }

  /**
   * @param $pid
   * @return array
   */
  protected function getOptions($pid) {
    $awe_page = $this->awePageManager->selectAwePage($pid);
    if ($awe_page) {
      $this->isNew = FALSE;
      $awe_page['build_data'] = unserialize($awe_page['build_data']);
      $awe_page['build_data'] = Json::encode($awe_page['build_data']);
      $settings = unserialize($awe_page['settings']);
      return array_merge($awe_page, $settings);
    }
    else {
      $options['pid'] = '';
      $options['tpid'] = '';
      $options['status'] = 1;
      $options['title'] = '';
      $options['path'] = '';
      $options['build_data'] = '';
      $options['body'] = '';
      $options['region'] = [
        'content' => 'content'
      ];
      $options['menu'] = [
        'type' => 'none',
        'title' => '',
        'description' => '',
        'expanded' => 0,
        'parent' => '',
        'menu_name' => '',
        'weight' => 0,
        'context' => 0
      ];
      $options['permission'] = [
        'type' => 'none',
        'perm' => '',
        'role' => [
          'anonymous' => 'anonymous'
        ]
      ];
      return $options;
    }


  }

  /**
   * @param $option
   * @return mixed
   */
  protected function getOption($option) {

    if (array_key_exists($option, $this->options)) {
      return $this->options[$option];
    }

    return NULL;
  }

  /**
   * Create form tabs menu
   * @return array form menu
   */
  protected function getFormMenu() {
    $form = [];
    $form['#title'] = $this->t('Menu item entry');
    $form['menu'] = array(
      '#prefix' => '<div class="clearfix">',
      '#suffix' => '</div>',
      '#tree' => TRUE,
    );
    $menu = $this->getOption('menu');
    if (empty($menu)) {
      $menu = array(
        'type' => 'none',
        'title' => '',
        'weight' => 0,
        'expanded' => FALSE
      );
    }
    $form['menu']['type'] = array(
      '#prefix' => '<div class="views-left-30">',
      '#suffix' => '</div>',
      '#title' => $this->t('Type'),
      '#type' => 'radios',
      '#options' => array(
        'none' => $this->t('No menu entry'),
        'normal' => $this->t('Normal menu entry'),
        'tab' => $this->t('Menu tab'),
        'default tab' => $this->t('Default menu tab')
      ),
      '#default_value' => $menu['type'],
    );

    $form['menu']['title'] = array(
      '#prefix' => '<div class="views-left-50">',
      '#title' => $this->t('Menu link title'),
      '#type' => 'textfield',
      '#default_value' => $menu['title'],
      '#states' => array(
        'visible' => array(
          array(
            ':input[name="menu[type]"]' => array('value' => 'normal'),
          ),
          array(
            ':input[name="menu[type]"]' => array('value' => 'tab'),
          ),
          array(
            ':input[name="menu[type]"]' => array('value' => 'default tab'),
          ),
        ),
      ),
    );
    $form['menu']['description'] = array(
      '#title' => $this->t('Description'),
      '#type' => 'textfield',
      '#default_value' => $menu['description'],
      '#description' => $this->t("Shown when hovering over the menu link."),
      '#states' => array(
        'visible' => array(
          array(
            ':input[name="menu[type]"]' => array('value' => 'normal'),
          ),
          array(
            ':input[name="menu[type]"]' => array('value' => 'tab'),
          ),
          array(
            ':input[name="menu[type]"]' => array('value' => 'default tab'),
          ),
        ),
      ),
    );
    $form['menu']['expanded'] = [
      '#title' => $this->t('Show as expanded'),
      '#type' => 'checkbox',
      '#default_value' => !empty($menu['expanded']),
      '#description' => $this->t('If selected and this menu link has children, the menu will always appear expanded. '),
    ];

    // Only display the parent selector if Menu UI module is enabled.
    $menu_parent = $menu['menu_name'] . ':' . $menu['parent'];
    if (\Drupal::moduleHandler()->moduleExists('menu_ui')) {
      $menu_link = '/';
      $form['menu']['parent'] = \Drupal::service('menu.parent_form_selector')
        ->parentSelectElement($menu_parent, $menu_link);
      $form['menu']['parent'] += array(
        '#title' => $this->t('Parent'),
        '#description' => $this->t('The maximum depth for a link and all its children is fixed. Some menu links may not be available as parents if selecting them would exceed this limit.'),
        '#attributes' => array('class' => array('menu-title-select')),
        '#states' => array(
          'visible' => array(
            array(
              ':input[name="menu[type]"]' => array('value' => 'normal'),
            ),
            array(
              ':input[name="menu[type]"]' => array('value' => 'tab'),
            ),
          ),
        ),
      );
    }
    else {
      $form['menu']['parent'] = array(
        '#type' => 'value',
        '#value' => $menu_parent,
      );
      $form['menu']['markup'] = array(
        '#markup' => $this->t('Menu selection requires the activation of Menu UI module.'),
      );
    }
    $form['menu']['weight'] = array(
      '#title' => $this->t('Weight'),
      '#type' => 'textfield',
      '#default_value' => isset($menu['weight']) ? $menu['weight'] : 0,
      '#description' => $this->t('In the menu, the heavier links will sink and the lighter links will be positioned nearer the top.'),
      '#states' => array(
        'visible' => array(
          array(
            ':input[name="menu[type]"]' => array('value' => 'normal'),
          ),
          array(
            ':input[name="menu[type]"]' => array('value' => 'tab'),
          ),
          array(
            ':input[name="menu[type]"]' => array('value' => 'default tab'),
          ),
        ),
      ),
    );
    $form['menu']['context'] = array(
      '#title' => $this->t('Context'),
      '#suffix' => '</div>',
      '#type' => 'checkbox',
      '#default_value' => !empty($menu['context']),
      '#description' => $this->t('Displays the link in contextual links'),
      '#states' => array(
        'visible' => array(
          ':input[name="menu[type]"]' => array('value' => 'tab'),
        ),
      ),
    );

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $pid = '') {
    $this->options = $this->getOptions($pid);
    $form['#attached']['library'][] = 'awe_page/awe_page.admin';
    $form['#attached']['library'][] = 'awe_builder/toolbar.fix';
    $form['#attached']['drupalSettings']['getPlaceBlock'] = $this->url('awe_builder.admin.place_block', [], ['absolute' => TRUE]);
    $form['#attached']['drupalSettings']['getListBlock'] = $this->url('awe_builder.admin.list_block', [], ['absolute' => TRUE]);
    if (\Drupal::hasService('md_fontello')) {
      $fontello = \Drupal::service('md_fontello');
      $libraries = $fontello->getListLibraries();
      foreach ($libraries as $library) {
        $form['#attached']['library'][] = $library;
      }
    }
    $form['title'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Page Title'),
      '#maxlength' => 255,
      '#required' => TRUE,
      '#default_value' => $this->getOption('title'),
    ];

    $form['pid'] = [
      '#type' => 'hidden',
      '#value' => $this->getOption('pid')
    ];

    $form['path'] = array(
      '#type' => 'textfield',
      '#title' => $this->t('Path'),
      '#description' => $this->t('This view will be displayed by visiting this path on your site.'),
      '#default_value' => $this->getOption('path'),
      '#field_prefix' => $this->requestContext->getCompleteBaseUrl() . '/',
      '#attributes' => array('dir' => LanguageInterface::DIRECTION_LTR),
      '#required' => TRUE,
      // Account for the leading backslash.
      '#maxlength' => 254,
    );

    $form['buildbtn'] = array(
      '#markup' => '
            <div class="ac_toolbar__group ac_enable-tooltip">
                <a class="ac_toolbar__button awe-btn-build awe-btn-build-normal" href="#" data-tooltip="Build new page">
                    <i class="acicon acicon-new"></i>
                </a>
                <a class="ac_toolbar__button ac_toolbar__hover awe-btn-build awe-btn-build-template" href="#" data-tooltip="Get from template">
                    <i class="acicon acicon-template"></i>
                </a>
            </div>
      ',
    );

    $form['path_config'] = [
      '#type' => 'hidden',
      '#value' => Json::encode($this->getAweUrlConfig($pid))
    ];


    $form['settings']['#attributes']['class'][] = 'entity-meta';

    $form['tab_regions'] = [
      '#title' => $this->t('Regions'),
      '#type' => 'details',
      '#open' => true,
      '#group' => 'settings',
    ];
    $regions = $this->getOption('region');
    foreach ($regions as $name => $region) {
      if ($region === 0) {
        unset($region[$name]);
      }
    }

    $form['tab_regions']['regions'] = [
      '#type' => 'checkboxes',
      '#options' => $this->regions,
      '#title' => $this->t('Check to show regions on your page.'),
      '#default_value' => array_values($regions),
      '#process' => [
        array($this, 'aweProcessCheckboxes'),
      ],
    ];

    $form['tab_font'] = [
      '#title' => $this->t('Google fonts'),
      '#type' => 'details',
      '#group' => 'settings'
    ];

    $form['tab_font']['font'] = [
      '#title' => $this->t('Google font'),
      '#type' => 'textarea',
      '#default_value' => $this->getOption('font'),
      '#suffix' => '<div>For example: http://fonts.googleapis.com/css?family=Open+Sans:400,700|Roboto</div>',
      '#attributes' => array('rows' => 2, 'class' => array('awe-google-font')),
    ];

    $form['tab_menu'] = [
      '#title' => $this->t('Menu'),
      '#type' => 'details',
      '#group' => 'settings'
    ];

    $form['tab_menu']['type'] = $this->getFormMenu();

    $form['tab_access'] = [
      '#title' => $this->t('Access'),
      '#type' => 'details',
      '#group' => 'settings'
    ];

    //Options access
    $access = $this->getOption('permission');

    $form['tab_access']['access_type'] = [
      '#type' => 'radios',
      '#default_value' => $access['type'],
      '#options' => [
        'none' => $this->t('None'),
        'perm' => $this->t('Permission'),
        'role' => $this->t('Role')
      ],
      '#weight' => 0,
    ];

    $form['tab_access']['access_type']['permission'] = [
      '#type' => 'select',
      '#title' => $this->t('Permission'),
      '#options' => $this->getPermission(),
      '#default_value' => $access['perm'],
      '#weight' => 1,
      '#states' => array(
        'visible' => array(
          ':input[name="access_type"]' => array('value' => 'perm'),
        ),
      ),
    ];

    $roles = $access['role'];
    foreach ($roles as $name => $role) {
      if ($role === 0) {
        unset($roles[$name]);
      }
    }

    $form['tab_access']['access_type']['roles'] = [
      '#type' => 'checkboxes',
      '#title' => $this->t('Role'),
      '#options' => $this->getRoles(),
      '#default_value' => array_keys($roles),
      '#weight' => 2,
      '#states' => array(
        'visible' => array(
          ':input[name="access_type"]' => array('value' => 'role'),
        ),
      ),
    ];

    $form['tab_publishing'] = [
      '#title' => $this->t('Publishing options'),
      '#type' => 'details',
      '#group' => 'settings',
    ];

    $form['tab_publishing']['publishing'] = [
      '#type' => 'radios',
      '#options' => [
        '1' => $this->t('Published'),
        '2' => $this->t('Not Published'),
      ],
      '#default_value' => $this->getOption('status'),
    ];

    $form['page_data'] = array(
      '#type' => 'textarea',
      '#title' => t('Content'),
      '#description' => t('content of page'),
      '#default_value' => $this->getOption('build_data'),
      '#attributes' => array('id' => 'awe-page-content'),
      '#prefix' => '<div class="awe-hidden">',
      '#suffix' => '</div>'
    );

    $form['page_body'] = array(
      '#type' => 'textarea',
      '#title' => t('Content html'),
      '#description' => t('content html of page'),
      '#default_value' => $this->getOption('body'),
      '#prefix' => '<div class="awe-hidden">',
      '#suffix' => '</div>'
    );

    $form['submit'] = [
      '#type' => 'submit',
      '#group' => 'actions',
      '#value' => $this->t('Save page'),
    ];

    $form['#theme'] = 'awepage_edit_form';

    return $form;
  }

  /**
   * Processes a checkboxes form element.
   * @param $element
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   * @param $complete_form
   * @return array
   */
  public static function aweProcessCheckboxes(&$element, FormStateInterface $form_state, &$complete_form) {
    $value = is_array($element['#value']) ? $element['#value'] : array();
    $element['#tree'] = TRUE;
    if (count($element['#options']) > 0) {
      if (!isset($element['#default_value']) || $element['#default_value'] == 0) {
        $element['#default_value'] = array();
      }
      $weight = 0;
      foreach ($element['#options'] as $key => $choice) {
        if ($key === 0) {
          $key = '0';
        }
        $weight += 0.001;

        $element += array($key => array());
        $element[$key] += array(
          '#type' => 'checkbox',
          '#title' => $choice,
          '#return_value' => $key,
          '#default_value' => isset($value[$key]) ? $key : NULL,
          '#attributes' => $element['#attributes'],
          '#ajax' => isset($element['#ajax']) ? $element['#ajax'] : NULL,
          '#error_no_message' => TRUE,
          '#weight' => $weight,
        );
        if ($key == 'content') {
          $element[$key]['#disabled'] = TRUE;
          $element[$key]['#default_value'] = TRUE;
        }
      }
    }
    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    $path = $form_state->getValue('path');
    $menu_type = $form_state->getValue(array('menu', 'type'));
    $errors = $this->validatePath($path);
    foreach ($errors as $error) {
      $form_state->setError($form['path'], $error);
    }

    if ($menu_type == 'normal' && strpos($path, '%') !== FALSE) {
      $form_state->setError($form['tab_menu']['type']['menu']['type'], $this->t('AwePage cannot create normal menu items for paths with a % in them.'));
    }

    if ($menu_type == 'default tab' || $menu_type == 'tab') {
      $bits = explode('/', $path);
      $last = array_pop($bits);
      if ($last == '%') {
        $form_state->setError($form['tab_menu']['type']['menu']['type'], $this->t('A display whose path ends with a % cannot be a tab.'));
      }
    }

    if ($menu_type != 'none' && $form_state->isValueEmpty(array(
        'menu',
        'title'
      ))
    ) {
      $form_state->setError($form['tab_menu']['type']['menu']['title'], $this->t('Title is required for this menu type.'));
    }
    // Automatically remove '/' and trailing whitespace from path.
    $form_state->setValue('path', trim($form_state->getValue('path'), '/ '));
  }


  /**
   * Validates the path of the display.
   *
   * @param string $path
   *   The path to validate.
   *
   * @return array
   *   A list of error strings.
   */
  protected function validatePath($path) {
    $errors = array();
    if (strpos($path, '%') === 0) {
      $errors[] = $this->t('"%" may not be used for the first segment of a path.');
    }

    $parsed_url = UrlHelper::parse($path);
    if (empty($parsed_url['path'])) {
      $errors[] = $this->t('Path is empty.');
    }

    if (!empty($parsed_url['query'])) {
      $errors[] = $this->t('No query allowed.');
    }

    if (!parse_url('internal:/' . $path)) {
      $errors[] = $this->t('Invalid path. Valid characters are alphanumerics as well as "-", ".", "_" and "~".');
    }

    $path_sections = explode('/', $path);
    // Symfony routing does not allow to use numeric placeholders.
    // @see \Symfony\Component\Routing\RouteCompiler
    $numeric_placeholders = array_filter($path_sections, function ($section) {
      return (preg_match('/^%(.*)/', $section, $matches)
        && is_numeric($matches[1]));
    });
    if (!empty($numeric_placeholders)) {
      $errors[] = $this->t("Numeric placeholders may not be used. Please use plain placeholders (%).");
    }

    return $errors;
  }


  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $values = $form_state->getValues();
    $user = $this->currentUser();
    $language_interface = \Drupal::languageManager()->getCurrentLanguage();
    $menu_parent = isset($values['menu']['parent']) ? $values['menu']['parent'] : ':';
    list($menu_name, $menu_parent) = explode(':', $menu_parent, 2);
    $fields = [
      'status' => $values['publishing'],
      'title' => $values['title'],
      'path' => $values['path'],
      'tpid' => 1,
      'uid' => $user->id(),
      'build_data' => $values['page_data'],
      'body' => $values['page_body'],
      'changed' => REQUEST_TIME,
      'langcode' => $language_interface->getId(),
      'settings' => [
        'region' => $values['regions'],
        'menu' => [
          'type' => isset($values['menu']['type']) ? $values['menu']['type'] : '',
          'title' => isset($values['menu']['title']) ? $values['menu']['title'] : '',
          'description' => isset($values['menu']['description']) ? $values['menu']['description'] : '',
          'expanded' => isset($values['menu']['expanded']) ? $values['menu']['expanded'] : '',
          'parent' => $menu_parent,
          'menu_name' => $menu_name,
          'weight' => isset($values['menu']['weight']) ? $values['menu']['weight'] : 0,
          'context' => isset($values['menu']['context']) ? $values['menu']['context'] : 0
        ],
        'permission' => [
          'type' => $values['access_type'],
          'perm' => isset($values['permission']) ? $values['permission'] : '',
          'role' => isset($values['roles']) ? $values['roles'] : []
        ],
        'font' => $values['font'],
      ]
    ];

    $data = Json::decode($fields['build_data']);
    $fields['build_data'] = serialize($data);

    $pid = $this->getOption('pid');
    $settings = $fields['settings'];

    if ($this->isNew) {
      $fields['created'] = REQUEST_TIME;
      $fields['settings'] = serialize($settings);
      $pid = $this->awePageManager->insertAwePage($fields);
    }

    // Get libraries of page
    $libraries = new AweBuilderLibraries($data);
    $files = $libraries->getLibraries();

    // Save css file
    $style = new AweBuilderRenderStyle($data, 'ac-wrapper-page-' . $pid);
    $css = $style->saveFileCss('page', "awe_page_{$pid}");
    $files['css']['theme'][$css] = [];
    $settings['libraries'] = $files;
    $fields['settings'] = serialize($settings);

    $this->awePageManager->updateAwePage($fields, $pid);
    Cache::invalidateTags(['awe_page']);

    // Rebuild routing
    \Drupal::service("router.builder")->rebuild();

    // Clear cache
    \Drupal::service('library.discovery')->clearCachedDefinitions();

    if ($values['menu']['type'] == 'none' || $values['menu']['type'] == 'normal') {
      $form_state->setRedirect("awepage.page_{$pid}");
    }
  }
}
