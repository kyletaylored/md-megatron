/**
 * File: el-service.js
 */
(function($,_$, _window) { 
    function ready(el, model) {
        $('.service-title', el).attr('contenteditable', 'true');
        //save data
        $('.service-title', el).blur(function(event) {
            var _text = $(this).html().trim();
            model.setStorageValue('title', _text, 'main');
        });
		
		$('.service-desc', el).attr('contenteditable', 'true');
        //save data
        $('.service-desc', el).blur(function(event) {
            var _text = $(this).html().trim();
            model.setStorageValue('description', _text, 'main');
        });
		
		$('.service-subtitle', el).attr('contenteditable', 'true');
        //save data
        $('.service-subtitle', el).blur(function(event) {
            var _text = $(this).html().trim();
            model.setStorageValue('subtitle', _text, 'main');
        });
		
		$('.service-icon',el).blur(function(event) {
            var _text = $(this).html();
            model.setStorageValue('content', _text);
        });
		
		var button_text = $('.ts-button', el);
        button_text.attr('contenteditable', 'true');
		//save data
        $('.ts-button', el).click(function(event) {
            event.preventDefault();
        })
        button_text.blur(function(event) {
            var _text = $(this).text();
            model.setStorageValue('button_text', _text, 'button');
        });
		
        var settings = model.get('settings');
        var option = {
            main:settings.main.settings ? settings.main.settings : {}
        };
    }
	
	function changeClass(el, value, elementData) {
        $('.service-icon', el).removeClass(value['prev']).addClass(value['current']);
		$('.service-item', el).removeClass(value['prev']).addClass(value['current']);
		if(value['current'] == "style-1") {
			$(".el-part .option-list > li[data-val='icon']").removeClass('hidden');
		} 
		else {
			$(".el-part .option-list > li[data-val='icon']").addClass('hidden');
		}
    }
	
	function changeLink(el, values) {
        $('.ts-button', el).attr('href', values['current']);
    }
	
	function changeButtonClass(el, value, elementData) {
        $('.ts-button', el).removeClass(value['prev']).addClass(value['current']);
    }
	
	AweBuilder.elementInfo('el-service', {
        title: 'MD Service',
        icon: 'acicon acicon-element',
		defaultPart: 'style',
        enableEditor: [{
				selector: '.service-title',
				saveTo: {}
			},{
				selector: '.service-desc',
				saveTo: {}
			},{
				selector: '.service-subtitle',
				saveTo: {}
			}],
        data: {
            main: {
				selector: '.service-item',
                style: {
                    enabled:['background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                },
				settings: {
                    title: {
						type: 'storage',
						defaultValue: 'Service Title'
					},
					description: {
						type: 'storage',
						defaultValue: 'Service Description'
					},
					subtitle: {
						type: 'storage',
						defaultValue: 'Service Subtitle'
					},
					style: {
                        type: 'select',
                        inlineTitle: true,
                        title: 'Style',
                        options: {
                            'style-1': 'Style 1',
                            'style-2': 'Style 2'
                        },
                        devices: false,
                        defaultValue: 'style-1',
                        change: function($panel, el, values, element) {
                            changeClass(el, values);
                        }
                    }
                },
            },
            icon: {
                title: 'Icon',
                selector: '.service-icon',
                style: {
                    enabled:['font', 'background', 'border', 'padding', 'margin', 'transform'],
                    status: ['normal', 'hover']
                },
                settings: {
                    icon: {
                        type: 'icon',
                        title: 'Choose Icon',
                        defaultValue: 'icon-help-circled',
                        devices: false,
                        change: function($panel, el, values, element) {
                            if(typeof values.prev != 'undefined' ){
                                $('.__icon > i', el).attr('class', '');
                                $('.__icon > i', el).addClass(values.current);
                            }
                        }
                    }
                }
            },
			title: {
                title: 'Title',
                selector: '.service-title',
                style: {
                    enabled: ['font', 'background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                }
            },
			description: {
                title: 'Description',
                selector: '.service-desc',
                style: {
                    enabled: ['font','background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal','hover'],
                }
            },
			subtitle: {
                title: 'Sub-Title',
                selector: '.service-subtitle',
                style: {
                    enabled: ['font', 'background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                }
            },
			button: {
                title: 'Button',
                selector: '.ts-button',
				style: {
                    status: ['normal','hover'],
                },
                settings: {
                    button_text: {
                        type: 'storage',
                        defaultValue: 'Button',
                        title: 'Content'
                    },
					button_link: {
                        type: 'input',
                        inlineTitle: true,
                        title: 'Link',
                        defaultValue: '',
                        devices: false,
                        change: function($panel, el, values, element) {
                            if(!values.updateModel)
                                changeLink(el, values);
                        }
                    },
                    button_target:{
                        type: 'select',
                        inlineTitle: true,
                        title: 'Target',
                        options: {
                            '': 'Default',
                            '_self': 'Self',
                            '_parent': 'Parent',
                            '_top': 'Top',
                            '_blank': 'Blank',
                        },
                        devices: false,
                        defaultValue: '',
                        change: function($panel, el, values, element) {
                            if(!values.updateModel){
                                $('.ac-btn',el).removeAttr('target')
                                if (values.current)
                                    $('.ac-btn',el).attr('target', values.current);
                            }
                        }
                    },
					button_style:{
                        type: 'select',
                        inlineTitle: true,
                        title: 'Style',
                        options: {
                            'btn btn-primary': 'Style 1',
                            'btn-border': 'Style 2',
                            'btn-border btn-secondary': 'Style 3',
                            'btn btn-secondary': 'Style 4',
                            'btn-border btn-gray-dark': 'Style 5',
							'btn btn-gray-dark': 'Style 6',
                        },
                        devices: false,
                        defaultValue: 'btn btn-primary',
                        change: function($panel, el, values, element) {
                            changeButtonClass(el, values);
                        }
                    }
                }
            }
        },
        ready: ready
	});
})(jQuery, AweBuilder._jQuery, AweBuilder._window);