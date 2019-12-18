(function($) {
    var strTemplate = '<div class="ac-counter">\
		<%  _.each( main[\'order_counter\'] ,function(value,key){  %>\
			<%  if (value == "order_icon"){   %>\
				<%  if(main[\'icon_enable\']){   %>\
					<i class="ac-icon <%= main["icon_option"]["choose_icon"] %>" style="color: <%= main[\'icon_option\'][\'icon_color\'] %>; font-size: <%= main[\'icon_option\'][\'icon_size\'] %>px"></i>\
				<%  }  %>\
			<%  }  %>\
			<%  if (value == "order_number"){   %>\
				<div class="counter-value" data-from="0" data-to="<%= main[\'counter_number\'] %>" data-speed="1000">\
					<span><%= main[\'counter_number\'] %></span>\
				</div>\
			<%  }  %>\
			<%  if (value == "order_title"){   %>\
				<%  if(main[\'enable_title\']){   %>\
					<div class="counter-title"><%= main[\'counter_title\'] %></div>\
				<%  }  %>\
			<%  }  %>\
			<%  if (value == "order_line"){   %>\
				<%  if(main[\'enable_line\']){   %>\
					<span class="counter-line"></span>\
				<%  }  %>\
			<%  }  %>\
		<%  })  %>\
</div>';
    $.aweBuilderTemplate('el-funfact', strTemplate);
})(jQuery)