/**
 * File: el-funfact.js
 */
(function($, _$, _window) {
    function ready(el, model) {
		var edit_number = $('.counter-value span', el);
        edit_number.attr('contenteditable', 'true');
        edit_number.blur(function(event) {
            var _text = $(this).text();
            model.setStorageValue('counter_number', _text, 'main');
        });

        var edit_title = $('.counter-title', el);
        edit_title.attr('contenteditable', 'true');
        edit_title.blur(function(event) {
            var _text = $(this).text();
            model.setStorageValue('counter_title', _text, 'main');
        });
		
        var settings = model.get('settings');
        var option = {
            main:settings.main.settings ? settings.main.settings : {}
        };
    }
	
    function changeClass($selector, values) {
        $selector.removeClass(values['prev']).addClass(values['current']);
    }

	AweBuilder.elementInfo('el-funfact', {
		title: 'MD Funfact',
		icon: 'acicon acicon-element',
        enableEditor: [{
                selector: '.counter-value span',
                saveTo: {}
            },{
                selector: '.counter-title',
                saveTo: {}
            }],
        data: {
            main: {
                style: {
                    enabled: ['border','padding','margin'],
                    status: ['normal'],
                },
                settings: {
                    order_counter: {
                        type: 'order',
                        title: "Order",
                        options: {
                            'order_icon': 'Icon',
                            'order_number': 'Number',
                            'order_title': 'Title',
                            'order_line': 'Line',
                        },
                        defaultValue: ["order_icon", "order_number", "order_title", "order_line"],
                        devices: false,
                        change: function($panel, el, values, element) {
                            if(!values.updateModel)
                                element.reloadContent();
                        }
                    },
                    counter_number: {
                        type: 'storage',
                        defaultValue: '752',
                    },
                    icon_enable: {
                        type: 'toggle',
                        title: 'Enable Icon',
                        inlineTitle: true,
                        className: 'enable-icon',
                        devices: false,
                        defaultValue: false,
                        change: function($panel, el, values, element) {
                            if(!values.updateModel)
                                element.reloadContent();

                            if (values.current) {
                                $('.icon-option', $panel).show();
                            } else {
                                $('.icon-option', $panel).hide();
                            }
                        }
                    },
                    icon_option: {
                        type: 'group',
                        className: 'icon-option',
                        elements: {
                            choose_icon: {
                                type: 'icon',
                                inlineTitle: false,
                                title: 'Choose Icon',
                                className: 'choose-icon',
                                devices: false,
                                defaultValue: 'icon-help-circled',
                                change: function($panel, el, values, element) {
                                    if(!values.updateModel)
                                        changeClass($('.ac-counter i', el), values);
                                }
                            }
                        }
                    },
                    enable_title: {
                        type: 'toggle',
                        title: 'Enable Title',
                        inlineTitle: true,
                        className: 'enable-title',
                        devices: false,
                        defaultValue: false,
                        change: function($panel, el, values, element) {                                
                                if(!values.updateModel)
                                    element.reloadContent();
                        }
                    },
                    counter_title: {
                        type: 'storage',
                        defaultValue: 'Funfact Title',
                    },
                    enable_line: {
                        type: 'toggle',
                        title: 'Enable Line',
                        inlineTitle: true,
                        className: 'enable-line',
                        devices: false,
                        defaultValue: false,
                        change: function($panel, el, values, element) {                                
                                if(!values.updateModel)
                                    element.reloadContent();
                        }
                    },
                    counter_line: {
                        type: 'storage',
                        defaultValue: '',
                    }
                }
            },
            number: {
                title: 'Number',
                selector: '.counter-value',
                style: {
                    enabled: ['font','padding','margin'],
                    status: ['normal','hover'],
                },
            },
            icon: {
                title: 'Icon',
                selector: '.ac-icon',
                style: {
                    enabled: ['font'],
                    status: ['normal','hover'],
                },
            },
            text: {
                title: 'Title',
                selector: '.counter-title',
                style: {
                    enabled: ['font','padding','margin'],
                    status: ['normal','hover'],
                },
            },
            line: {
                title: 'Line',
                selector: '.counter-line',
                style: {
                    enabled: ['border'],
                    status: ['normal'],
                },
            },
        },
		ready: ready
	});
})(jQuery, AweBuilder._jQuery, AweBuilder._window);