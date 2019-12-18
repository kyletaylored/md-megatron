(function ($, Drupal, drupalSettings) {
    $(document).ready(function () {
        var builder, $box_content_builder, $iframe_jquery;
        // callback to show node form
        function showNodeForm() {
            $('body').removeClass('awecontent-active').find('.js-awecontent-wrapper').removeClass('awecontent-wrapper');
            $('.awecontent-body-wrapper').children().show();
            // fix for toolbar
            $('#toolbar, #admin-menu').show();
        }

        // callback to hide node form
        function disableNodeForm() {
            $('body').addClass('awecontent-active').find('.js-awecontent-wrapper').addClass('awecontent-wrapper');
            $('.awecontent-body-wrapper').children().hide();
            // fix for toolbar
            $('#toolbar, #admin-menu').hide();
        }

        // main
        var pathConfigurations = drupalSettings.pathConfigurations;
        $.extend(AweBuilderSettings.URLs, pathConfigurations);

        // Move all body children in to wrapper
        $('body').append('<div class="awecontent-body-wrapper"></div>');
        $('.awecontent-body-wrapper').append($('body').children(':not(.awecontent-body-wrapper, .sp-container)'));
        // hide button build from template
        $('.awe-field-content').each(function () {
            if ($(this).val().trim()) {
                $(this).closest('td').find('.awe-btn-build-template').hide();
            }
        });

        // Handle click button to active page builder
        $('.awe-btn-build').click(function (event) {
            event.preventDefault();
            $box_content_builder = $(this).parent().parent();
            AweBuilderSettings.google_font = $('.awe-google-font', $box_content_builder).val();
            if (AweBuilderSettings.google_font) {
                var build_font_link = AweBuilderSettings.URLs.fonts;
                if ($.type(AweBuilderSettings.URLs.fonts) == 'string')
                    AweBuilderSettings.URLs.fonts = {
                        url: build_font_link,
                        extraData: {google_font: AweBuilderSettings.google_font}
                    };
                else
                    AweBuilderSettings.URLs.fonts.extraData.google_font = AweBuilderSettings.google_font;
            }
            $('body').addClass('awecontent-active');
            disableNodeForm();
        });

        $('body').prepend('<div class="js-awecontent-wrapper"></div>');
        //create builder
        builder = new AweBuilder.Builder({
            //content:data,
            wrapper: '.js-awecontent-wrapper',
            buildButtons: {
                defaultButton: $('.awe-btn-build-normal', $box_content_builder),
                fromTemplateButton: $('.awe-btn-build-template', $box_content_builder),
                defaultButtonClick: function (builder) {
                    var content = $('.awe-field-content', $box_content_builder).val().trim();
                    content = content ? AweBuilder.parseJSON(content) : {};
                    console.log(content);
                    builder.setOptions({content: content});
                }
            },
            onClose: function (builderData) {
                showNodeForm();
                if (builderData) {
                    $('.awe-field-content', $box_content_builder).val(builderData);
                }
            },
            onReady: function ($iframe) {
                $iframe_jquery = $iframe[0].contentWindow.jQuery;
                // disable redirect link
                $iframe_jquery('a').click(function (event) {
                    if($(this).closest('.ac_element').length || $(this).closest('.ac_row').length){
                        return true;
                    } else {
                        event.preventDefault();
                        return false;
                    }
                });
                $iframe_jquery('body').addClass('ac_creating');
            }
        });
    })
})(jQuery, Drupal, drupalSettings);
