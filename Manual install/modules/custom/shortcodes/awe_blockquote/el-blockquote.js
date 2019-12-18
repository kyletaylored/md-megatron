/**
 * File: el-blockquote.js
 */
(function($,_$, _window) { 
    function ready(el, model) {
        $('.blockquote-item', el).attr('contenteditable', 'true');
        //save data
        $('.blockquote-item', el).blur(function(event) {
            var _text = $(this).html().trim();
            model.setStorageValue('description', _text, 'main');
        });
		
		var settings = model.get('settings');
        var option = {
            main:settings.main.settings ? settings.main.settings : {}
        };
    }
	
	function changeClass(el, value, elementData) {
		$('.blockquote-item', el).removeClass(value['prev']).addClass(value['current']);
    }
	
	AweBuilder.elementInfo('el-blockquote', {
        title: 'MD BlockQuote',
        icon: 'acicon acicon-element',
		defaultPart: 'main',
        enableEditor: [{
				selector: '.blockquote-item',
				saveTo: {}
			}],
        data: {
            main: {
                selector: '.blockquote-item',
				style: {
                    enabled:['font', 'background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                },
				settings: {
                    description: {
						type: 'storage',
						defaultValue: 'BlockQuote Description'
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
            description: {
                title: 'Description',
                selector: '.blockquote-item',
                style: {
                    enabled: ['font','background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal','hover'],
                }
            }
        },
        ready: ready
	});
})(jQuery, AweBuilder._jQuery, AweBuilder._window);