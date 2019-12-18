<?php

function md_megatron_form_system_theme_settings_alter(&$form, &$form_state){
	$path = drupal_get_path('theme', 'md_megatron');
	
	//Add library
	$form['#attached']['library'][] = 'md_megatron/theme-settings';
	
	$form['md_megatron_settings'] = array(
      '#type' => 'vertical_tabs',
      '#title' => t('ADVANCED THEME SETTINGS'),
	  '#default_tab' => 'edit-publication',
	);
	
	/*$file = file_load(theme_get_setting('custom_background')[0]);
	kint($file);
	
	print file_create_url($file->getFileUri());*/
	
	//Background settings
	$form['background_settings'] = array(
	  '#type' => 'details',
	  '#title' => t('Background'),
	  '#group' => 'md_megatron_settings',
	);
	$form['background_settings']['background'] = array(
	  '#type' => 'fieldset',
	  '#collapsible' => TRUE,
	  '#collapsed' => TRUE,
	);
	$form['background_settings']['background']['background_desc'] = array(
	  '#markup' => t('Set the background image and background color. If an alternate image is needed, <a href="http://www.subtlepatterns.com/" target="_blank">Subtle Patterns</a> offers 
			  hundreds of options. Custom background images can be uploaded by selecting the "Upload Image" button. <br/><br/>'),
	);
	$form['background_settings']['background']['background_color'] = array(
	  '#type' => 'textfield',
	  '#title' => t('Background Color:'),
	  '#description' => t('Select a background color.'),
	  '#default_value' => theme_get_setting('background_color'),
	);
	$form['background_settings']['background']['background_image'] = array(
	  '#title' 	=> 'Background Image:',
	  '#type' 	=> 'select',
	  '#options'  => array(
		  'no-bg'        => 'No Background Images',
		  'custom-bg'    => 'Custom Background Image'
	  ),
	  '#default_value' => theme_get_setting('background_image'),
	);
	$form['background_settings']['background']['custom_background_wrap'] = array(
	  '#type' => 'container',
	  '#states' => array(
		'visible' => array(
		  ':input[name="background_image"]' => array('value' => 'custom-bg'),
		),
	  ),
	);
	$form['background_settings']['background']['custom_background_wrap']['custom_background'] = array(
	  '#title' => 'Upload Custom Background',
	  '#type' => 'managed_file',
	  '#upload_validators' => array(
		'file_validate_extensions' => array(0 => 'png jpg jpeg gif'),
	  ),
	  '#upload_location' => 'public://images/',
	  '#description' => t("Upload an image."),
	  '#default_value' => theme_get_setting('custom_background'),
	);
	$form['background_settings']['background']['custom_background_wrap']['custom_background_position'] = array(
	  '#title' 	=> 'Background Position:',
	  '#type' 	=> 'select',
	  '#options'  => array(
		  'left top'      => 'Left Top',
		  'left center'   => 'Left Center',
		  'left bottom'   => 'Left Bottom',
		  'right top'  	  => 'Right Top',
		  'right center'  => 'Right Center',
		  'right bottom'  => 'Right Bottom',
		  'center top'    => 'Center Top',
		  'center center' => 'Center Center',
		  'center bottom' => 'Center Bottom',
		  'initial'   	  => 'Initial',
		  'inherit'       => 'Inherit',
	  ),
	  '#default_value' => theme_get_setting('custom_background_position'),
	);
	$form['background_settings']['background']['custom_background_wrap']['custom_background_mode'] = array(
	  '#title' 	=> 'Background Mode:',
	  '#type' 	=> 'select',
	  '#options'  => array(
		  'repeat'        => 'Repeat All',
		  'repeat-x'   	  => 'Repeat Horizontally',
		  'repeat-y'   	  => 'Repeat Vertically',
		  'no-repeat'  	  => 'No Repeat',
		  'cover'  		  => 'FullCover',
		  'fixed'  		  => 'Fixed',
	  ),
	  '#default_value' => theme_get_setting('custom_background_mode'),
	);
	
	//Typography settings
	$form['typography_settings'] = array(
	  '#type' => 'details',
	  '#title' => t('Typography'),
	  '#group' => 'md_megatron_settings',
	);
	$form['typography_settings']['typo'] = array(
	  '#type' => 'fieldset',
	  '#collapsible' => TRUE,
	  '#collapsed' => TRUE,
	);
	$form['typography_settings']['typo']['typo_desc'] = array(
	  '#markup' => t('Configure the typography settings. For instructions on adding Google Web Fonts, please refer to the "Theme Settings" portion of the theme documentation.'),
	);
	$form['typography_settings']['typo']['font'] = array(
	  '#type' => 'details',
	  '#title' => t('Custom Font'),
	);
	$form['typography_settings']['typo']['font']['googlewebfonts'] = array(
	  '#type' => 'textarea',
	  '#title' => t('@import:'),
	  '#default_value' => theme_get_setting('googlewebfonts'),
	  '#description' => t("For example: http://fonts.googleapis.com/css?family=Kavoon|Hanalei+Fill"),
	  '#prefix' => '<ul>
            <li>Go to <a href="http://www.google.com/webfonts" target="_blank">www.google.com/webfonts</a>, choose your fonts and add to collection</li>
        <li>Click &quot;Use&quot; in the bottom bar after choose fonts</li>
        <li>Find &quot;Integrate the fonts into your CSS&quot;, copy all code from that field and paste it below to activate.</li>
        </ul>',
	);
	$form['typography_settings']['typo']['headings'] = array(
	  '#type' => 'details',
	  '#title' => t('Headings'),
	);
	
	$headings = array(1,2,3,4,5,6);
	foreach($headings as $item) {
		$form['typography_settings']['typo']['headings']['heading-'.$item] = array(
		  '#type' => 'details',
		  '#title' => t('Heading '.$item),
		);
		$form['typography_settings']['typo']['headings']['heading-'.$item]['h'.$item.'-font-type'] = array(
		  '#type' => 'select',
		  '#title' => t('Font Type:'),
		  '#default_value' => theme_get_setting('h'.$item.'-font-type'),
		  '#description' => t('Select the font type.'),
		  '#options' => array(
			  'default-font' => t('Default Font'),
			  'google-font' => t('Google Webfont'),
		  ),
		);
		$form['typography_settings']['typo']['headings']['heading-'.$item]['h'.$item.'-webfont'] = array(
		  '#type' => 'textfield',
		  '#title' => t('Font Family:'),
		  '#default_value' => theme_get_setting('h'.$item.'-webfont'),
		  '#attributes' => array('class' => array('webfont'), 'title' => t('')),
		  '#states' => array(
			  'visible' => array(      // Action to take: check the checkbox.
				':input[name="h'.$item.'-font-type"]' => array('value' => 'google-font'),
			  ),
		  ),
		);
		$form['typography_settings']['typo']['headings']['heading-'.$item]['h'.$item.'-fontsize'] = array(
		  '#type' => 'textfield',
		  '#field_suffix' => 'px',
		  '#title' => t('Font Size:'),
		  '#maxlength' => 7,
		  '#default_value' => theme_get_setting('h'.$item.'-fontsize'),
		  '#states' => array(
			  'visible' => array(      // Action to take: check the checkbox.
				':input[name="h'.$item.'-font-type"]' => array('value' => 'google-font'),
			  ),
		  ),
		);
		$form['typography_settings']['typo']['headings']['heading-'.$item]['h'.$item.'-color'] = array(
		  '#type' => 'textfield',
		  '#field_suffix' => '<br/>',
		  '#title' => t('Color:'),
		  '#default_value' => theme_get_setting('h'.$item.'-color'),
		  '#states' => array(
			  'visible' => array(      // Action to take: check the checkbox.
				':input[name="h'.$item.'-font-type"]' => array('value' => 'google-font'),
			  ),
		  ),
		);
		$form['typography_settings']['typo']['headings']['heading-'.$item]['h'.$item.'-fontweight'] = array(
		  '#type' => 'textfield',
		  '#title' => t('Font Weight:'),
		  '#maxlength' => 7,
		  '#default_value' => theme_get_setting('h'.$item.'-fontweight'),
		  '#states' => array(
			  'visible' => array(      // Action to take: check the checkbox.
				':input[name="h'.$item.'-font-type"]' => array('value' => 'google-font'),
			  ),
		  ),
		);
		$form['typography_settings']['typo']['headings']['heading-'.$item]['h'.$item.'-font-style'] = array(
		  '#type' => 'select',
		  '#title' => t('Font Style:'),
		  '#default_value' => theme_get_setting('h'.$item.'-font-style'),
		  '#options' => array(
			'normal' => t('Normal'),
			'italic' => t('Italic'),
			'oblique' => t('Oblique'),
		  ),
		  '#states' => array(
			  'visible' => array(      // Action to take: check the checkbox.
				':input[name="h'.$item.'-font-type"]' => array('value' => 'google-font'),
			  ),
		  ),
		);
	}
	
	$form['typography_settings']['typo']['hyperlinks'] = array(
	  '#type' => 'details',
	  '#title' => t('Hyperlinks'),
	);
	$form['typography_settings']['typo']['hyperlinks']['hyperlinks_desc'] = array(
	  '#markup' => t('Configure the style settings for default, hover, active, and visited hyperlink states.'),
	);
	
	$links = array('normal', 'hover', 'visited', 'active');
	foreach($links as $item) {
		$form['typography_settings']['typo']['hyperlinks']['link-'.$item] = array(
		  '#type' => 'details',
		  '#title' => $item,
		);
		$form['typography_settings']['typo']['hyperlinks']['link-'.$item]['link-'.$item.'-color'] = array(
		  '#type' => 'textfield',
		  '#title' => t('Color:'),
		  '#default_value' => theme_get_setting('link-'.$item.'-color'),
		);
		$form['typography_settings']['typo']['hyperlinks']['link-'.$item]['link-'.$item.'-decoration'] = array(
		  '#type' => 'select',
		  '#title' => t('Text Decoration:'),
		  '#default_value' => theme_get_setting('link-'.$item.'-decoration'),
		  '#options' => array(
			'none' => t('None'),
			'underline' => t('Underline'),
			'overline' => t('Overline'),
		  ),
		);
		$form['typography_settings']['typo']['hyperlinks']['link-'.$item]['link-'.$item.'-fontweight'] = array(
		  '#type' => 'textfield',
		  '#title' => t('Font Weight:'),
		  '#maxlength' => 7,
		  '#default_value' => theme_get_setting('link-'.$item.'-fontweight'),
		);
		$form['typography_settings']['typo']['hyperlinks']['link-'.$item]['link-'.$item.'-font-style'] = array(
		  '#type' => 'select',
		  '#title' => t('Font Style:'),
		  '#default_value' => theme_get_setting('link-'.$item.'-font-style'),
		  '#options' => array(
			'normal' => t('Normal'),
			'italic' => t('Italic'),
			'oblique' => t('Oblique'),
		  ),
		);
	}
	
	$form['typography_settings']['typo']['base'] = array(
	  '#type' => 'details',
	  '#title' => t('Base Font'),
	);
	$form['typography_settings']['typo']['base']['base_desc'] = array(
	  '#markup' => t('<div>Configure the style settings for the body font.</div>'),
	);
	$form['typography_settings']['typo']['base']['base_font_type'] = array(
	  '#type' => 'select',
	  '#title' => t('Font Type:'),
	  '#default_value' => theme_get_setting('base_font_type'),
	  '#description' => t('Select the font type.'),
	  '#options' => array(
		  'default-font' => t('Default Font'),
		  'google-font' => t('Google Webfont'),
	  ),
	);
	$form['typography_settings']['typo']['base']['base_webfont'] = array(
	  '#type' => 'textfield',
	  '#title' => t('Font Family:'),
	  '#default_value' => theme_get_setting('base_webfont'),
	  '#states' => array(
		  'visible' => array(      // Action to take: check the checkbox.
			':input[name="base_font_type"]' => array('value' => 'google-font'),
		  ),
	  ),
	);
	$form['typography_settings']['typo']['base']['base_fontsize'] = array(
	  '#type' => 'textfield',
	  '#field_suffix' => 'px',
	  '#title' => t('Font Size:'),
	  '#maxlength' => 7,
	  '#default_value' => theme_get_setting('base_fontsize'),
	  '#states' => array(
		  'visible' => array(      // Action to take: check the checkbox.
			':input[name="base_font_type"]' => array('value' => 'google-font'),
		  ),
	  ),
	);
	$form['typography_settings']['typo']['base']['base_color'] = array(
	  '#type' => 'textfield',
	  '#field_suffix' => '<br/>',
	  '#title' => t('Color:'),
	  '#default_value' => theme_get_setting('base_color'),
	  '#states' => array(
		  'visible' => array(      // Action to take: check the checkbox.
			':input[name="base_font_type"]' => array('value' => 'google-font'),
		  ),
	  ),
	);
	$form['typography_settings']['typo']['base']['base_fontweight'] = array(
	  '#type' => 'textfield',
	  '#title' => t('Font Weight:'),
	  '#maxlength' => 7,
	  '#default_value' => theme_get_setting('base_fontweight'),
	  '#states' => array(
		  'visible' => array(      // Action to take: check the checkbox.
			':input[name="base_font_type"]' => array('value' => 'google-font'),
		  ),
	  ),
	);
	$form['typography_settings']['typo']['base']['base_font_style'] = array(
	  '#type' => 'select',
	  '#title' => t('Font Style:'),
	  '#default_value' => theme_get_setting('base_font_style'),
	  '#options' => array(
		'normal' => t('Normal'),
		'italic' => t('Italic'),
		'oblique' => t('Oblique'),
	  ),
	  '#states' => array(
		  'visible' => array(      // Action to take: check the checkbox.
			':input[name="base_font_type"]' => array('value' => 'google-font'),
		  ),
	  ),
	);
	
	//Custom code settings
	$form['code_settings'] = array(
	  '#type' => 'details',
	  '#title' => t('Custom Code'),
	  '#group' => 'md_megatron_settings',
	);
	$form['code_settings']['code'] = array(
	  '#type' => 'fieldset',
	  '#collapsible' => TRUE,
	  '#collapsed' => TRUE,
	);
	$form['code_settings']['code']['code_header_wrap'] = array(
	  '#type' => 'details',
	  '#title' => t('Header'),
	);
	$form['code_settings']['code']['code_header_wrap']['code_header'] = array(
	  '#type' => 'textarea',
	  '#resizable' => FALSE,
	  '#rows' => 15,
	  '#default_value' => theme_get_setting('code_header'),
	  '#description' => t('The following code will be added in the &lt;head&gt; tag. Useful if you want to add additional script such as CSS or JS'),
	);
	$form['code_settings']['code']['code_footer_wrap'] = array(
	  '#type' => 'details',
	  '#title' => t('Footer'),
	);
	$form['code_settings']['code']['code_footer_wrap']['code_footer'] = array(
	  '#type' => 'textarea',
	  '#resizable' => FALSE,
	  '#rows' => 15,
	  '#default_value' => theme_get_setting('code_footer'),
	  '#description' => t('The following code will be added before the &lt;/body&gt; tag.'),
	);
	$form['code_settings']['code']['code_css_wrap'] = array(
	  '#type' => 'details',
	  '#title' => t('Custom CSS'),
	);
	$form['code_settings']['code']['code_css_wrap']['code_css'] = array(
	  '#type' => 'textarea',
	  '#resizable' => FALSE,
	  '#rows' => 15,
	  '#default_value' => theme_get_setting('code_css'),
	  '#description' => t('Insert custom CSS code in here (without &lt;/style&gt; tag). This overrides any other stylesheets. eg: a.button{color:green}'),
	);
}

