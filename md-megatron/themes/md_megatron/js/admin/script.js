jQuery(document).ready(function ($) {
    "use strict"; // Start of use strict
	
	$("#edit-background-color").spectrum({
		allowEmpty:true,
    	showInitial: true,
    	showInput: true,
		showAlpha: true
	});
	$("#edit-h1-color, #edit-h2-color, #edit-h3-color, #edit-h4-color, #edit-h5-color, #edit-h6-color, #edit-link-normal-color, #edit-link-hover-color, #edit-link-visited-color, #edit-link-active-color, #edit-base-color").spectrum({
    	allowEmpty:true,
    	showInitial: true,
    	showInput: true
	});
});