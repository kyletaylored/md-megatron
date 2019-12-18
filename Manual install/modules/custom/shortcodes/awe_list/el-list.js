/**
 * File: el-list.js
 * http://chartjs.org/
 * Version: 1.0.2
 */
(function($, _$, _window) {
    function ready_config(el, model) {
        list(el, model);
    }

    function list(el, element) {
        var ItemData    = element.getSettingsAttr("main.settings.list_value");

        // Description pie
        var list_detail = _.template(
                                '<% _.each(ListItem, function (ItemInfo){ %>\
                                   <li><span class="bullet"></span><%= ItemInfo.label %></li>\
                                <% }); %>'
                            );
        _$('.js-el-content .list',el).html(list_detail({ListItem: ItemData}));
    }
	
	function changeClass(el, value, elementData) {
        $('.list', el).removeClass(value['prev']).addClass(value['current']);
    }

    AweBuilder.elementInfo('el-list', {
        title: 'MD List',
        icon: 'acicon acicon-element',
        data: {
            main: {
				selector: '.list',
                style: {
                    enabled:['font','background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal']
                },
                settings: {
                    list_value: {
                        type: 'attributes',
                        title: 'Add Element',
                        devices: false,
                        formElements: {
                            label: {
                                type: 'input',
                                title: 'Text',
                                inlineTitle: true,
                                defaultValue: ''
                            }
                        },
                        primaryEl: 'label',
                        defaultValue: [{"label":"List Item Content"},{"label":"List Item Content"}],
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
                                list(el, element);  
                            }
                        }
                    },
                    list_data: {
                        type: 'storage',
                        defaultValue: '[{"label":"List Item Content"},{"label":"List Item Content"}]',
                    },
					style: {
                        type: 'select',
                        inlineTitle: true,
                        title: 'Style',
                        options: {
                            'order-list': 'Order List',
							'order-list-2': 'Order List 2',
							'list-disc': 'List Disc',
							'list-square': 'List Square',
							'list-arrow': 'List Arrow'
                        },
                        devices: false,
                        defaultValue: 'order-list',
                        change: function($panel, el, values, element) {
                            changeClass(el, values);
                        }
                    }
                },
            },
			bullet: {
                title: 'Bullet Color',
                selector: '.bullet',
                style: {
                    enabled: ['font', 'background'],
                    status: ['normal']
                }
            },
        },
        ready: ready_config
    });
})(jQuery, AweBuilder._jQuery, AweBuilder._window);
