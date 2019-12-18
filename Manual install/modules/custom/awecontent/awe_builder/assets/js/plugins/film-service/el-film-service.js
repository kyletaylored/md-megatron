/**
 * File: el-header.js
 */
(function($, _$, _window) {

    function ready(el, model) {
        $('.service-name', el).attr('contenteditable', 'true');
        $('.service-desc', el).attr('contenteditable', 'true');

        $('.service-name', el).blur(function(event) {
            var _text = $(this).aweHtml();
            model.setStorageValue('content', _text, 'name');
        })
        $('.service-desc', el).blur(function(event) {
            var _text = $(this).aweHtml();
            model.setStorageValue('content', _text, 'desc');
        })

    }


    AweBuilder.elementInfo('el-film-service', {
        title: 'Film services',
        icon: '',
        enableEditor: {
            selector: '.service-name, .service-desc',
            saveTo: {}
        },
        defaultPart: 'icon',
        data: {
            main: {
                style: {
                    enabled: ['border', 'padding', 'margin']
                }
            },
            icon: {
                title: 'Icon',
                selector: '.service-icon i',
                title: 'Icon',
                selector: '.ac-icon',
                style: {
                    enabled:['font', 'background', 'border', 'padding', 'margin'],
                    status: ['normal', 'hover']
                },
                settings: {
                    icon: {
                        type: 'icon',
                        title: 'Chosse Icon',
                        defaultValue: '',
                        devices: false,
                        change: function($panel, el, values, element) {
                            if(typeof values.prev != 'undefined' ){
                                $('.service-icon > i', el).attr('class', '');
                                $('.service-icon > i', el).addClass(values.current);
                            }
                        }
                    }
                }
            },
            name: {
                title: 'Name',
                selector: '.service-name',
                style: {
                    enabled: ['font', 'background', 'border', 'padding', 'margin', 'shadow'],
                    status: ['normal', 'hover']
                },
                settings: {
                    content: {
                        type: 'storage',
                        defaultValue: 'Studio Z1 Sound Stage',
                    }
                }
            },
            desc: {
                title: 'Description',
                selector: '.service-desc',
                style: {
                    enabled: ['font', 'background', 'border', 'padding', 'margin', 'shadow'],
                    status: ['normal', 'hover']
                },
                settings: {
                    content: {
                        type: 'storage',
                        defaultValue: 'It was popularised in the 1960s with the release of Letraset',
                    }
                }
            }
        },
        ready: ready
    });
})(jQuery, AweBuilder._jQuery, AweBuilder._window);
