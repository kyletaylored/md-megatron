/**
 * File: el-process.js
 */
(function($,_$, _window) { 
    function ready(el, model) {
        $('.process-title', el).attr('contenteditable', 'true');
        //save data
        $('.process-title', el).blur(function(event) {
            var _text = $(this).html().trim();
			model.setStorageValue('title', _text, 'main');
        });
		
		$('.process-desc', el).attr('contenteditable', 'true');
        //save data
        $('.process-desc', el).blur(function(event) {
            var _text = $(this).html().trim();
			model.setStorageValue('description', _text, 'main');
        });
		
		$('.process-icon',el).blur(function(event) {
            var _text = $(this).html();
            model.setStorageValue('content', _text);
        })
		
        var settings = model.get('settings');
        var option = {
            main:settings.main.settings ? settings.main.settings : {}
        };
    }
	
	function changeClass(el, value, elementData) {
        $('.process-icon', el).removeClass(value['prev']).addClass(value['current']);
		$('.process-item', el).removeClass(value['prev']).addClass(value['current']);
		if(value['current'] == "style-1") {
			$(".el-part .option-list > li[data-val='icon']").removeClass('hidden');
			$(".el-part .option-list > li[data-val='line']").removeClass('hidden');
			$(".el-part .option-list > li[data-val='number']").addClass('hidden');
		} 
		else {
			$(".el-part .option-list > li[data-val='icon']").addClass('hidden');
			$(".el-part .option-list > li[data-val='line']").addClass('hidden');
			$(".el-part .option-list > li[data-val='number']").removeClass('hidden');
		}
    }
	
	function enableLine(el, value, elementData) {
        if(value['current'] == true) {
			$('.line', el).addClass("true");
		} else {
			$('.line', el).removeClass("true");
		}
    }
	
	function changeNumber(el, values) {
        $('.number', el).text(values['current']);
    }
	
	AweBuilder.elementInfo('el-process', {
        title: 'MD Process',
        icon: 'acicon acicon-element',
		defaultPart: 'style',
        enableEditor: [{
				selector: '.process-title',
				saveTo: {}
			},{
				selector: '.process-desc',
				saveTo: {}
			}],
        data: {
            main: {
				selector: '.process-item',
                style: {
                    enabled:['background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                },
				settings: {
                    title: {
						type: 'storage',
						defaultValue: 'Process Title'
					},
					description: {
						type: 'storage',
						defaultValue: 'Process Description'
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
                selector: '.process-icon',
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
                                $('.process-icon > i', el).attr('class', '');
                                $('.process-icon > i', el).addClass(values.current);
                            }
                        }
                    }
                }
            },
			line: {
                title: 'Line',
                selector: '.line',
                style: {
                    enabled: ['background'],
                    status: ['normal']
                },
				settings: {
                    line_enable: {
                        type: 'toggle',
                        title: 'Enable Line',
                        inlineTitle: true,
                        className: 'enable-line',
                        devices: false,
                        defaultValue: false,
                        change: function($panel, el, values, element) {
                            enableLine(el, values);
                        }
                    },
                },
            },
			title: {
                title: 'Title',
                selector: '.process-title',
                style: {
                    enabled: ['font', 'background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                }
            },
			description: {
                title: 'Description',
                selector: '.process-desc',
                style: {
                    enabled: ['font','background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal','hover'],
                }
            },
			number: {
                title: 'Number',
                selector: '.number',
				style: {
					enabled: ['font', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal','hover'],
                },
                settings: {
                    number: {
                        type: 'input',
                        inlineTitle: true,
                        title: 'Number',
                        defaultValue: '',
                        devices: false,
                        change: function($panel, el, values, element) {
                            if(!values.updateModel)
                                changeNumber(el, values);
                        }
                    }
                }
            }
        },
        ready: ready
	});
})(jQuery, AweBuilder._jQuery, AweBuilder._window);