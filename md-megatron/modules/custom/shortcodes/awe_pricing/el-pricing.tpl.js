(function($) {
    var strTemplate = '<div class="price-table-item text-center pricing-item">\
						  <div class="__body">\
							  <%  _.each( main[\'order_counter\'] ,function(value,key){  %>\
								  <%  if (value == "order_header"){   %>\
									  <div class="__title <% if (main["header_enable"]=="") { %> false <% } %> <% if (main["is_feature"]) { %> default <% } %>">\
										  <h4 class="color-light mb-0 pricing-type">\
												<%= main[\'type\'] %>\
										  </h4>\
									  </div>\
								  <%  }  %>\
								  <%  if (value == "order_icon"){   %>\
									  <div class="service-box <% if (main["icon_enable"]=="") { %> false <% } %>">\
										  <i class="pricing-icon <%= (icon["icon"])? icon["icon"]: \'icon-help-circled\' %>"></i>\
										  <h4 class="pricing-title">\
											<%= main[\'title\'] %>\
										  </h4>\
										  <p class="font-serif-italic mb-0 pricing-subtitle">\
											<%= main[\'subtitle\'] %>\
										  </p>\
									  </div>\
								  <%  }  %>\
								  <% if(value == "order_feature") { %>\
									<ul class="text-center feature-list <% if (main["features_enable"]=="") { %> false <% } %>">\
										<%= main[\'features\'] %>\
									</ul>\
								  <%  }  %>\
								  <% if(value == "order_price") { %>\
									<h1 class="size-ll price <%= price["style"] %> <% if (main["price_enable"]=="") { %> false <% } %>">\
									  <span class="price-value">\
										  <%= main[\'price_value\'] %>\
									  </span>\
									  <span class="price-duration">\
										  <%= main[\'price_duration\'] %>\
									  </span>\
									</h1>\
								  <%  }  %>\
								  <% if(value == "order_footer") { %>\
									<a href="<%= button["button_link"] %>" target="<%= button["button_target"] %>" class="<%= button["button_style"] %> ts-button <% if (main["button_enable"]=="") { %> false <% } %>"><%= button["button_text"] %></a>\
								  <%  }  %>\
							   <%  })  %>\
							</div>\
					     </div>';
    $.aweBuilderTemplate('el-pricing', strTemplate);
})(jQuery)