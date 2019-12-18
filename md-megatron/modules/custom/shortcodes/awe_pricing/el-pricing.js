/**
 * File: el-pricing.js
 */
(function($,_$, _window) { 
    function ready(el, model) {
		$('.pricing-type', el).attr('contenteditable', 'true');
        //save data
        $('.pricing-type', el).blur(function(event) {
            var _text = $(this).html().trim();
            model.setStorageValue('type', _text, 'main');
        });
		
		$('.pricing-title', el).attr('contenteditable', 'true');
        //save data
        $('.pricing-title', el).blur(function(event) {
            var _text = $(this).html().trim();
            model.setStorageValue('title', _text, 'main');
        });
		
		$('.pricing-subtitle', el).attr('contenteditable', 'true');
        //save data
        $('.pricing-subtitle', el).blur(function(event) {
            var _text = $(this).html().trim();
            model.setStorageValue('subtitle', _text, 'main');
        });
		
		$('.price-value', el).attr('contenteditable', 'true');
        //save data
        $('.price-value', el).blur(function(event) {
            var _text = $(this).html().trim();
            model.setStorageValue('price_value', _text, 'main');
        });
		
		$('.price-duration', el).attr('contenteditable', 'true');
        //save data
        $('.price-duration', el).blur(function(event) {
            var _text = $(this).html().trim();
            model.setStorageValue('price_duration', _text, 'main');
        });
		
		$('.pricing-icon',el).blur(function(event) {
            var _text = $(this).html();
            model.setStorageValue('content', _text);
        });
		
		$('.feature-list', el).attr('contenteditable', 'true');
        //save data
        $('.feature-list', el).blur(function(event) {
            var _html = $(this).html().trim();
            model.setStorageValue('features', _html, 'main');
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
	
	function changeButtonClass(el, value, elementData) {
        $('.ts-button', el).removeClass(value['prev']).addClass(value['current']);
    }
	
	function changePriceClass(el, value, elementData) {
        $('.price', el).removeClass(value['prev']).addClass(value['current']);
    }
	
	function changeLink(el, values) {
        $('.ts-button', el).attr('href', values['current']);
    }
	
	function enableHeader(el, value, elementData) {
        if(value['current'] == true) {
			$('.__title', el).removeClass("false");
		} else {
			$('.__title', el).addClass("false");
		}
    }
	
	function enableIcon(el, value, elementData) {
        if(value['current'] == true) {
			$('.service-box', el).removeClass("false");
			$(".el-part .option-list > li[data-val='icon']").removeClass('hidden');
		} else {
			$('.service-box', el).addClass("false");
			$(".el-part .option-list > li[data-val='icon']").addClass('hidden');
		}
    }
	
	function enablePrice(el, value, elementData) {
        if(value['current'] == true) {
			$('.price', el).removeClass("false");
		} else {
			$('.price', el).addClass("false");
		}
    }
	
	function enableFeatures(el, value, elementData) {
        if(value['current'] == true) {
			$('.feature-list', el).removeClass("false");
		} else {
			$('.feature-list', el).addClass("false");
		}
    }
	
	function isFeature(el, value, elementData) {
        if(value['current'] == true) {
			$('.__title', el).removeClass("normal").addClass("default");
		} else {
			$('.__title', el).removeClass("default").addClass("normal");
		}
    }
	
	function enableButton(el, value, elementData) {
        if(value['current'] == true) {
			$('.ts-button', el).removeClass("false");
		} else {
			$('.ts-button', el).addClass("false");
		}
    }
	
	AweBuilder.elementInfo('el-pricing', {
        title: 'MD Pricing',
        icon: 'acicon acicon-element',
		defaultPart: 'style',
        enableEditor: [{
				selector: '.pricing-type',
				saveTo: {}
			},{
				selector: '.pricing-title',
				saveTo: {}
			},{
				selector: '.pricing-subtitle',
				saveTo: {}
			},{
				selector: '.price-value',
				saveTo: {}
			},{
				selector: '.price-duration',
				saveTo: {}
			},{
				selector: '.feature-list',
				saveTo: {}
			}],
        data: {
            main: {
				selector: '.pricing-item',
                style: {
                    enabled:['font', 'background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                },
				settings: {
					order_counter: {
                        type: 'order',
                        title: "Order",
                        options: {
                            'order_header': 'Header',
                            'order_icon': 'Icon',
                            'order_feature': 'Features',
                            'order_price': 'Price',
							'order_footer': 'Footer',
                        },
                        defaultValue: ["order_header", "order_icon", "order_feature", "order_price", "order_footer"],
                        devices: false,
                        change: function($panel, el, values, element) {
                            if(!values.updateModel)
                                element.reloadContent();
                        }
                    },
					header_enable: {
                        type: 'toggle',
                        title: 'Enable Header',
                        inlineTitle: true,
                        className: '__title',
                        devices: false,
                        defaultValue: true,
                        change: function($panel, el, values, element) {
                            enableHeader(el, values);
                        }
                    },
					icon_enable: {
                        type: 'toggle',
                        title: 'Enable Icon',
                        inlineTitle: true,
                        className: 'service-box',
                        devices: false,
                        defaultValue: false,
                        change: function($panel, el, values, element) {
                            enableIcon(el, values);
                        }
                    },
					price_enable: {
                        type: 'toggle',
                        title: 'Enable Price',
                        inlineTitle: true,
                        className: 'price',
                        devices: false,
                        defaultValue: true,
                        change: function($panel, el, values, element) {
                            enablePrice(el, values);
                        }
                    },
					features_enable: {
                        type: 'toggle',
                        title: 'Enable Features',
                        inlineTitle: true,
                        className: 'feature-list',
                        devices: false,
                        defaultValue: true,
                        change: function($panel, el, values, element) {
                            enableFeatures(el, values);
                        }
                    },
					button_enable: {
                        type: 'toggle',
                        title: 'Enable Footer',
                        inlineTitle: true,
                        className: 'ts-button',
                        devices: false,
                        defaultValue: true,
                        change: function($panel, el, values, element) {
                            enableButton(el, values);
                        }
                    },
					is_feature: {
                        type: 'toggle',
                        title: 'Feature Package',
                        inlineTitle: true,
                        className: '__title',
                        devices: false,
                        defaultValue: false,
                        change: function($panel, el, values, element) {
                            isFeature(el, values);
                        }
                    },
					type: {
						type: 'storage',
						defaultValue: 'Pricing Type'
					},
					title: {
						type: 'storage',
						defaultValue: 'Pricing Title'
					},
					subtitle: {
						type: 'storage',
						defaultValue: 'Pricing Subtitle'
					},
					price_value: {
						type: 'storage',
						defaultValue: '$40'
					},
					price_duration: {
						type: 'storage',
						defaultValue: '/MONTH'
					},
					features: {
						type: 'storage',
						defaultValue: '<li>Feature 1</li><li>Feature 2</li>'
					}
                },
            },
            icon: {
                title: 'Icon',
                selector: '.pricing-icon',
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
                                $('.service-box > i', el).attr('class', '');
                                $('.service-box > i', el).addClass(values.current);
                            }
                        }
                    }
                }
            },
			type: {
                title: 'Type',
                selector: '.pricing-type',
                style: {
                    enabled: ['font', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                }
            },
			title: {
                title: 'Title',
                selector: '.pricing-title',
                style: {
                    enabled: ['font', 'background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                }
            },
			subtitle: {
                title: 'Sub-Title',
                selector: '.pricing-subtitle',
                style: {
                    enabled: ['font', 'background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                }
            },
			price: {
                title: 'Price',
                selector: '.price',
                style: {
                    enabled: ['font', 'background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                },
				settings: {
					style: {
                        type: 'select',
                        inlineTitle: true,
                        title: 'Style',
                        options: {
                            'style-1': 'Style 1',
                            'style-2': 'Style 2',
							'style-3': 'Style 3',
							'style-4': 'Style 4',
							'style-5': 'Style 5'
                        },
                        devices: false,
                        defaultValue: 'style-1',
                        change: function($panel, el, values, element) {
                            changePriceClass(el, values);
                        }
                    }
                },
            },
			features: {
                title: 'Features',
                selector: '.feature-list',
                style: {
                    enabled: ['font', 'background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                }
            },
			button: {
                title: 'Footer',
                selector: '.ts-button',
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