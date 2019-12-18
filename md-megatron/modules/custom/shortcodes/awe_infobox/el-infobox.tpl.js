(function($) {
    var strTemplate = '<div class="block-service info-item info-1 <% if (main["style"] == "style-1") { %><%= main["style"] %><% } %>">\
						  <div class="__image overlay-container">\
							  <a href="<%= button["button_link"] %>" target="<%= button["button_target"] %>" class="ts-button image-wrap">\
								  <img src="<%= image["file"]["url"] %>" alt="image" class="ac-image-thumb" />\
							  </a>\
							  <div class="overlay-hover bgc-dark-o-4"></div>\
						  </div>\
						  <div class="__block">\
							  <div class="__sub-title info-subtitle font-serif-italic">\
							  	  <%= main[\'subtitle\'] %>\
							  </div>\
							  <h4 class="__title info-name">\
								  <%= main[\'title\'] %>\
							  </h4>\
							  <div class="__text info-desc">\
								  <%= main[\'description\'] %>\
							  </div>\
						  </div>\
					   </div>\
					   <div class="awe-cover-box cover-box info-item info-2 <% if (main["style"] == "style-2") { %><%= main["style"] %><% } %>">\
						  <div class="clearfix">\
							<div class="block-interactive-banner">\
								<div class="__content overlay-container image-wrap"><img src="<%= image["file"]["url"] %>" alt=" banner image" class="ac-image-thumb" />\
								  <div class="overlay bgc-dark-o-4 text-center">\
									<div class="cell-vertical-wrapper">\
									  <div class="cell-middle">\
									  	<div class="info-icon">\
											<i class="<%= icon["icon"] %>"></i>\
										</div>\
										<h4 class="info-name">\
											<%= main[\'title\'] %>\
										</h4>\
										<div class="__line"></div>\
										<div class="mb-0 font-serif-italic info-subtitle">\
											<%= main[\'subtitle\'] %>\
										</div>\
									  </div>\
									</div>\
								  </div>\
								</div>\
							</div>\
							<div class="cover-box-content">\
							  <div class="content-wrapper">\
								<h4 class="info-name-2">\
									<%= main[\'title_2\'] %>\
								</h4>\
								<div class="info-desc">\
									<%= main[\'description\'] %>\
								</div>\
								<a href="<%= button["button_link"] %>" target="<%= button["button_target"] %>" class="<%= button["button_style"] %> ts-button"><%= button["button_text"] %></a>\
							  </div>\
							</div>\
						  </div>\
					  </div>\
					  <div class="block-interactive-banner info-item info-3 <% if (main["style"] == "style-3") { %><%= main["style"] %><% } %>">\
						<div class="__content overlay-container image-wrap">\
							<img src="<%= image["file"]["url"] %>" alt=" banner image" class="ac-image-thumb" />\
							<div class="overlay bgc-dark-o-4 text-center">\
							  <div class="cell-vertical-wrapper">\
								<div class="cell-middle">\
								  <div class="info-icon">\
									  <i class="<%= icon["icon"] %>"></i>\
								  </div>\
								  <h4 class="info-name">\
									  <%= main[\'title\'] %>\
								  </h4>\
								  <div class="__line"></div>\
								  <div class="mb-0 font-serif-italic info-subtitle">\
									  <%= main[\'subtitle\'] %>\
								  </div>\
								</div>\
							  </div>\
							</div>\
						</div>\
					 </div>\
					 <div class="block-service info-item info-4 <% if (main["style"] == "style-4") { %><%= main["style"] %><% } %>">\
						  <div class="block-interactive-banner">\
							  <div class="__content overlay-container image-wrap">\
								<img src="<%= image["file"]["url"] %>" alt=" banner image" class="ac-image-thumb" />\
								<div class="overlay bgc-dark-o-4 text-center">\
								  <div class="cell-vertical-wrapper">\
									<div class="cell-middle">\
									  <div class="info-icon">\
										  <i class="<%= icon["icon"] %>"></i>\
									  </div>\
									  <h4 class="info-name">\
										  <%= main[\'title\'] %>\
									  </h4>\
									  <div class="__line"></div>\
									  <div class="mb-0 font-serif-italic info-subtitle">\
										  <%= main[\'subtitle\'] %>\
									  </div>\
									</div>\
								  </div>\
								</div>\
							  </div>\
						  </div>\
						  <div class="__block">\
							<div class="__sub-title font-serif-italic info-subtitle-2">\
								<%= main[\'subtitle_2\'] %>\
							</div>\
							<h4 class="__title info-name-2">\
								<%= main[\'title_2\'] %>\
							</h4>\
							<div class="__text info-desc">\
								<%= main[\'description\'] %>\
							</div>\
						  </div>\
					 </div>';
    $.aweBuilderTemplate('el-infobox', strTemplate);
})(jQuery)