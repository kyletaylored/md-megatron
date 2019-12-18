(function($) {
    var strTemplate = '<div class="service-item service-1 block-interactive-banner-3 <% if (main["style"]) { %><%= main["style"] %><% } %>">\
						  <div class="__icon"><i class="<%= icon["icon"] %> service-icon"></i></div>\
						  <div class="__content">\
							<div class="cell-vertical-wrapper">\
							  <div class="cell-middle">\
								<div class="__block">\
								  <p class="__sub-title service-subtitle">\
									  <%= main[\'subtitle\'] %>\
								  </p>\
								  <h4 class="__title service-title">\
									  <%= main[\'title\'] %>\
								  </h4>\
								  <p class="__text service-desc">\
									  <%= main[\'description\'] %>\
								  </p>\
								  <div class="__button"><a href="<%= button["button_link"] %>" target="<%= button["button_target"] %>" class="<%= button["button_style"] %> ts-button"><%= button["button_text"] %></a></div>\
								</div>\
							  </div>\
							</div>\
						  </div>\
					   </div>\
					   <div class="service-item service-2 block-interactive-banner-2 <% if (main["style"]) { %><%= main["style"] %><% } %>">\
						  <div class="__content overlay-container">\
							<div class="overlay">\
							  <div class="cell-vertical-wrapper">\
								<div class="cell-middle">\
								  <div class="__block">\
									<p class="__sub-title font-serif-italic service-subtitle">\
										<%= main[\'subtitle\'] %>\
									</p>\
									<h4 class="__title service-title">\
										<%= main[\'title\'] %>\
									</h4>\
									<p class="__text service-desc">\
										<%= main[\'description\'] %>\
									</p>\
									<a href="<%= button["button_link"] %>" target="<%= button["button_target"] %>" class="<%= button["button_style"] %> ts-button"><%= button["button_text"] %></a>\
								  </div>\
								</div>\
							  </div>\
							</div>\
						  </div>\
					  </div>';
    $.aweBuilderTemplate('el-service', strTemplate);
})(jQuery)