(function($) {
    var strTemplate = '<div class="block-icon-box feature-item feature-1 <% if (main["style"]) { %><%= main["style"] %><% } %>">\
						  <div class="__header clearfix">\
							<div class="__icon circle-icon feature-icon">\
								<i class="<%= icon["icon"] %>"></i>\
							</div>\
							<h6 class="nmb __heading feature-title">\
								<%= main[\'title\'] %>\
							</h6>\
						  </div>\
						  <div class="__content feature-desc">\
							  <%= main[\'description\'] %>\
						  </div>\
					   </div>\
					   <div class="block-icon-box-vertical feature-item feature-2 <% if (main["style"]) { %><%= main["style"] %><% } %>">\
						  <div class="__icon circle-icon feature-icon">\
							  <i class="<%= icon["icon"] %>"></i>\
						  </div>\
						  <h4 class="__heading smb feature-title">\
							  <%= main[\'title\'] %>\
						  </h4>\
						  <div class="__content feature-desc">\
							  <%= main[\'description\'] %>\
						  </div>\
					   </div>\
					   <div class="block-icon-box-left-icon feature-item feature-3 <% if (main["style"]) { %><%= main["style"] %><% } %>">\
						  <div class="__icon circle-icon feature-icon">\
							  <i class="<%= icon["icon"] %>"></i>\
						  </div>\
						  <div class="__right-side">\
							<h4 class="__heading smb feature-title">\
								<%= main[\'title\'] %>\
							</h4>\
							<div class="__content feature-desc">\
								<%= main[\'description\'] %>\
							</div>\
						  </div>\
					   </div>\
					   <div class="block-icon-box-left-icon group-icon-list process-style feature-item feature-4 <% if (main["style"]) { %><%= main["style"] %><% } %>">\
						  <div class="__icon simple-icon">\
							  <i class="feature-icon <%= icon["icon"] %>"></i>\
							  <span class="vline"></span>\
						  </div>\
						  <div class="__right-side">\
							<h6 class="__heading smb feature-title">\
								<%= main[\'title\'] %>\
							</h6>\
							<div class="__content feature-desc">\
								<%= main[\'description\'] %>\
							</div>\
						  </div>\
					   </div>\
					   <div class="block-icon-box-left-icon feature-item feature-5 <% if (main["style"]) { %><%= main["style"] %><% } %>">\
						  <div class="__icon simple-icon">\
						  	  <i class="feature-icon <%= icon["icon"] %>"></i>\
						  </div>\
						  <div class="__right-side">\
						  	  <h6 class="__heading smb feature-title">\
							  	  <%= main[\'title\'] %>\
							  </h6>\
							  <div class="__content feature-desc">\
							  	  <%= main[\'description\'] %>\
							  </div>\
						   </div>\
					   </div>\
					   <div class="block-icon-box-left-icon group-icon-list process-style feature-item feature-6 <% if (main["style"]) { %><%= main["style"] %><% } %>">\
						   <div class="__icon circle-icon feature-icon">\
						   	  <i class="<%= icon["icon"] %>"></i>\
						   </div>\
						   <div class="__right-side">\
							  <h6 class="__heading smb feature-title">\
							  	  <%= main[\'title\'] %>\
							  </h6>\
							  <div class="__content feature-desc">\
							  	  <%= main[\'description\'] %>\
							  </div>\
						   </div>\
						   <span class="vline"></span>\
					   </div>\
					   <div class="block-icon-box-vertical feature-item feature-7 <% if (main["style"]) { %><%= main["style"] %><% } %>">\
						   <div class="__icon simple-icon">\
						   	  <i class="feature-icon <%= icon["icon"] %>"></i>\
						   </div>\
						   <h4 class="__heading smb feature-title">\
						   	  <%= main[\'title\'] %>\
						   </h4>\
						   <div class="__caption font-serif italic feature-subtitle">\
						   	  <%= main[\'subtitle\'] %>\
						   </div>\
						   <div class="__content feature-desc">\
						   	  <%= main[\'description\'] %>\
						   </div>\
					   </div>\
					   <div class="block-icon-box feature-item feature-8 <% if (main["style"]) { %><%= main["style"] %><% } %>">\
					   	   <div class="__header clearfix">\
							  <div class="__icon simple-icon">\
							  	  <i class="feature-icon <%= icon["icon"] %>"></i>\
							  </div>\
							  <h6 class="nmb __heading feature-title">\
							  	  <%= main[\'title\'] %>\
							  </h6>\
							</div>\
							<div class="__content feature-desc">\
							  <%= main[\'description\'] %>\
							</div>\
					   </div>';
    $.aweBuilderTemplate('el-feature', strTemplate);
})(jQuery)