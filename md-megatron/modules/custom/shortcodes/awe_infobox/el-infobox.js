/**
 * File: el-infobox.js
 */
(function($,_$, _window) { 
    function initImage(el, option){
        var default_option;
        if(_$(el).data('image_option'))
            default_option = _$(el).data('image_option')
        else
            default_option = {
                image:{
                   file:{fid: -1,url: ''}                   
                }
            }; 
        var default_image = 'http://placehold.it/510x340';
        if(option.main)
            default_option.main = $.extend(default_option.main, option.main);
        if(option.image)
            default_option.image = $.extend(default_option.image, option.image);      
        
        var $image_wrapper = _$(el).find('.image-wrap'),
            image_src = (!default_option.image.file.url)? default_image : default_option.image.file.url;
    
        $image_wrapper.find('img').attr('src', image_src);
        
        _$(el).data('image_option', default_option);
    }
	
	function ready(el, model) {
        var button_text = $('.ts-button', el);
        button_text.attr('contenteditable', 'true');
		//save data
        $('.ts-button', el).click(function(event) {
            event.preventDefault();
        })
        button_text.blur(function(event) {
            var _text = $(this).text();
            model.setStorageValue('button_text', _text, 'button');
        })
		
		$('.info-name', el).attr('contenteditable', 'true');
        //save data
        $('.info-name', el).blur(function(event) {
            var _text = $(this).html().trim();
            model.setStorageValue('title', _text, 'main');
        });
		
		$('.info-name-2', el).attr('contenteditable', 'true');
        //save data
        $('.info-name-2', el).blur(function(event) {
            var _text = $(this).html().trim();
            model.setStorageValue('title_2', _text, 'main');
        });
		
		$('.info-desc', el).attr('contenteditable', 'true');
        //save data
        $('.info-desc', el).blur(function(event) {
            var _text = $(this).html().trim();
            model.setStorageValue('description', _text, 'main');
        });
		
		$('.info-subtitle', el).attr('contenteditable', 'true');
        //save data
        $('.info-subtitle', el).blur(function(event) {
            var _text = $(this).html().trim();
            model.setStorageValue('subtitle', _text, 'main');
        });
		
		$('.info-subtitle-2', el).attr('contenteditable', 'true');
        //save data
        $('.info-subtitle-2', el).blur(function(event) {
            var _text = $(this).html().trim();
            model.setStorageValue('subtitle_2', _text, 'main');
        });
		
		$('.info-icon',el).blur(function(event) {
            var _text = $(this).html();
            model.setStorageValue('content', _text);
        })
		
        var settings = model.get('settings');
        var option = {
            main:settings.main.settings ? settings.main.settings : {},
			image:settings.image.settings ? settings.image.settings : {}
        };
		
		initImage(el, option);
    }
	
	function changeClass(el, value, elementData) {
        $('.info-icon', el).removeClass(value['prev']).addClass(value['current']);
		$('.info-item', el).removeClass(value['prev']).addClass(value['current']);
		if(value['current'] == "style-1") {
			$(".el-part .option-list > li[data-val='icon']").addClass('hidden');
		} 
		else {
			$(".el-part .option-list > li[data-val='icon']").removeClass('hidden');
		}
    }
	
	function changeLink(el, values) {
        $('.ts-button', el).attr('href', values['current']);
    }
	
	function changeButtonClass(el, value, elementData) {
        $('.ts-button', el).removeClass(value['prev']).addClass(value['current']);
    }

    AweBuilder.elementInfo('el-infobox', {
        title: 'MD Info Box',
        icon: 'acicon acicon-element',
		defaultPart: 'style',
        enableEditor: [{
				selector: '.info-name',
				saveTo: {}
			},{
				selector: '.info-name-2',
				saveTo: {}
			},{
				selector: '.info-desc',
				saveTo: {}
			},{
				selector: '.info-subtitle',
				saveTo: {}
			},{
				selector: '.info-subtitle-2',
				saveTo: {}
        }],
        data: {
            main: {
				selector: '.info-item',
                style: {
                    enabled:['background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                },
				settings: {
                    title: {
						type: 'storage',
						defaultValue: 'Info Box name'
					},
					title_2: {
						type: 'storage',
						defaultValue: 'Info Box name 2'
					},
					description: {
						type: 'storage',
						defaultValue: 'Info Box Description'
					},
					subtitle: {
						type: 'storage',
						defaultValue: 'Info Box Subtitle'
					},
					subtitle_2: {
						type: 'storage',
						defaultValue: 'Info Box Subtitle 2'
					},
					style: {
                        type: 'select',
                        inlineTitle: true,
                        title: 'Style',
                        options: {
                            'style-1': 'Style 1',
                            'style-2': 'Style 2',
							'style-3': 'Style 3',
							'style-4': 'Style 4'
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
                selector: '.info-icon',
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
                                $('.info-icon > i', el).attr('class', '');
                                $('.info-icon > i', el).addClass(values.current);
                            }
                        }
                    }
                }
            },
			image: {
                title: 'Image',
                selector: '.ac-image-thumb',
                style: {
                    enabled:['border', 'padding', 'margin'],
                    status: ['normal', 'hover']                    
                },
                settings: {
                    file: {
                        type: 'fileselector',
                        title: 'Image',
                        defaultValue: {
                            fid: -1,
                            url: ''
                        },
                        devices: false,
                        change: function($panel, el, values, element) {
                            initImage(el, {image:{file:values.current}});
                        }
                    }
                }
            },
			title: {
                title: 'Title',
                selector: '.info-name',
                style: {
                    enabled: ['font', 'background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                }
            },
			title_2: {
                title: 'Title 2',
                selector: '.info-name-2',
                style: {
                    enabled: ['font', 'background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                }
            },
			description: {
                title: 'Description',
                selector: '.info-desc',
                style: {
                    enabled: ['font','background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal','hover'],
                }
            },
			subtitle: {
                title: 'Sub-Title',
                selector: '.info-subtitle',
                style: {
                    enabled: ['font', 'background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                }
            },
			subtitle_2: {
                title: 'Sub-Title 2',
                selector: '.info-subtitle-2',
                style: {
                    enabled: ['font', 'background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                }
            },
			button: {
                title: 'Link',
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