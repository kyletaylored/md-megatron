(function($) {
    var strTemplate = '<div class="block-process process-item process-1 <% if (main["style"]) { %><%= main["style"] %><% } %>">\
							<h6 class="__title process-title">\
								<%= main[\'title\'] %>\
							</h6>\
							<div class="__icon">\
							  <div class="line <% if (line["line_enable"]) { %> <%= line["line_enable"] %> <% } %>"></div>\
							  <div class="circle-icon process-icon">\
							  	<i class="<%= icon["icon"] %>"></i>\
							  </div>\
							</div>\
							<p class="__content process-desc">\
								<%= main[\'description\'] %>\
							</p>\
					   </div>\
					   <div class="block-process-2 process-item process-2 <% if (main["style"]) { %><%= main["style"] %><% } %>">\
							<span class="__number font-heading number"><%= number["number"] %></span>\
							<div class="cell-vertical-wrapper">\
							  <div class="cell-middle">\
								<div class="__block">\
								  <div class="__title font-heading process-title">\
								  	<%= main[\'title\'] %>\
								  </div>\
								  <p class="__content process-desc">\
								  	<%= main[\'description\'] %>\
								  </p>\
								</div>\
							  </div>\
							</div>\
					   </div>';
    $.aweBuilderTemplate('el-process', strTemplate);
})(jQuery)