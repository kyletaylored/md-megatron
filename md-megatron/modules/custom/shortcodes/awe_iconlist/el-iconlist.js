/**
 * File: el-chart.js
 * http://chartjs.org/
 * Version: 1.0.2
 */
(function($, _$, _window) {
    function ready_config(el, model) {
        socialShare(el, model);
    }

    function socialShare(el, element) {
        var ItemData    = element.getSettingsAttr("main.settings.icon_list_value");

        // Description pie
        var list_detail = _.template(
                                '<% _.each(ListItem, function (ItemInfo){ %>\
                                   <li><i class="il-icon <%= ItemInfo.choose_icon %>"></i><%= ItemInfo.label %></li>\
                                <% }); %>'
                            );
        _$('.js-el-content .list-icon',el).html(list_detail({ListItem: ItemData}));
    }

    AweBuilder.elementInfo('el-iconlist', {
        title: 'MD Icon List',
        icon: 'acicon acicon-element',
        data: {
            main: {
                style: {
                    enabled:['font','background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal']
                },
                settings: {
                    icon_list_value: {
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
                            }
                        },
                        primaryEl: 'label',
                        defaultValue: [{"label":"Icon List Content","choose_icon":"acicon-drupal"},{"label":"Icon List Content","choose_icon":"acicon-drupal"}],
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
                                socialShare(el, element);  
                            }
                        }
                    },
                    list_data: {
                        type: 'storage',
                        defaultValue: '[{"label":"Icon List Content","choose_icon":"acicon-drupal"},{"label":"Icon List Content","choose_icon":"acicon-drupal"}]',
                    },
                },
            },
			icon: {
                title: 'Icon',
                selector: '.il-icon',
                style: {
                    enabled:['font', 'padding', 'margin'],
                    status: ['normal']
                }
            },
        },
        ready: ready_config
    });
})(jQuery, AweBuilder._jQuery, AweBuilder._window);
