(function($) {
    var strTemplate = '<div class="team-item block-team-2 team-1 <% if (main["style"]) { %><%= main["style"] %><% } %>">\
						  <div class="__image image-wrap">\
						  	  <img src="<%= image["file"]["url"] %>" alt="image" class="ac-image-thumb" />\
						  </div>\
						  <div class="__block">\
						  	  <div class="__name team-title">\
								  <%= main[\'title\'] %>\
							  </div>\
							  <div class="__role team-position">\
								  <%= main[\'position\'] %>\
							  </div>\
						  </div>\
					   </div>\
					   <div class="team-item team-2 block-team-2 <% if (main["style"]) { %><%= main["style"] %><% } %>">\
						  <div class="__image image-wrap">\
						  	<img src="<%= image["file"]["url"] %>" alt="image" class="ac-image-thumb" />\
							<ul class="social circle social-list"></ul>\
						  </div>\
						  <div class="__block">\
							<div class="__name team-title">\
								<%= main[\'title\'] %>\
							</div>\
							<div class="__role team-position">\
								<%= main[\'position\'] %>\
							</div>\
						  </div>\
					   </div>\
					   <div class="team-item team-3 block-team <% if (main["style"]) { %><%= main["style"] %><% } %>">\
						  <div class="__image image-wrap">\
							<img src="<%= image["file"]["url"] %>" alt="team member" class="ac-image-thumb" />\
						  </div>\
						  <div class="__info">\
							<h4 class="__name team-title">\
								<%= main[\'title\'] %>\
							</h4>\
							<p class="__role font-serif-italic team-position">\
								<%= main[\'position\'] %>\
							</p>\
							<p class="__text team-desc">\
								<%= main[\'description\'] %>\
							</p>\
							<ul class="social circle primary social-list"></ul>\
						  </div>\
					   </div>\
					   <div class="team-item team-4 block-team team-horizontal <% if (main["style"]) { %><%= main["style"] %><% } %>">\
						  <div class="__image image-wrap">\
							<img src="<%= image["file"]["url"] %>" alt="team member" class="ac-image-thumb" />\
						  </div>\
						  <div class="__info">\
							<h4 class="__name team-title">\
								<%= main[\'title\'] %>\
							</h4>\
							<p class="__role font-serif-italic team-position">\
								<%= main[\'position\'] %>\
							</p>\
							<p class="__text team-desc">\
								<%= main[\'description\'] %>\
							</p>\
							<ul class="social circle primary social-list"></ul>\
						  </div>\
					   </div>';
    $.aweBuilderTemplate('el-team', strTemplate);
})(jQuery)