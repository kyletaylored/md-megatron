/**
 * File: el-feature.js
 */
(function($,_$, _window) { 
    function ready(el, model) {
        $('.feature-title', el).attr('contenteditable', 'true');
        //save data
        $('.feature-title', el).blur(function(event) {
            var _text = $(this).html().trim();
			model.setStorageValue('title', _text, 'main');
        });
		
		$('.feature-desc', el).attr('contenteditable', 'true');
        //save data
        $('.feature-desc', el).blur(function(event) {
            var _text = $(this).html().trim();
			model.setStorageValue('description', _text, 'main');
        });
		
		$('.feature-subtitle', el).attr('contenteditable', 'true');
        //save data
        $('.feature-subtitle', el).blur(function(event) {
            var _text = $(this).html().trim();
			model.setStorageValue('subtitle', _text, 'main');
        });
		
		$('.feature-icon',el).blur(function(event) {
            var _text = $(this).html();
            model.setStorageValue('content', _text);
        })
		
        var settings = model.get('settings');
        var option = {
            main:settings.main.settings ? settings.main.settings : {}
        };
    }
	
	function changeClass(el, value, elementData) {
        $('.feature-icon', el).removeClass(value['prev']).addClass(value['current']);
		$('.feature-item', el).removeClass(value['prev']).addClass(value['current']);
    }
	
	AweBuilder.elementInfo('el-feature', {
        title: 'MD Feature',
        icon: 'acicon acicon-element',
		defaultPart: 'style',
        enableEditor: [{
				selector: '.feature-title',
				saveTo: {}
			},{
				selector: '.feature-desc',
				saveTo: {}
			},{
				selector: '.feature-subtitle',
				saveTo: {}
			}],
        data: {
            main: {
				selector: '.feature-item',
                style: {
                    enabled:['background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                },
				settings: {
                    title: {
						type: 'storage',
						defaultValue: 'Feature Title'
					},
					description: {
						type: 'storage',
						defaultValue: 'Feature Description'
					},
					subtitle: {
						type: 'storage',
						defaultValue: 'Feature Subtitle'
					},
					style: {
                        type: 'select',
                        inlineTitle: true,
                        title: 'Style',
                        options: {
                            'style-1': 'Style 1',
                            'style-2': 'Style 2',
							'style-3': 'Style 3',
							'style-4': 'Style 4',
							'style-5': 'Style 5',
							'style-6': 'Style 6',
							'style-7': 'Style 7',
							'style-8': 'Style 8'
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
                selector: '.feature-icon',
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
			vline: {
                title: 'Vertical Line',
                selector: '.vline',
                style: {
                    enabled: ['border'],
                    status: ['normal']
                }
            },
			title: {
                title: 'Title',
                selector: '.feature-title',
                style: {
                    enabled: ['font', 'background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                }
            },
			description: {
                title: 'Description',
                selector: '.feature-desc',
                style: {
                    enabled: ['font','background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal','hover'],
                }
            },
			subtitle: {
                title: 'Sub-Title',
                selector: '.feature-subtitle',
                style: {
                    enabled: ['font', 'background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                }
            }
        },
        ready: ready
	});
})(jQuery, AweBuilder._jQuery, AweBuilder._window);