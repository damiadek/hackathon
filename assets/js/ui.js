$(document).ready(function(){

	toggleArrow();

	$(window).scroll(function() {
		$(".dropdown-menu").hide();
		toggleArrow();
        var win_width = $(window).innerWidth();
        var top = $(document).scrollTop();
        var navbar = $('.links .navbar');
        if(win_width < 610){
            if(top > 290) {
                navbar.addClass("navbar-fixed-top");
                booking.css("padding-top", "70px");
            }
            else {
                navbar.removeClass("navbar-fixed-top");
                booking.css("padding-top", "0");
            }
        }else{
            if(top > 180) {
                navbar.addClass("navbar-fixed-top");
                booking.css("padding-top", "70px");
            }
            else {
                navbar.removeClass("navbar-fixed-top");
                booking.css("padding-top", "0");
            }
            if (top > 320){
                $("ul.side-nav").addClass("fixed");
            }else{
                $("ul.side-nav").removeClass("fixed");
            }
        }
	});

	$('#doc_arrow').click(function(e){
		e.preventDefault();
		$('html, body').stop().animate({scrollTop: 0}, 1500, 'easeInOutExpo');
	});

    //panel reload
    $(".panel-reload").click(function () {
       addSpinner($(this));
    });

    //panel edit for doctor
    $(".panel-edit").click(function () {
            $(".doctors-details").
                find("input").
                animate({display: "block"});
    });

	// toggle login div
	$(".login_toggle").click(function(){
		var $login = $(".login");
		var top = $login.css("top");
		if (top == "0px") {
			$login.fadeOut(400, function(){
				$login.animate({top: "-200%"});
			});
			return;
		}
		$login.show();
		$login.animate({top: "0px"});
	});

	// dropdown menu
	$(".dropdown").mouseleave(function(){
		$(".dropdown-menu")
			.fadeOut()
			.css({"top": "120%"});
	}).children("a").click(function(e){
		var $this = $(this);
		e.preventDefault();
		$this
			.siblings()
			.fadeIn()
			.css({"top": "100%"});
		setTimeout(function(){
			$this
				.css({"background" : "transparent"});
		}, 800);
	});

});

window.onload = function(){
	var window_width = $(window).innerWidth();
	if (window_width < 610 ) {
		$("ul.side-nav").children("button").click();
	}
	hideLoading();
};