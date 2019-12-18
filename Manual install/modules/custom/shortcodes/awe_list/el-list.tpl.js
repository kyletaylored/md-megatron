(function($) {
	var strTemplate = '<ul class="list <% if (main["style"]) { %><%= main["style"] %><% } %>"></ul>\
					   <ol class="list <% if (main["style"]) { %><%= main["style"] %><% } %>"></ol>';
    $.aweBuilderTemplate('el-list', strTemplate);
})(jQuery)