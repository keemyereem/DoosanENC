$(function(){
	var speed = 1400;
	var autoplaySpeed = 5000; 
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

	var timer = null;
	$(window).on("load resize", function(e){
		clearTimeout(timer);
		timer = setTimeout(resizeM , 150)

		slideWidth  = $(window).width();
		top(slideWidth)
		w = slideWidth / 1.2 * -1
		//chkW(w)

		if(slideWidth > 620){
			$(".m_sup .bot .slide_borad .item").hover(function(){
				$(".m_sup .bot .slide_borad .item").removeClass("on")
				$(this).addClass("on")
			})
		} else{
			$(".m_sup .bot .slide_borad .item").off("mouseenter mouseleave")
		}
	})
	function resizeM(){
		fullResize();
	}
	
	

	mvSlide.on("init", function(e, slick){
		var count = slick.slideCount;
		$(".mv .all").text("0"+count)
		//chkW(w)
		$(".play .p_bar").animate({strokeDashoffset: "0"},autoplaySpeed)
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
		//한페이지에서 여러개 사용시 return '.부모클래스 [data-slick-index="'+n+'"]'
		}).join(',');
		$('.mv .slick_now').removeClass('slick_now');
		//한페이지에서 여러개 사용시  $('.부모 클래스 .slick_now').removeClass('slick_now');
		$(selectors).addClass('slick_now');
		/*$(this).find(".slick-slide .bg0" + nextSlide).css({
			'transform': 'translateX(' + (w * -1) + 'px)'
		})
		$(this).find(".slick-slide .bg0" + (nextSlide + 1)).css({
			'transform': 'translateX(0px)'
		})
		$(this).find(".slick-slide .bg0" + (nextSlide + 2)).css({
			'transform': 'translateX(' + w + 'px)'
		})
		if (nextSlide + 1 == slick.slideCount) {
			$(this).find(".slick-slide .bg01").css({
				'transform': 'translateX(' + w + 'px)'
			})
		}
		if (nextSlide == 0) {
			var last = slick.$slides.length
			$(this).find(".slick-slide .bg0"+last+"").css({
				'transform': 'translateX(' + (w * -1) + 'px)'
			})
		}*/
		$(".play .p_bar").stop()
		$(".play .p_bar").animate({strokeDashoffset: "140"},0)
		$(".mv .current").text("0" + (nextSlide + 1))

		var bgEle = $(this).find(".item").not(".slick-cloned").find(".bg0" + (nextSlide + 1))
		if(bgEle.find("video").length){
			var video = bgEle.find("video")[0]
			video.currentTime=0;
			video.play();
		}
	})
	mvSlide.on("afterChange", function (e, slick, currentSlide, nextSlide) {
		var bgEle = $(this).find(".item").not(".slick-cloned").find(".bg0" + (currentSlide + 1))
		var video = bgEle.find("video")[0]
		autoplaySpeed = video.duration - video.currentTime;
		mvSlide.slick('slickSetOption','autoplaySpeed', autoplaySpeed * 1000, true);
		$(".play .p_bar").animate({strokeDashoffset: "0"}, autoplaySpeed * 1000)
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

	function play_bar(autoplaySpeed){
		var videoChk = $(".mv .slick_now").not(".slick-cloned").find(".bg")
		var video = videoChk.find("video")[0]
		autoplaySpeed = video.duration - video.currentTime;
		mvSlide.slick('slickSetOption','autoplaySpeed', autoplaySpeed * 1000, true);
		$(".play .p_bar").stop().animate({strokeDashoffset: "0"}, autoplaySpeed * 1000, function(){
				autoplaySpeed = video.duration;
		});
	}
	$(".play").on("click", function(){
		var videoChk = $(".mv .slick_now").not(".slick-cloned").find(".bg")
		var video = videoChk.find("video")[0]
		if(!$(this).hasClass("on")){
			$(this).addClass("on")
			$(this).children().next().html("<i class='xi-pause'></i>")
			mvSlide.slick("slickPause");
			video.pause();
			$(".play .p_bar").stop().animate()
		} else{
			$(this).removeClass("on")
			$(this).children().next().html("<i class='xi-play'></i>")
			mvSlide.slick("slickPlay");
			video.play();
			play_bar(autoplaySpeed)
		}
	})

	$(".m_pro .slide_ctn").on("init", function(e, slick){
		var count = slick.slideCount;
		$(".num_box .all").text("0"+count)
	}).slick({
		arrows:false,
		speed: 200,
		pauseOnHover:false,
		pauseOnFocus:false,
		//autoplay:true,
		autoplaySpeed:3000,
		fade:true,
	}).on("beforeChange", function (e, slick, currentSlide, nextSlide) {
		var count = slick.slideCount;
		$(".m_pro .slide_dots .dot").removeClass("on")
		$(".m_pro .slide_dots .dot").eq(nextSlide).addClass("on")
		$(".num_box .current").text("0" + (nextSlide + 1))
	})
	
	$(".m_pro .slide_wrap .slide_ui .slide_dots .dot").hover(function(){
		var idx = $(this).index();
		$(".m_pro .slide_wrap .slide_ui .slide_dots .dot").removeClass("on")
		$(this).addClass("on")
		$(".num_box .current").text("0" + (idx + 1))
		$(".m_pro .slide_ctn").slick("setPosition");
		$(".m_pro .slide_ctn").slick("slickGoTo", idx)
		$(".m_pro .slide_ctn").slick("slickPause");
	},function(){
		$(".m_pro .slide_ctn").slick("slickPlay")
	})
	$(".m_pro .txt_box .btn_ctn > ul > li.popB > a").on("click", function(e){
		e.preventDefault();
		$(".pop_ctn").stop().fadeIn()
	})
	
	$(".pop_ctn .close_btn").on("click", function(e){
		e.preventDefault();
		$(".pop_ctn").stop().fadeOut()
	})

	$(".m_val .slide_ctn").slick({
		infinite:false,
		arrows:false,
		speed: 800,
		pauseOnHover:false,
		pauseOnFocus:false,
		slidesToShow:4,
		slidesToScroll:1,
		responsive: [
			{
			  breakpoint: 1200,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
			  }
			},
			{
			  breakpoint: 900,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			}
		]
	}).on("beforeChange", function (e, slick, currentSlide, nextSlide) {
		var count = slick.slideCount;
		var selectors = [nextSlide, nextSlide - count, nextSlide + count].map(function(n){
		return '.m_val [data-slick-index="'+n+'"]'
		//한페이지에서 여러개 사용시 return '.부모클래스 [data-slick-index="'+n+'"]'
		}).join(',');
		$('.m_val .slick_now').removeClass('slick_now');
		//한페이지에서 여러개 사용시  $('.부모 클래스 .slick_now').removeClass('slick_now');
		$(selectors).addClass('slick_now');
	}).on("afterChange",function (e, slick, currentSlide, nextSlide) {
		var index = $(this).find(".slick-active:last-child").data("slick-index")
		if(slick.$slides.length -1 == index){
			$(".m_val .slide_btn .prev").fadeIn()
			$(".m_val .slide_btn .next").fadeOut()
		} else{
			$(".m_val .slide_btn .prev").fadeIn()
			$(".m_val .slide_btn .next").fadeIn()
		}
		if(currentSlide == 0){
			$(".m_val .slide_btn .next").fadeIn()
			$(".m_val .slide_btn .prev").fadeOut()
		}
		
	})
	$('.m_val').find($('.slick-slide[data-slick-index="0"]')).addClass('slick_now');

	$(".m_news .slide_ctn").slick({
		arrows:false,
		speed: 1400,
		pauseOnHover:false,
		pauseOnFocus:false,
		autoplay:true,
		autoplaySpeed:3000,
		slidesToShow:2,
		slidesToScroll:1,
		responsive: [
			{
			  breakpoint: 1200,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
			  }
			},
			{
			  breakpoint: 900,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			}
		]
	})


	$(".slide_btn > div").on("click", function(e){
		var name = e.currentTarget.className
		if(name == "prev" || name == "prev on"){
			$(this).parents().siblings(".slide_ctn").slick("slickPrev")
		} else{
			$(this).parents().siblings(".slide_ctn").slick("slickNext")
		}
	})
	/*function chkW(w){
		mvSlide.find(".slick-active").prev().find(".bg").css({
			'transform': 'translateX(' + (w * -1) + 'px)'
		})
		mvSlide.find(".slick-active").find(".bg").css({
			'transform': 'translateX(0px)'
		})
		mvSlide.find(".slick-active").next().find(".bg").css({
			'transform': 'translateX(' + w + 'px)'
		})
	}
	*/
	$(".mv .slide_wrap .slide_txt .item p").each(function(){
		console.log($(this))
		$(this).find("span").each(function(i){
			var i = i / 20
			$(this).css("animation-delay", i+"s")
		})
	})
	
	$(".split").each(function(){
		var text = this;
		text.innerHTML = text.textContent.replace(/\S/g, "<span>$&</span>");
		$(this).find("span").each(function(i){
			var i = i / 25
			$(this).css("animation-delay", (i + 0.3)+"s")
			if($(this).parent().hasClass("plus")){
				$(this).css("animation-delay", (i + 1.5)+"s")
			}
		})
		
	})
	
})