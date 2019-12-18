/**
 * File: el-chart.js
 * http://chartjs.org/
 * Version: 1.0.2
 */
(function($, _$, _window) {
    function ready_config(el, model) {
        socialLink(el, model);
    }

    function socialLink(el, element) {
        var ItemData    = element.getSettingsAttr("main.settings.social_list_value");
		var ItemStyle   = element.getSettingsAttr("style.settings.style");
		var list_detail = "";
		
		
		if(ItemStyle == "style-1") {
			list_detail = _.template(
                                '<% _.each(ListItem, function (ItemInfo){ %>\
                                   <div class="module module-<%= ItemInfo.label.toLowerCase().replace(" ", "-") %>"><a href="<%= ItemInfo.data %>" data-color="<%= ItemInfo.color %>" data-hover-color="<%= ItemInfo.highlight %>"><span data-lang="en" class="chaffle"><%= ItemInfo.label %></span></a></div>\
								   <style>\
								   	  .module-<%= ItemInfo.label.toLowerCase().replace(" ", "-") %> > a {color: <%= ItemInfo.color %> !important;}\
									  .module-<%= ItemInfo.label.toLowerCase().replace(" ", "-") %> > a:hover{color: <%= ItemInfo.highlight %> !important;}\
									  .module-<%= ItemInfo.label.toLowerCase().replace(" ", "-") %> {background-color: <%= ItemInfo.bg_color %> !important;}\
									  .module-<%= ItemInfo.label.toLowerCase().replace(" ", "-") %>:hover{background-color: <%= ItemInfo.bg_highlight %> !important;}\
								   </style>\
                                <% }); %>'
                            );	
		} else {
			list_detail = _.template(
                                '<% _.each(ListItem, function (ItemInfo){ %>\
                                   <div class="module module-<%= ItemInfo.label.toLowerCase().replace(" ", "-") %>"><a href="<%= ItemInfo.data %>" data-color="<%= ItemInfo.color %>" data-hover-color="<%= ItemInfo.highlight %>"><div class="__block"><span class="__icon"><i class="<%= ItemInfo.choose_icon %>"></i></span><span class="__name"><%= ItemInfo.label %></span></div></a></div>\
								   <style>\
								   	  .module-<%= ItemInfo.label.toLowerCase().replace(" ", "-") %> > a .__name {color: <%= ItemInfo.color %> !important; background-color: <%= ItemInfo.bg_color %> !important;}\
									  .module-<%= ItemInfo.label.toLowerCase().replace(" ", "-") %> > a .__icon {color: <%= ItemInfo.highlight %> !important; background-color: <%= ItemInfo.bg_highlight %> !important;}\
								   </style>\
                                <% }); %>'
                            );
		}
		
        _$('.js-el-content .share-item',el).html(list_detail({ListItem: ItemData}));
    }
	
	function changeClass(el, value, elementData) {
		$('.share-item', el).removeClass(value['prev']).addClass(value['current']);
    }

    AweBuilder.elementInfo('el-share', {
        title: 'MD Social Share',
        icon: 'acicon acicon-element',
		defaultPart: 'style',
        data: {
            main: {
				selector: '.share-item',
                style: {
                    enabled:['font','background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal']
                },
                settings: {
                    social_list_value: {
                        type: 'attributes',
                        title: 'Add Element',
                        devices: false,
                        formElements: {
                            label: {
                                type: 'input',
                                title: 'Text',
                                inlineTitle: true,
                                defaultValue: ''
                            },
							choose_icon: {
                                type: 'icon',
                                inlineTitle: true,
                                title: 'Choose Icon',
                                devices: false,
                                defaultValue: '',
                            },
                            data: {
                                type: 'input',
                                title: 'Value',
                                inlineTitle: true,
                                devices: false,
                                defaultValue: '',
                            },
							color: {
                                type: 'colorpicker',
                                title: 'Color',
                                defaultValue: ''
                            },
                            highlight: {
                                type: 'colorpicker',
                                title: 'Color Hover',
                                defaultValue: ''
                            },
							bg_color: {
                                type: 'colorpicker',
                                title: 'Background Color',
                                defaultValue: ''
                            },
                            bg_highlight: {
                                type: 'colorpicker',
                                title: 'Background Color Hover',
                                defaultValue: ''
                            }
                        },
                        primaryEl: 'label',
                        defaultValue: [{"label":"Facebook","data":"http://facebook.com","choose_icon":"acicon-facebook","color":"#444444","highlight":"#3C599F","bg_color":"#FFFFFF","bg_highlight":"#00B863"},{"label":"Twitter","data":"http://twitter.com","choose_icon":"acicon-twitter","color":"#444444","highlight":"#3C599F","bg_color":"#FFFFFF","bg_highlight":"#00B863"}],
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
                                socialLink(el, element);  
                            }
                        }
                    },
                    list_data: {
                        type: 'storage',
                        defaultValue: '[{"label":"Facebook","data":"http://facebook.com","choose_icon":"acicon-facebook","color":"#444444","highlight":"#3C599F","bg_color":"#FFFFFF","bg_highlight":"#00B863"},{"label":"Twitter","data":"http://twitter.com","choose_icon":"acicon-twitter","color":"#444444","highlight":"#3C599F","bg_color":"#FFFFFF","bg_highlight":"#00B863"}]',
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
							socialLink(el, element);
                        }
                    }
                },
            },
			column:{
                title: 'Column',
                selector: '.share-item',
				style: {
                    enabled: [''],
                    status: ['']
                },
                settings: {
                    column: {
                        type: 'select',
                        inlineTitle: true,
                        title: 'Column',
                        options: {
                            '__1-modules': '1 Columns',
							'__2-modules': '2 Columns',
							'__3-modules': '3 Columns',
							'__4-modules': '4 Columns',
							'__5-modules': '5 Columns'
                        },
                        devices: false,
                        defaultValue: '__5-modules',
                        change: function($panel, el, values, element) {
                            changeClass(el, values);
                        }
                    }
                }
            }
        },
        ready: ready_config
    });
})(jQuery, AweBuilder._jQuery, AweBuilder._window);
