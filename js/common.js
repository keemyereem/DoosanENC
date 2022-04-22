$(function(){

	//********************************** AOS initialization
    AOS.init({
		once : true,
		throttleDelay : 99,
		duration: 1000,
	});
	
	$(".side_nav").on("click", function(){
		$(".side_nav_wrap .bg").toggleClass("on");
	});
	

    function getParameter(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };
    var s_cate = getParameter("s_cate");
    console.log(s_cate)
    if(s_cate){
        $(".sub .lnb .w1400 > ul > li.lnb_depth p span").text(s_cate)
        $(".sub .lnb .w1400 > ul > li.lnb_depth2").hide()
    };


	//********************************** 메인 슬라이더
	var speed = 1400;
	var autoplaySpeed = 3000; 
	var slideWidth  = $(window).width();
	var w = slideWidth / 1.2 * -1;
	var mvSlide = $(".mv .slide_ctn");
	var mtSlide = $(".mv .slide_txt .w1565");


	//풀페이지 부수기 (커스텀 앵커시)
	var fullPageCreated = false;
	var resizeControl = false;
	createFullpage();
	fullResize();
	function createFullpage() {
		 if (fullPageCreated === false) {
			 fullPageCreated = true;
			 $("#fullpage").fullpage({
				onLeave: function(index, nextIndex, direction){
					var idx = nextIndex - 1;
					$(".section:eq("+idx+")").addClass("a_on");
					if(nextIndex == 1){
						
					}
				},
			})
		}
	}
	var control02 = true;
		function fullResize(){
			if($(window).width() <= 1200){
				fullPageCreated = false;
				control02 = true;
				 if(!resizeControl){
					$.fn.fullpage.destroy('all');
					resizeControl = true;
					console.log(resizeControl)
					$(".section").removeClass("a_on");
					$(window).scroll(function(){
						var windowH = $(this).height();
						var percentage = windowH * 80 / 100;
						var windowS = $(this).scrollTop() + percentage 
						$(".ani").each(function(){
							var thisTop = $(this).offset().top;						
							if (thisTop < windowS) {
								$(this).addClass("m_ani");
							}
						});
					})
				 }
			}else {
				createFullpage();
				resizeControl = false;
				if ($(window).width() >= 1200 && control02){
					control02 = false;
					$.fn.fullpage.moveTo('page01', 0);
					$(".ani").removeClass("m_ani")
				}
			}
		}


	mvSlide.on("init", function(e, slick){
		var count = slick.slideCount;
		$(".mv .all").text("0"+count)
		//chkW(w)
		$(".play .p_bar").animate({strokeDashoffset: "0"},autoplaySpeed )
	})
	mvSlide.slick({ //비주얼
		arrows:false,
		speed: speed,
		pauseOnHover:false,
		pauseOnFocus:false,
		autoplay:true,
		fade:true,
		autoplaySpeed:autoplaySpeed,
		asNavFor: mtSlide
	})
	mtSlide.slick({ //텍스트
		arrows:false,
		speed: speed,
		fade:true,
		asNavFor: mvSlide 
	})

	mvSlide.on("beforeChange", function (e, slick, currentSlide, nextSlide) {
		mvSlide.slick("setPosition");
		var count = slick.slideCount;
		var selectors = [nextSlide, nextSlide - count, nextSlide + count].map(function(n){
		return '.mv [data-slick-index="'+n+'"]'
		}).join(',');
		$('.mv .slick_now').removeClass('slick_now');
		$(selectors).addClass('slick_now');
		
		$(".play .p_bar").stop()
		$(".play .p_bar").animate({strokeDashoffset: "116"},0)
		$(".mv .current").text("0" + (nextSlide + 1))

		var bgEle = $(this).find(".item").not(".slick-cloned").find(".bg0" + (nextSlide + 1))
		if(bgEle.find("video").length){
			var video = bgEle.find("img")[0]
			video.currentTime=0;
			video.play();
		}
	})
	
	mvSlide.on("afterChange", function (e, slick, currentSlide, nextSlide) {
		var bgEle = $(this).find(".item").not(".slick-cloned").find(".bg0" + (currentSlide + 1))
		var video = bgEle.find("img")[0]
		// autoplaySpeed = video.duration - img.currentTime;
		autoplaySpeed = 5000;
		mvSlide.slick('slickSetOption','autoplaySpeed', autoplaySpeed, true);
		$(".play .p_bar").animate({strokeDashoffset: "0"}, autoplaySpeed)
	})
	$('.mv').find($('.slick-slide[data-slick-index="0"]')).addClass('slick_now');
	function top(slideWidth){
		if(slideWidth > 1200){
			$(".footer .top_btn").off().on("click",function(){
				$.fn.fullpage.moveTo(1);
			})
		} else{
			$(".footer .top_btn").off().on("click", function(){
				$("html,body").animate({scrollTop: 0},600)
			})
		}
	}

	$(".slide_btn > div").on("click", function(e){
		var name = e.currentTarget.className
		if(name == "prev" || name == "prev on"){
			$(this).parents().siblings(".slide_ctn").slick("slickPrev")
		} else{
			$(this).parents().siblings(".slide_ctn").slick("slickNext")
		}
	})

 /* section2 */
	$(".m_pro .slide_ctn").on("init", function(e, slick){
		var count = slick.slideCount;
		// $(".num_box .all").text("0"+count);
		// $(".pro-bar").animate({ "width": (25 * (idx))+"%" }, 500);
	}).slick({
		arrows:false,
		speed: 200,
		pauseOnHover:false,
		pauseOnFocus:false,
		//autoplay:true,
		autoplaySpeed:3000,
		fade:true,
	}).on("beforeChange", function (e, slick, currentSlide, nextSlide) {
		$(".m_pro .slide_dots .dot").removeClass("on")
		$(".m_pro .slide_dots .dot").eq(nextSlide).addClass("on")
		$(".num_box .current").text("0" + (nextSlide + 1))
	})



	$(".m_pro .slide_wrap .slide_ui .slide_dots .dot").on("click", function(){
		var idx = $(this).index();
		
		$(".m_pro .slide_wrap .slide_ui .slide_dots .dot").removeClass("on")
		$(this).addClass("on")
		$(".num_box .current").text("0" + (idx + 1))
		$(".m_pro .slide_ctn").slick("setPosition");
		$(".m_pro .slide_ctn").slick("slickGoTo", idx)
		$(".m_pro .slide_ctn").slick("slickPause");
	});
	// },function(){
	// 	$(".m_pro .slide_ctn").slick("slickPlay")
	// })


})