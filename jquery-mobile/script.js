$(document).ready(function () {
	var $ = jQuery.noConflict();
	$('#menu-toggle').click(function(){
	if($('#menu').hasClass('open')){
	$('#menu').removeClass('open');
	$('#menu-toggle').removeClass('open');
}else{
	$('#menu').addClass('open');
	$('#menu-toggle').addClass('open');
		}
	});
});
