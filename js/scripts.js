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

    $(".main_nav_dropdown_list a").each(function(){
        // $(this).children("ul").addClass("sub_menu");
        if($(this).next("ul").length > 0) {
            $(this).append("<div type='button' class='arrow_btn'></div>");
        }
    });

	$(".respmenubtn").click(function() {
        if( $("#dropdown_menu").is(":hidden") ) {
            $("#dropdown_menu").slideDown(500);
            $(this).addClass("active");
            $("#menu_show").fadeIn(500);
        } else {
            $("#dropdown_menu").slideUp(500);
            $(this).removeClass("active");
            $("#menu_show").fadeOut(500);
        }
    });

    $(".main_nav_dropdown_list li a").mouseover(function() {
        if(!$(this).closest("ul").prev("a").hasClass("active")) {
            $(".main_nav_dropdown_list li a").removeClass("active");
        }
        $(this).closest("ul").find("a").removeClass("active");
        $(this).addClass("active");
    });

    // $(this).keydown(function(eventObject){
    //     if (eventObject.which == 27 &&
    //         $("#dropdown_menu").is(":visible") ) {
    //             $("#dropdown_menu").slideUp(500);
    //             $(".respmenubtn").removeClass("active");
    //             $("#menu_show").fadeOut(500);
    //     }
    // });

    // $("#menu_show").on('click', function(e) {
    // 	e.preventDefault();
    // 	$(".respmenubtn").removeClass("active");
    // 	$("#dropdown_menu").slideUp(500);
    // 	$("#menu_show").fadeOut(500);
    // })



    // ----------------------------

	$(".gallery").each(function() {
		$(this).find(".photo_box:even").addClass("even");
	});

	$(".gallery").find(".photo_box.even:odd").addClass("w_2");

	// ----------

    $("[data-popup-link]").on("click", function(e) {
        e.preventDefault();
        popupName = $(this).attr("data-popup-link");
        div = document.createElement('div');
        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        scrollWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);
        $("body").css({
            "position" : "fixed",
            "top" :  -$(document).scrollTop() + "px",
            "overflow" : "hidden",
            "right" : 0,
            "left" : 0,
            "bottom" : 0,
            "padding-right" : scrollWidth + "px"
        });
        $("body").addClass("fixed");
        $("[data-popup = '"+ popupName +"']").fadeIn(300);
    });

    $(".close_btn").on("click", function(e) {
        e.preventDefault();
        curTop = $("body").css("top");
        curTop = Math.abs(parseInt(curTop, 10));
        $("body").attr("style", "")
        if (curTop !== 0) {
            $("html").scrollTop(curTop);
        }
        $("body").removeClass("fixed");
        $(this).closest("[data-popup]").fadeOut(300);
    });

    $(this).keydown(function(eventObject){
        if (eventObject.which == 27 ) {
            curTop = $("body").css("top");
            curTop = Math.abs(parseInt(curTop, 10));
            $("body").attr("style", "")
            if (curTop !== 0) {
                $("html").scrollTop(curTop);
            }
            $("body").removeClass("fixed");
            $("[data-popup]").fadeOut(300);
        }
    });

    $(".popup_sect").mouseup(function (e){
        hide_element = $(".popup_wrapp");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
            curTop = $("body").css("top");
            curTop = Math.abs(parseInt(curTop, 10));
            $("body").attr("style", "")
            if (curTop !== 0) {
                $("html").scrollTop(curTop);
            }
            $("body").removeClass("fixed");
            $("[data-popup]").fadeOut(300);
        }
    });

    // -----------------------

});