(function($) {
    var strTemplate = '<div class="ac-googleplus <%= main[\'google_align\'] %>">\
                                <div class="iframe-googleplus">\
                                        <div class="<%= main[\'google_type\'] %>" data-href="<%= main[\'google_link\'] %>" data-width="<%= main[\'google_width\'] %>" data-layout="<%= main[\'google_layout\'] %>" data-theme="<%= main[\'google_theme\'] %>" data-showphoto="<%= main[\'google_enable_photo\'] %>" data-showtagline="<%= main[\'google_enable_tag_line\'] %>" data-showowners="<%= main[\'google_enable_author_community\'] %>"></div>\
                                </div>\
                        </div>';
    $.aweBuilderTemplate('el-googleplus', strTemplate);
})(jQuery)