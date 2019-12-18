jQuery(document).ready(function ($) {
    var builder, $iframe, resetGoogleFont = true, $iframe_jquery;
    // callback to show node form
    function showNodeForm() {
        jQuery('body').removeClass('awecontent-active').find('.js-awecontent-wrapper').removeClass('awecontent-wrapper');
        jQuery('.awecontent-body-wrapper').children().show();
        // fix for toolbar
        jQuery('#toolbar, #admin-menu').show();
    }

    // callback to hide node form
    function disableNodeForm() {
        jQuery('body').addClass('awecontent-active').find('.js-awecontent-wrapper').addClass('awecontent-wrapper');
        jQuery('.awecontent-body-wrapper').children().hide();
        // fix for toolbar
        jQuery('#toolbar, #admin-menu').hide();
    }


    // main
    var pathConfigurations = jQuery('input[name=path_config]').val().trim();
    pathConfigurations = JSON.parse(pathConfigurations);
    jQuery.extend(AweBuilderSettings.URLs, pathConfigurations);

    // Move all body children in to wrapper
    jQuery('body').append('<div class="awecontent-body-wrapper"></div>');
    jQuery('.awecontent-body-wrapper').append(jQuery('body').children(':not(.awecontent-body-wrapper, .sp-container)'));


    // update google font
    var current_google_font = '', new_google_font;
    $('.awe-google-font').focusin(function(){
        current_google_font = $(this).val();
    }).focusout(function(){
        new_google_font = $(this).val();
        if(current_google_font !== new_google_font){
            resetGoogleFont = true;
            AweBuilderSettings.google_font = new_google_font;
        }
        else
            resetGoogleFont = false;
    });

    // Handle click button to active page builder
    jQuery('.awe-btn-build').click(function(event) {
        event.preventDefault();
        var page_region = $('#edit-regions input').serialize() || 'regions%5Bcontent%5D=content';
        if(page_region)
            AweBuilderSettings.URLs.buildPage = pathConfigurations.buildPage + '&' + page_region;
        AweBuilderSettings.google_font = jQuery('.awe-google-font').val();
        if(AweBuilderSettings.google_font){
            var build_font_link = AweBuilderSettings.URLs.fonts;
            if(jQuery.type(AweBuilderSettings.URLs.fonts) == 'string')
                AweBuilderSettings.URLs.fonts = {
                    url:build_font_link,
                    extraData:{google_font : AweBuilderSettings.google_font}
                };
            else
                AweBuilderSettings.URLs.fonts.extraData.google_font = AweBuilderSettings.google_font;
        }
        jQuery('body').addClass('awecontent-active');
        disableNodeForm();
        // hide button build from tempate when click button build
        $('.awe-btn-build-template').hide();
    });

    jQuery('body').prepend('<div class="js-awecontent-wrapper"></div>');
    //create builder
    var data = jQuery('#awe-page-content').val().trim();
    // hide button build from tempate
    if(data){
        $('.awe-btn-build-template').hide();
        $('.awe-btn-build-normal').attr('data-tooltip','Edit page');
        $('.awe-btn-build-normal i').removeClass('acicon-new').addClass('acicon-pen');
    }

    data = data ? JSON.parse(data) : {};

    builder =  new AweBuilder.Builder({
        content:data,
        wrapper: '.js-awecontent-wrapper',
        buildButtons: {
            defaultButton: '.awe-btn-build-normal',
            fromTemplateButton: '.awe-btn-build-template'
        },
        onClose: function(builderData) {
            showNodeForm();
            if(builderData){
                jQuery('#awe-page-content').val(builderData);
                jQuery('#awe-change-content').val(1);
            }
        },
        onReady:function($iframe){
            $iframe_jquery = $iframe[0].contentWindow.jQuery;
            // disable redirect link
            $iframe_jquery('a').click(function(event){
                if($(this).closest('.ac_element').length || $(this).closest('.ac_row').length){
                    return true;
                } else {
                    event.preventDefault();
                    return false;
                }
            });
            $iframe_jquery('body').addClass('ac_creating');
            // add google font
            $(window).trigger('updateFont');
        }
    });

    $(window).bind('updateFont', function(event){
        if($iframe && $iframe.length){
            // reset google font
            if(resetGoogleFont){
                var font_link = $iframe.find('link[href = "' + current_google_font + '"]');
                if(font_link.length)
                    (AweBuilderSettings.google_font)?font_link.attr('href',AweBuilderSettings.google_font):font_link.remove();
                else if(AweBuilderSettings.google_font){
                    font_link = '<link type="text/css" rel="stylesheet" href="' + AweBuilderSettings.google_font + '" media="all">';
                    $iframe_jquery(font_link).insertAfter('title');
                }
                resetGoogleFont = false;
            }
        }
    });
});