var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;


$(window).load(function() {



});

$(window).resize(function() {



});

$(document).scroll(function() {



});

$(document).ready(function() {

	$(".gallery").each(function() {
		$(this).find(".photo_box:even").addClass("even");
	});

	$(".gallery").find(".photo_box.even:odd").addClass("w_2");

});