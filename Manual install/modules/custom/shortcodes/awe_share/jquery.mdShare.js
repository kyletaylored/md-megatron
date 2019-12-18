(function ($) {
    $.fn.mdShare = function () {
		if($('.share-1').length > 0) {
			$(this).css('background-color', $(this).children('a').attr("data-bg-color"));
			$(this).children('a').css('color', $(this).children('a').attr("data-color"));
			$(this).children('a').hover(
			  function() {
				$(this).css('color', $(this).attr("data-hover-color"));
				$(this).parent('.module').css('background-color', $(this).attr("data-bg-hover-color"));
			  }, function() {
				$(this).css('color', $(this).attr("data-color"));
				$(this).parent('.module').css('background-color', $(this).attr("data-bg-color"));
			  }
			);
		}
		if($('.share-2').length > 0) {
			$(this).children('a').find('.__name').css({"color": $(this).children('a').attr("data-color"),"background-color": $(this).children('a').attr("data-bg-color")});
			$(this).children('a').find('.__icon').css({"color": $(this).children('a').attr("data-hover-color"),"background-color": $(this).children('a').attr("data-bg-hover-color")});
		}
    }
	$(document).ready(function () {
		$('.share-1 > .module').each(function () {
            $(this).mdShare();
        });
		$('.share-2 > .module').each(function () {
            $(this).mdShare();
        });
    })
})(jQuery);