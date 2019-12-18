(function($) {
    var strTemplate = '<blockquote class="blockquote-item <% if (main["style"]) { %><%= main["style"] %><% } %>">\
						  <%= main[\'description\'] %>\
					   </blockquote>\
					   <p class="blockquote-item <% if (main["style"]) { %><%= main["style"] %><% } %>">\
						  <%= main[\'description\'] %>\
					   </p>';
    $.aweBuilderTemplate('el-blockquote', strTemplate);
})(jQuery)