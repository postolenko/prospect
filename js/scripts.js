function getAdaptivePositionElements() {
    $(".append-elem").each(function() {
        screenParam = parseInt( $(this).attr("data-min-screen") );
        indexElem = $(this).attr("data-append-desktop-elem");
        if( bodyWidth <= screenParam ) {
            $("[data-append-elem = '"+ indexElem +"']").append($(this).children());
        }
         if( bodyWidth > screenParam ) {
            $("[data-append-desktop-elem = '"+ indexElem +"']").append($("[data-append-elem = '"+ indexElem +"']").children());
        }
    });
}

function resetParams() {
    if(bodyWidth > 767) {
        $(".main_nav_dropdown_list *").removeClass("active");
    }
}

var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

var menuTitle;

$(window).load(function() {



});

$(window).resize(function() {
    bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;
    getAdaptivePositionElements();
    resetParams();
});

$(document).scroll(function() {



});

$(document).ready(function() {

    getAdaptivePositionElements();
    resetParams();


    // Выпадающее меню
    // ------------------------

    $(".main_nav_dropdown_list a").each(function(){
        if($(this).next("ul").length > 0) {
            $(this).append("<div type='button' class='arrow_btn'></div>");
        }
    });

    $(".main_nav_dropdown_list > li").each(function(){
        if($(this).children("ul").length > 0) {
            $(this).children("ul").addClass("index_1");
        }
    });

    $(".main_nav_dropdown_list ul.index_1 > li").each(function(){
        if($(this).children("ul").length > 0) {
            $(this).children("ul").addClass("index_2");
        }
    });

    $("ul.index_1, ul.index_2").prepend("<li class='resp_item'><a href='#' class='back_menu'>Назад</a></li>");
    
    $(".back_menu").each(function() {
        parentBlock = $(this).closest("li");
        menuTitle = $(this).closest("ul").prev("a").text();
        parentBlock.append("<h4 class='menu_title'>"+menuTitle+":</h4>");
    });

    $(".main_nav_dropdown_list > li").each(function() {
        if( $(this).find("ul").length <= 1 ) {
            $(this).addClass("two_menu");
            return true;
        }
    });

    $(".main_nav_dropdown_list li a").mouseover(function() {
        if(bodyWidth > 767) {
            parentBlock = $(this).closest("li");
            if(!$(this).closest("ul").prev("a").hasClass("active")) {
                $(".main_nav_dropdown_list li a").removeClass("active");
            }
            $(this).closest("ul").find("a").removeClass("active");
            $(this).addClass("active");
            parentBlock.find("ul li").each(function() {
                if(!$(this).hasClass("resp_item")) {
                    $(this).find("a:eq(0)").addClass("active");
                    return false;
                }
            });
        }
    });

    $(".arrow_btn").on("click", function(e) {
        e.preventDefault();
        if(bodyWidth <= 767) {
            parentBlock = $(this).closest("ul");
            if(parentBlock.hasClass("index_1")) {
                $(".main_nav_dropdown_list").addClass("sub_2");                             
            } else {
                $(".main_nav_dropdown_list").addClass("sub_1");
            }
            $(this).closest("li").children("ul").addClass("active");
        }
    });

    $(".back_menu").on('click', function(e) {
        e.preventDefault();
        parentBlock = $(this).closest("ul");
        if(parentBlock.hasClass("index_1")) {
            $(".main_nav_dropdown_list").removeClass("sub_1");
            setTimeout(function() {
                $(".main_nav_dropdown_list ul").removeClass("active");
            }, 700);
        } else {
            $(".main_nav_dropdown_list").removeClass("sub_2");
            setTimeout(function() {
                $(".main_nav_dropdown_list ul ul").removeClass("active");
            }, 700);
        }
    });

    $(".respmenubtn").click(function() {
        if( $("#dropdown_menu").is(":hidden") ) {
            $("#dropdown_menu").slideDown(500);
            $(this).addClass("active");
            $("#menu_show").fadeIn(500);
            $(".main_nav_dropdown_list a").removeClass("active");
            $(".main_nav_dropdown_list li:eq(0) a:eq(0)").addClass("active");
            $(".main_nav_dropdown_list li:eq(0) ul > li").each(function() {
                if(!$(this).hasClass("resp_item")) {
                    $(this).find("a:eq(0)").addClass("active");
                    return false;
                }
            });
        } else {
            $("#dropdown_menu").slideUp(500);
            $(this).removeClass("active");
            $("#menu_show").fadeOut(500);
        }
    });

    $(this).keydown(function(eventObject){
        if (eventObject.which == 27 &&
            $("#dropdown_menu").is(":visible") ) {
                $("#dropdown_menu").slideUp(500);
                $(".respmenubtn").removeClass("active");
                $("#menu_show").fadeOut(500);
        }
    });

    $("#menu_show").on('click', function(e) {
    	e.preventDefault();
    	$(".respmenubtn").removeClass("active");
    	$("#dropdown_menu").slideUp(500);
    	$("#menu_show").fadeOut(500);
    });

    // ----------------------------

	$(".gallery").each(function() {
		$(this).find(".photo_box:even").addClass("even");
	});

	$(".gallery").find(".photo_box.even:odd").addClass("w_2");

	// ---------------------------

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

});