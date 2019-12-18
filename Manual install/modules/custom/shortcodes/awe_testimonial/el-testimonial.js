/**
 * File: el-testimonial.js
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
        var default_image = 'http://placehold.it/90x90';
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
       $('.testi-name', el).attr('contenteditable', 'true');
        //save data
        $('.testi-name', el).blur(function(event) {
            var _text = $(this).html().trim();
            model.setStorageValue('title', _text, 'main');
        });
		
		$('.testi-desc', el).attr('contenteditable', 'true');
        //save data
        $('.testi-desc', el).blur(function(event) {
            var _text = $(this).html().trim();
			model.setStorageValue('description', _text, 'main');
        });
		
		$('.testi-subtitle', el).attr('contenteditable', 'true');
        //save data
        $('.testi-subtitle', el).blur(function(event) {
            var _text = $(this).html().trim();
			model.setStorageValue('subtitle', _text, 'main');
        });
		
		$('.testi-position', el).attr('contenteditable', 'true');
        //save data
        $('.testi-position', el).blur(function(event) {
            var _text = $(this).html().trim();
			model.setStorageValue('position', _text, 'main');
        });
		
		var settings = model.get('settings');
        var option = {
            main:settings.main.settings ? settings.main.settings : {},
			image:settings.image.settings ? settings.image.settings : {}
        };
		
		initImage(el, option);
    }
	
	function changeClass(el, value, elementData) {
		$('.testi-item', el).removeClass(value['prev']).addClass(value['current']);
		
		/* enable/disable star */
		if(value['current'] == "style-4") {
			$(".el-part .option-list > li[data-val='star']").addClass('hidden');
		} 
		else {
			$(".el-part .option-list > li[data-val='star']").removeClass('hidden');
		}
		
		/* enable/disable image */
		if(value['current'] == "style-3" || value['current'] == "style-4" || value['current'] == "style-6") {
			$(".el-part .option-list > li[data-val='image']").removeClass('hidden');
		} 
		else {
			$(".el-part .option-list > li[data-val='image']").addClass('hidden');
		}
    }
	
	function changeStar(el, value, elementData) {
		var star = "";
		for(i=0; i < value['current']; i++) {
			star = star + '<span class="rated">&#9733;</span>';
		}
		$('.star-ratings', el).html(star);
    }

    AweBuilder.elementInfo('el-testimonial', {
        title: 'MD Testimonial',
        icon: 'acicon acicon-element',
		defaultPart: 'style',
        enableEditor: [{
				selector: '.testi-name',
				saveTo: {}
			},{
				selector: '.testi-desc',
				saveTo: {}
			},{
				selector: '.testi-subtitle',
				saveTo: {}
        	},{
				selector: '.testi-position',
				saveTo: {}
        }],
        data: {
            main: {
				selector: '.testi-item',
                style: {
                    enabled:['background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                },
				settings: {
                    title: {
						type: 'storage',
						defaultValue: 'Testimonial Title'
					},
					description: {
						type: 'storage',
						defaultValue: 'Testimonial Description'
					},
					subtitle: {
						type: 'storage',
						defaultValue: 'Testimonial Subtitle'
					},
					position: {
						type: 'storage',
						defaultValue: 'Testimonial Position'
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
							'style-6': 'Style 6'
                        },
                        devices: false,
                        defaultValue: 'style-1',
                        change: function($panel, el, values, element) {
                            changeClass(el, values);
                        }
                    }
                },
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
                selector: '.testi-name',
                style: {
                    enabled: ['font', 'background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                }
            },
			description: {
                title: 'Description',
                selector: '.testi-desc',
                style: {
                    enabled: ['font','background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal','hover'],
                }
            },
			subtitle: {
                title: 'Sub-Title',
                selector: '.testi-subtitle',
                style: {
                    enabled: ['font', 'background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                }
            },
			position: {
                title: 'Position',
                selector: '.testi-position',
                style: {
                    enabled: ['font', 'background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                }
            },
			star:{
                title: 'Star',
                style: {
                    enabled: [''],
                    status: ['normal']
                },
                settings: {
                    num: {
                        type: 'select',
                        inlineTitle: false,
                        title: 'Number',
                        options: {
                            '1': '1 star',
                            '2': '2 stars',
                            '3': '3 stars',
                            '4': '4 stars',
							'5': '5 stars'
                        },
                        devices: false,
                        defaultValue: '1',
                        change: function($panel, el, values, element) {
                            changeStar(el, values);
                        }
                    }
                }
            }
        },
        ready: ready
	});
})(jQuery, AweBuilder._jQuery, AweBuilder._window);