(function($) {
    var strTemplate = '<div class="message <% if (message["type"]) { %> <%= message["type"] %> <% } %><% if (message["style"]) { %> <%= message["style"] %> <% } %>">\
	<%  if (message["enableclose"]) {   %>\
		<a href="#" class="close" data-dismiss="message" aria-label="close" title="close">&#9587;</a>\
	<%  }  %>\
	<%  if (message["enableicon"]) {   %>\
		<div class="__icon"><i class="<%= (message["icon"])? message["icon"]: "fa fa-thumbs-up" %>"></i></div>\
	<%  }  %>\
	<h6 class="message_title">\
		<%= main[\'title\'] %>\
	</h6>\
	<p class="mb-0 message__content fz-6-s">\
		<%= main["content"] %>\
	</p>\
</div>';
    $.aweBuilderTemplate('el-message', strTemplate);
})(jQuery)