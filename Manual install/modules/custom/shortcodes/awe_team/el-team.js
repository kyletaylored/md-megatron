/**
 * File: el-team.js
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
        var default_image = 'http://placehold.it/600x600';
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
        $('.team-title', el).attr('contenteditable', 'true');
        //save data
        $('.team-title', el).blur(function(event) {
            var _text = $(this).html().trim();
            model.setStorageValue('title', _text, 'main');
        });
		
		$('.team-position', el).attr('contenteditable', 'true');
        //save data
        $('.team-position', el).blur(function(event) {
            var _text = $(this).html().trim();
			model.setStorageValue('position', _text, 'main');
        });
		
		$('.team-desc', el).attr('contenteditable', 'true');
        //save data
        $('.team-desc', el).blur(function(event) {
            var _text = $(this).html().trim();
			model.setStorageValue('description', _text, 'main');
        });
		
		teamSocial(el, model);
		
        var settings = model.get('settings');
        var option = {
            main:settings.main.settings ? settings.main.settings : {},
			image:settings.image.settings ? settings.image.settings : {}
        };
		
		initImage(el, option);
    }
	
	function changeClass(el, value, elementData) {
		$('.team-item', el).removeClass(value['prev']).addClass(value['current']);
    }
	
	function teamSocial(el, element) {
        var ItemData    = element.getSettingsAttr("main.settings.team_social_list_value");

        // Description pie
        var list_detail = _.template(
                                '<% _.each(ListItem, function (ItemInfo){ %>\
                                   <li><a href="<%= ItemInfo.label %>"><i class="team-icon <%= ItemInfo.choose_icon %>"></i></a></li>\
                                <% }); %>'
                            );
        _$('.js-el-content .social-list',el).html(list_detail({ListItem: ItemData}));
    }
	
	AweBuilder.elementInfo('el-team', {
        title: 'MD Team',
        icon: 'acicon acicon-element',
		defaultPart: 'style',
        enableEditor: [{
				selector: '.team-title',
				saveTo: {}
			},{
				selector: '.team-position',
				saveTo: {}
			},{
				selector: '.team-desc',
				saveTo: {}
			}],
        data: {
            main: {
				selector: '.team-item',
                style: {
                    enabled:['font', 'background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                },
				settings: {
                    team_social_list_value: {
                        type: 'attributes',
                        title: 'Add Element',
                        devices: false,
                        formElements: {
                            label: {
                                type: 'input',
                                title: 'Link',
                                inlineTitle: true,
                                defaultValue: ''
                            },
							choose_icon: {
                                type: 'icon',
                                inlineTitle: true,
                                title: 'Choose Icon',
                                devices: false,
                                defaultValue: '',
                            }
                        },
                        primaryEl: 'label',
                        defaultValue: [{"label":"http://facebook.com","choose_icon":"acicon-facebook"},{"label":"http://twitter.com","choose_icon":"acicon-twitter"}],
                        validate: function(values) {                            
                            if($.type(values) == 'array'){
                                var new_item = values[values.length - 1];
                                if (new_item.label === ''){
                                    alert('Please input Text');
                                    return false;
                                }
                            }                            
                        },
                        change: function($panel, el, values, element) {
                            if(!values.updateModel){
                                element.setStorageValue('list_data', JSON.stringify(values.current), 'main');
                                teamSocial(el, element);  
                            }
                        }
                    },
                    list_data: {
                        type: 'storage',
                        defaultValue: '[{"label":"http://facebook.com","choose_icon":"acicon-facebook"},{"label":"http://twitter.com","choose_icon":"acicon-twitter"}]',
                    },
					title: {
						type: 'storage',
						defaultValue: 'Team Name'
					},
					position: {
						type: 'storage',
						defaultValue: 'Team Position'
					},
					description: {
						type: 'storage',
						defaultValue: 'Team Description'
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
                selector: '.team-icon',
                style: {
                    enabled:['font', 'padding', 'margin'],
                    status: ['normal']
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
                selector: '.team-title',
                style: {
                    enabled: ['font', 'background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                }
            },
			position: {
                title: 'Position',
                selector: '.team-position',
                style: {
                    enabled: ['font', 'background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                }
            },
			description: {
                title: 'Description',
                selector: '.team-desc',
                style: {
                    enabled: ['font', 'background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                }
            }
        },
        ready: ready
	});
})(jQuery, AweBuilder._jQuery, AweBuilder._window);