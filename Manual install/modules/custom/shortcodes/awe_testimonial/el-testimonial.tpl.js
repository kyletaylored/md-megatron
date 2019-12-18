(function($) {
    var strTemplate = '<div class="quote-1 __block testi-item <% if (main["style"]) { %><%= main["style"] %><% } %>">\
						  <header class="hr-header">\
							<h1 class="smb text-responsive testi-name">\
								<%= main[\'title\'] %>\
							</h1>\
							<div class="common-serif __caption testi-subtitle">\
								<%= main[\'subtitle\'] %>\
							</div>\
							<div class="separator-2-color"></div>\
							<div class="__content testi-desc">\
								<%= main[\'description\'] %>\
							</div>\
						  </header>\
						  <h6 class="position testi-position">\
							  <%= main[\'position\'] %>\
						  </h6>\
						  <div class="star-ratings">\
							  <% for(i=0; i < star["num"]; i++) { %>\
								<span class="rated">&#9733;</span>\
							  <% } %>\
						  </div>\
					   </div>\
					   <div class="quote-2 block-testimonial-2 testi-item <% if (main["style"]) { %><%= main["style"] %><% } %>">\
						  <div class="__content text-center">\
							<div class="font-serif-italic testi-desc">\
								<%= main[\'description\'] %>\
							</div>\
							<i class="fa fa-quote-right"></i>\
							<h6 class="testi-position">\
								<%= main[\'position\'] %>\
							</h6>\
							<div class="star-ratings">\
								<% for(i=0; i < star["num"]; i++) { %>\
								  <span class="rated">&#9733;</span>\
								<% } %>\
							</div>\
						  </div>\
					   </div>\
					   <div class="quote-3 block-testimonial-3 testi-item <% if (main["style"]) { %><%= main["style"] %><% } %>">\
						  <div class="__content text-center">\
							<div class="__image image-wrap"><img src="<%= image["file"]["url"] %>" alt="profile icon" class="ac-image-thumb" /></div>\
							<div class="font-serif-italic testi-desc">\
								<%= main[\'description\'] %>\
							</div>\
							<h6 class="testi-position">\
								<%= main[\'position\'] %>\
							</h6>\
							<div class="star-ratings">\
								<% for(i=0; i < star["num"]; i++) { %>\
								  <span class="rated">&#9733;</span>\
								<% } %>\
							</div>\
						  </div>\
					   </div>\
					   <div class="quote-4 block-testimonial-4 testi-item <% if (main["style"]) { %><%= main["style"] %><% } %>">\
						  <div class="__content text-center"><i class="fa fa-quote-right"></i>\
							<div class="font-serif-italic testi-desc">\
								<%= main[\'description\'] %>\
							</div>\
							<div class="__image image-wrap"><img src="<%= image["file"]["url"] %>" alt="profile icon" class="ac-image-thumb" /></div>\
							<h6 class="testi-position">\
								<%= main[\'position\'] %>\
							</h6>\
						  </div>\
					   </div>\
					   <div class="quote-5 __block testi-item <% if (main["style"]) { %><%= main["style"] %><% } %>">\
						  <header class="hr-header">\
							<div class="__content testi-desc">\
								<%= main[\'description\'] %>\
							</div>\
						  </header>\
						  <h6 class="testi-position">\
								<%= main[\'position\'] %>\
						  </h6>\
						  <div class="star-ratings">\
								<% for(i=0; i < star["num"]; i++) { %>\
								  <span class="rated">&#9733;</span>\
								<% } %>\
						  </div>\
					   </div>\
					   <div class="quote-6 block-testimonial-5 testi-item <% if (main["style"]) { %><%= main["style"] %><% } %>">\
						  <div class="__content text-center image-wrap">\
							<img src="<%= image["file"]["url"] %>" alt="logo" class="__logo img-responsive center-block ac-image-thumb"/>\
							<div class="star-ratings">\
								<% for(i=0; i < star["num"]; i++) { %>\
								  <span class="rated">&#9733;</span>\
								<% } %>\
							</div>\
							<div class="testi-desc">\
								<%= main[\'description\'] %>\
							</div>\
							<h6 class="testi-position">\
								<%= main[\'position\'] %>\
							</h6>\
						  </div>\
					   </div>';
    $.aweBuilderTemplate('el-testimonial', strTemplate);
})(jQuery)