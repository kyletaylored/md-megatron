/**
 * File: el-message.js
 */
(function($, _$, _window) {
    function ready(el, model) {
        var _message = $('.message .message__content', el);
        _message.attr('contenteditable', 'true');

        //save data
        _message.blur(function(event) {
            var _text = $(this).html();
            model.setStorageValue('content', _text);
        });
		
		$('.message_title', el).attr('contenteditable', 'true');
        //save data
        $('.message_title', el).blur(function(event) {
            var _text = $(this).html().trim();
            model.setStorageValue('title', _text, 'main');
        });

        $('.message .close', el).click(function(event) {
            $(this).parent().hide();
        });
    }

    function changeClass(el, values) {
        $('.message', el).removeClass(values['prev']).addClass(values['current']);
    }

    function enableIcon($panel, el, values, element) {
        if (values.current) {
            $('.el-icon', $panel).show()
        } else {
            $('.el-icon', $panel).hide()
        }
        $('.el-icon', $panel).trigger('change');
    }

	AweBuilder.elementInfo('el-message', {
		title: 'MD Message',
		icon: 'acicon acicon-element',
        enableEditor: [{
				selector: '.message__content',
				saveTo: {}
			}, {
				selector: '.message_title',
				saveTo: {}
		}],
        defaultPart: "message",
        data: {
            main:{
                style: {
                    enabled: ['border', 'padding', 'margin'],
                    status: ['normal', 'hover']
                },
                settings:{
                    content: {
                        type: 'storage',
                        defaultValue: 'Your message goes here.'
                    },
					title: {
						type: 'storage',
						defaultValue: 'Message Title'
					},
                }
            },
			title: {
                title: 'Message Title',
                selector: '.message_title',
                style: {
                    enabled: ['font', 'background', 'border', 'padding', 'margin', 'shadow', 'transform'],
                    status: ['normal', 'hover']
                }
            },
            message:{
                title: 'Message',
                selector: '.message',
                style: {
                    enabled: {
                        font: {
                            status: ['normal']
                        },
                        background: {
                            status: ['normal', 'hover']
                        },
                        border: {
                            status: ['normal']
                        },
                        padding: {
                            status: ['normal']
                        },
                        margin: {
                            status: ['normal']
                        },
                        transform: {
                            status: ['normal']
                        }
                    }
                },
                settings: {
                    type: {
                        type: 'select',
                        inlineTitle: false,
                        title: 'Type',
                        options: {
                            'notice': 'Notice',
                            'info': 'Info',
                            'error': 'Error',
                            'success': 'Success',
							'warning': 'Warning'
                        },
                        devices: false,
                        defaultValue: 'success',
                        change: function($panel, el, values, element) {
                            changeClass(el, values);
                        }
                    },
                    style: {
                        type: 'select',
                        inlineTitle: true,
                        title: 'Style',
                        options: {
                            '': 'Default',
                            'full': 'Full',
                        },
                        devices: false,
                        defaultValue: '',
                        change: function($panel, el, values, element) {
                            changeClass(el, values);
                        }
                    },
                    enableclose: {
                        type: 'toggle',
                        title: 'Enable close button',
                        defaultValue: false,
                        devices: false,
                        change: function($panel, el, values, element) {
                            if(values.current == true && $('.message .close', el).length == false){
                                $('.message', el).prepend('<a href="#" class="close" data-dismiss="message" aria-label="close" title="close">&#9587;</a>')
                            }else if(values.current == false){
                                $('.message .close', el).remove();
                            }
                        }
                    },
                    enableicon: {
                        type: 'toggle',
                        title: 'Enable icon',
                        defaultValue: false,
                        devices: false,
                        change: function($panel, el, values, element) {
                            if(values.current == true && $('.message i', el).length == false){
                                $('.message', el).prepend('<div class="__icon"><i class="fa fa-thumbs-up"></i></div>');
                            }else if(values.current == false){
                                $('.message .__icon', el).remove();
                            }
                            enableIcon($panel, el, values, element);
                        }
                    },
                    icon: {
                        type: 'icon',
                        title: 'Icon',
                        defaultValue: '',
                        devices: false,
                        change: function($panel, el, values, element) {
                            if(values.current !== ''){
                                $('.message > .__icon > i', el).attr('class', '');
                                $('.message > .__icon > i', el).addClass(values.current);
                            }
                        }
                    }
                }
            }

        },
		ready: ready
	});
})(jQuery, AweBuilder._jQuery, AweBuilder._window);
