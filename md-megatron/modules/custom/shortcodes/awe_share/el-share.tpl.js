(function($) {
	var strTemplate = '<div class="group-share-module-1 share-item share-1 <% if (main["style"]) { %><%= main["style"] %><% } %> <% if (column["column"]) { %><%= column["column"] %><% } %>"></div>\
					   <div class="group-share-module-2 share-item share-2 <% if (main["style"]) { %><%= main["style"] %><% } %> <% if (column["column"]) { %><%= column["column"] %><% } %>"></div>';
    $.aweBuilderTemplate('el-share', strTemplate);
})(jQuery)