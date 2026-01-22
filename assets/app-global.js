//*====================================
//*  FUNCTIONS ON DOCUMENT READY      =
//*====================================
//*  FUNCTIONS CALC & RESIZE, SCROLL  =
//*====================================
//*  ANIMATION                        =
//*====================================
//*  HEADER                           =
//*====================================
//*  POPUPS                           =
//*====================================
//*  KEY FOCUS                        =
//*====================================
//*  TABS, ACCORDION                  =
//*====================================
//*  OTHER JS                         =
//*====================================
//*  DYNAMIC LOAD JS                  =
//*====================================
const _functions = {};
let winW, winH, winScr, isTouchScreen, isAndroid, isChrome, isIPhone, isMac;

jQuery(function ($) {
    "use strict";

    //*================================
    //*  FUNCTIONS ON DOCUMENT READY  =
    //*================================
    isTouchScreen = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i),
        isAndroid = navigator.userAgent.match(/Android/i),
        isChrome = navigator.userAgent.indexOf('Chrome') >= 0 && navigator.userAgent.indexOf('Edge') < 0,
        isIPhone = navigator.userAgent.match(/iPhone/i),
        isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;


    if (isTouchScreen) $('html').addClass('touch-screen');
    if (isAndroid) $('html').addClass('android');
    if (isChrome) $('html').addClass('chrome');
    if (isIPhone) $('html').addClass('ios');
    if (isMac) $('html').addClass('mac');


    //*====================================
    //*  FUNCTIONS CALC & SCROLL, RESIZE  =
    //*====================================
    // Function Calculations on page
    _functions.pageCalculations = function () {
        winW = $(window).outerWidth();
        winH = $(window).outerHeight();
    }
    _functions.pageCalculations();

    /* Function on page scroll */
    $(window).on('scroll', function () {
        _functions.scrollCall();
    });


    var prev_scroll = 0;
    _functions.scrollCall = function () {
        winScr = $(window).scrollTop();

        if (winScr > $('header').innerHeight()/3) {
            $('header').addClass('scrolled');
        } else if (winScr <= $('header').innerHeight()/3) {
            $('header').removeClass('scrolled');

            prev_scroll = 0;
        }

        prev_scroll = winScr;
    }
    _functions.scrollCall();


    /* Function on page resize */
    _functions.resizeCall = function () {
        setTimeout(function () {
            _functions.pageCalculations();
        }, 100);
    };


    if (!isTouchScreen) {
        $(window).on('resize', function () {
            _functions.resizeCall();
        });

    } else {
        window.addEventListener("orientationchange", function (e) {

            // Portrait
            if (window.orientation == 0) {
                $('html').removeClass('landscape');
            }
            // Landscape
            else {
                $('html').addClass('landscape');
            }

            _functions.resizeCall();
        }, false);
    }




    //*==============
    //*  ANIMATION  =
    //*==============
    const observerFunction = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('|', 'animated')
            observer.unobserve(entry.target)
        })

    }, {
        root: null,
        threshold: 0,
        rootMargin: (window.innerWidth > 767) ? "-50px" : "0%"
    });

    document.querySelectorAll('.section').forEach(block => {
        observerFunction.observe(block)
    });


    //fixed section
    if ($('.fixed-sec').length) {

        const section = document.querySelector('.fixed-sec');
        const bannerMedia = section.querySelector('.banner-media img');
        const lastStep = section.querySelector('.step-item:last-child');

        function handleScroll() {
            const lastStepRect = lastStep.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            const isLastStepAtBottom = lastStepRect.bottom <= viewportHeight;

            if (isLastStepAtBottom) {
                bannerMedia.style.position = 'absolute';
                bannerMedia.style.bottom = '0';
            } else {
                bannerMedia.style.position = 'fixed';
                bannerMedia.style.bottom = '0';
            }
        }

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);

        handleScroll();
    }


    //*===========
    //*  HEADER  =
    //*===========
    // open header dropdown
    if (winW > 1199) {
        // hover on header dropdown
        $(document).on('mouseenter', '.h-drop b', function () {
            $(this).closest('.h-drop').addClass('is-active');
            $('html').addClass('overflow-menu');
            $('header').addClass('open-menu');
        });

        // leave header dropdown
        $(document).on('mouseleave', '.h-drop', function () {
            $(this).removeClass('is-active');
            $('html').removeClass('overflow-menu');
            $('header').removeClass('open-menu');
        });

    }
    else{
        $(document).on('click', '.h-drop b > i', function () {
            $(this).closest('.h-drop').toggleClass('is-active');
            $(this).closest('.h-drop').find('.h-drop-list').slideToggle();
        });
    }

    /* Open menu */
    $(document).on('click', '.js-open-menu', function () {
        $('html').toggleClass('overflow-menu');
        $('header').toggleClass('open-menu');
    });

    /* Close menu */
    $(document).on('click', '.h-menu-overlay', function () {
        $('html').removeClass('overflow-menu');
        $('.h-drop').removeClass('is-active');
        $('header').removeClass('open-menu');
    });

    //*===========
    //*  POPUPS  =
    //*===========
    _functions.scrollWidth = function () {
        let scrWidth = $(window).outerWidth() - $('body').innerWidth();

        $('body, .h-wrap').css({
            "paddingRight": `${scrWidth}px`
        });
    }


    // Popups Functions
    let popupTop = 0;
    _functions.removeScroll = function () {
        _functions.scrollWidth();
        popupTop = winScr;
        $('html').css({
            "top": '-' + winScr,
            "width": "100%"
        }).addClass("overflow-hidden");
    }

    _functions.addScroll = function () {
        _functions.scrollWidth();
        $('html').removeClass("overflow-hidden");
        window.scroll(0, popupTop);
    }

    _functions.openPopup = function (popup) {
        $('.popup-content').removeClass('active');
        $(popup + ', .popup-wrapper').addClass('active');
        _functions.removeScroll();
    };

    _functions.closePopup = function () {
        $('.popup-wrapper, .popup-content').removeClass('active');
        $('.video-popup iframe').remove();
        _functions.addScroll();
    };

    // Close  popup
    $(document).on('click', '.popup-content .close-popup, .popup-content .layer-close', function (e) {
        e.preventDefault();
        _functions.closePopup();
    });

    // Ajax popup
    $(document).on('click', '.open-popup', function (e) {
        const popupWrapper = document.getElementById("popups");

        if (e.target.closest('.open-popup')) {
            let dataRel = e.target.closest('.open-popup').getAttribute('data-rel');
            e.preventDefault();

            if (popupWrapper.hasChildNodes()) {
                _functions.openPopup('.popup-content[data-rel="' + dataRel + '"]');

            } else {
                const ajaxPopup = new XMLHttpRequest();

                ajaxPopup.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        popupWrapper.innerHTML = this.responseText;

                        setTimeout(function () {
                            _functions.openPopup('.popup-content[data-rel="' + dataRel + '"]');
                        }, 50);
                    }
                };
                ajaxPopup.open("GET", "inc/popups/_popups.php", true);
                ajaxPopup.send();
            }
        }
    });

    /* Open Video Popup */
    $(document).on('click', '.video-open', function (e) {
        e.preventDefault();
        var video = $(this).attr('data-href');
        // $('.video-popup-container iframe').attr('src', video);
        // $('.video-popup-container').html(
        //     '<iframe src="' + video + '" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>'
        // );
        
        // Instead of an iframe, inject a native video element
        var videoHtml = `
            <video controls autoplay playsinline style="width:100%; height:100%; display:block;">
                <source src="${video}" type="video/mp4">
            </video>`;
        
        $('.embed-responsive-16by9').html(videoHtml);
        $('.video-popup').addClass('active');
        $('html').addClass('overflow-hidden');
    });

    /* Close Video Popup */
    $('.video-popup-close, .video-popup-layer').on('click', function (e) {
        const wrapper = $(this).closest('.video-popup');
        const video = wrapper.find('video').get(0);
        $('html').removeClass('overflow-hidden');
        $('.video-popup').removeClass('active');
        video.pause();
        console.log('test1');
        $('.video-popup-container iframe').attr('src', 'about:blank');
        e.preventDefault();
    });


    //*==============
    //*  KEY FOCUS  =
    //*==============
    // Detect if user is using keyboard tab-button to navigate
    // with 'keyboard-focus' class we add default css outlines
    function keyboardFocus(e) {
        if (e.keyCode !== 9) {
            return;
        }

        switch (e.target.nodeName.toLowerCase()) {
            case 'input':
            case 'select':
            case 'textarea':
                break;
            default:
                document.documentElement.classList.add('keyboard-focus');
                document.removeEventListener('keydown', keyboardFocus, false);
        }
    }
    document.addEventListener('keydown', keyboardFocus, false);




    //*====================
    //*  TABS, ACCORDION  =
    //*====================
    // tabs
    $(document).on('click', '.tab-toggle>div', function (e) {
        let tab = $(this).closest('.tabs').find('.tabs-wrap .tab');
        let i = $(this).index();

        $(this).addClass('is-active').siblings().removeClass('is-active');
        tab.eq(i).siblings('.tab:visible').stop().finish().fadeOut(function () {
            tab.eq(i).fadeIn(200);
        });
        e.preventDefault();
    });

    // accordion
    $(document).on('click', '.accordion-title', function () {
        if ($(this).hasClass('is-active')) {
            $(this).removeClass('is-active').next().slideUp();
        } else {
            $(this).closest('.accordion').find('.accordion-title').not(this).removeClass('is-active').next().slideUp();
            $(this).addClass('is-active').next().slideDown();
        }
    });


    //*====================
    //* dynamic load video
    //*====================
    const options = {
        root: document,
        rootMargin: "50%",
    };

    const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            _functions.videoLoad(entry.target);
            observer.unobserve(entry.target)
        })

    }, options);

    document.querySelectorAll(".video").forEach((element) => {
        videoObserver.observe(element);
    });

    _functions.videoLoad = function (block) {
        let videoBlock = $(block).find('video'),
            videoSrc = videoBlock.data('src');
        
        videoBlock.attr('src', videoSrc);
    };

    //activate autoplay video
    if ($('.video').length) {
        $(this).find('video').attr("autoplay", "");
    }

    //*=============
    //*  OTHER JS  =
    //*=============

    // sticky items
    if($('.sticky-items').length && $(window).width() > 992){
        _functions.syncHeights = function () {
            $('.sticky-items').each(function() {
                var contentBlock = $(this).find('.lr-content-1');
                var imageBlock = $(this).find('.check-h .lr-img-1 img');

                contentBlock.height(imageBlock.height());
            });
        }

        _functions.syncHeights();

        var resizeTimeout;
        $(window).resize(function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                _functions.syncHeights();
            }, 200);
        });
    }
    

    //animated img
    if($('.animated-img').length && winW > 992){
        $(window).on('scroll', function() {
            var scrollTop = $(window).scrollTop();
            var sectionOffsetTop = $('.animated-img').offset().top;
            var sectionHeight = $('.animated-img').height();

            if (scrollTop + $(window).height() > sectionOffsetTop && scrollTop < sectionOffsetTop + sectionHeight) {
                var scrollPercentage = (scrollTop + $(window).height() - sectionOffsetTop) / (sectionHeight + $(window).height());
                
                $('.img-scroll').css('transform', 'translateY(' + (scrollPercentage * 100) + 'px)');
                $('.img-scroll.margin').css('transform', 'translateY(' + (-scrollPercentage * 100) + 'px)');
            }
        });
    }

    //comfort item
    $(document).on('click', '.comfort-item', function(){
        $(this).toggleClass('open');
        $(this).find('.text-hide').slideToggle();
    });

    //more-detail
    $(document).on("click", ".js-more", function () {
        $(this).toggleClass('is-active');
        $(this).closest('.pd-detail-info').find('.more-content').slideToggle();
        
    });

    //select quantity
    $(document).on('click', '.quantity .quantity-item', function(){
        $(this).addClass('active').siblings().removeClass('active');
    });

    //select pairs
    $(document).on('click', '.pairs .pairs-item', function(){
        $(this).toggleClass('active');
    });

    //cta scroll to
    $(document).on('click', '.scroll-to', function(){
        let nextBlock = $(this).closest('.section').next(),
        heightHeader = $('header').outerHeight();

        $("html,body").animate({
            scrollTop: nextBlock.offset().top - heightHeader
        }, 7);
    });


    //change with slide
    $(document).on('click', '.swiper-entry.with-dynamic .swiper-slide', function(){
        $(this).siblings().removeClass('open');
        $(this).toggleClass('open');
    });

    // open meeting form
    $(document).on('click', '.js-meet-form', function () {
        $('#meet-form').addClass('open');
        $('html').addClass('overflow-menu');
    });

    // close meeting form
    $(document).on('click', '.form-overlay, .close-form', function () {
        $('#meet-form').removeClass('open');
        $('html').removeClass('overflow-menu');
    });


    // ACTIVE MENU HIGHLIGHT ON BLOG DETAILED
    _functions.submenuScroll = function () {
    if ($(".sticky-links").length) {
        $(".link-content").each(function (i) {
            if ($(this).offset().top - 200 <= $(window).scrollTop()) {
                $('.sticky-links a[href*="#"]:not([href="#"]).active').removeClass("active");
                $(".sticky-links a").eq(i).addClass("active");
            }
        });
    }
    };

    $(window).on("scroll", function () {
        _functions.submenuScroll();
    });

    //anchor scroll
    $(function() {
        $('a[href*="#"]:not([href="#"])').click(function() {
            if ($(".sticky-links").length) {
                $('html, body').animate({
                    scrollTop: $($.attr(this, "href")).offset().top - 112
                }, 100);
                return false;
            }
        });
    });

    // check height push block
    if($('.pd-push-block').length){
        _functions.checkPushHeight = function () {
            var pushHeight = parseInt($('.pd-push-block').outerHeight());
            $('.pd-push-block').css({ '--push-height': `${pushHeight}` + 'px'});
        }

        _functions.checkPushHeight();

        var resizePushTimeout;
        $(window).resize(function() {
            clearTimeout(resizePushTimeout);
            resizePushTimeout = setTimeout(function() {
                _functions.checkPushHeight();
            }, 200);
        });
    }

    _functions.createCookie = function(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
    };

    _functions.readCookie = function(name) {
        var nameEQ = encodeURIComponent(name) + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
    };

    _functions.eraseCookie = function(name) {
        createCookie(name, "", -1);
    };

    if (!_functions.readCookie("my_push") == true) {
    setTimeout(function() {
        $('.pd-push-block').addClass('active');
    }, 3000);
    }

    $(document).on('click', '.close-push', function() {
        _functions.createCookie("my_push", true, 30);
        $(this).parents('.pd-push-block').removeClass('active');
    });

    // fixed on mobile sticky links
    _functions.stickyLinks = function () {
		if ($('.sticky-links').length && $(window).width() < 1200) {
            var headerHeight = parseInt($('header').outerHeight());
            if ($(window).scrollTop() >= $('.sticky-links-wrap').offset().top - headerHeight - 4) {
                $('.sticky-links').addClass('fixed');
            } else {
                $('.sticky-links').removeClass('fixed');
                $('.sticky-links a.active').removeClass('active');
            }
		}
	};

	_functions.stickyLinks();
    
    $(window).on("scroll", function () {
        _functions.stickyLinks();
    });

    
	let $currentSection = [];
	function getCurrentSection() {
		$($(".link-content").get().reverse()).each(function () {

			let thisSection =
				$(this).offset().top -
				window.innerHeight / 2 -
				parseInt($(this).css("margin-bottom")) / 2 <
				window.pageYOffset &&
				$(this).offset().top +
				$(this).outerHeight() +
				parseInt($(this).css("margin-bottom")) / 2 -
				window.innerHeight / 2 >
				window.pageYOffset;

			if (thisSection) {
				return false;
			}

			$currentSection = $(this);

			var container = $(".sticky-links");
			var scrollTo = $(".sticky-links").find('a.active');
			if (scrollTo.offset()) {
				var position = container[0].scrollLeft + scrollTo.offset().left - 20;

				container.stop().animate({
					scrollLeft: position
				}, 100);
			}

			return false;

		});
	}

	$(window).scroll(function () {
		getCurrentSection()
	});
	$(document).ready(getCurrentSection());


    // MARQUEE line
    class LoopingElement {
        constructor(e, t, a, o) {
            this.element = e,
                this.currentTranslation = t,
                this.speed = a,
                this.direction = !0,
                this.scrollTop = 0,
                this.metric = 100,
                this.isPaused = false,
                this.lerp = {
                    current: this.currentTranslation,
                    target: this.currentTranslation,
                    factor: .2
                },
                this.render(),
                this.go = o ? (this.direction = !0, this.lerp.target += 2 * this.speed) : (this.direction = !1, this.lerp.target -= 2 * this.speed)
        }
        lerpFunc(e, t, a) {
            this.lerp.current = e * (1 - a) + t * a
        }
        goForward() {
            this.lerp.target += this.speed,
                this.lerp.target > this.metric && (this.lerp.current -= 2 * this.metric,
                    this.lerp.target -= 2 * this.metric)
        }
        goBackward() {
            this.lerp.target -= this.speed,
                this.lerp.target < -this.metric && (this.lerp.current -= 2 * -this.metric,
                    this.lerp.target -= 2 * -this.metric)
        }
        animate() {
            if (!this.isPaused) {
                this.direction ? this.goForward() : this.goBackward(),
                    this.lerpFunc(this.lerp.current, this.lerp.target, this.lerp.factor),
                    this.element.style.setProperty("--x", this.lerp.current + "%")
            }
        }
        render() {
            this.animate(),
                window.requestAnimationFrame(() => this.render())
        }
    }

    document.querySelectorAll(".marquee-line").forEach(el => {
        const spd = Number(el.dataset.speed);
        const dir = el.dataset.direction === "false" ? "" : "false";

        const firstItem = el.querySelector(".marquee-item");
        const content = firstItem.querySelector(`:scope ${'.marquee-content'}`);

        let eq = Math.ceil(el.offsetWidth / content.offsetWidth);

        for (let i = 0; i < eq; i++) {
            firstItem.appendChild(content.cloneNode(true));
        }

        el.appendChild(firstItem.cloneNode(true));

        let item = el.querySelectorAll(".marquee-item");

        $(item[0]).get(0)._LoopingElements = new LoopingElement(item[0], 0, spd, dir);
        $(item[1]).get(0)._LoopingElements = new LoopingElement(item[1], -100, spd, dir);
    });
    

    // choose-layer
    $(document).on('click', '.choose-layer .item', function(){
        $(this).addClass('active').siblings().removeClass('active');

        const i = $(this).index();
        $('.layer-video-block .scroll-imgs').removeClass('active').eq(i).addClass('active');
    });

    // advisor more info
    $(document).on('click', '.js-advisor-info', function(){
        $(this).closest('.advisor-item').toggleClass('open');
    });

    //progress layer video
    // const $video = $('#layerVideo');
    // const video = $video.get(0);
    // const $layers = $('.layer-item');

    // if (!video || $layers.length < 2) return;

    // let targetTime = 0;
    // let currentTime = 0;
    // let isAnimating = false;

    // video.addEventListener('loadedmetadata', function () {
    //     const duration = video.duration;

    //     video.play();
    //     video.pause();

    //     const $first = $layers.first();
    //     const $last = $layers.last();

    //     const start = $first.offset().top;
    //     const end = $last.offset().top + $last.outerHeight()/2;

    //     function animate() {
    //         currentTime += (targetTime - currentTime) * 0.1; //smoothing
    //         video.currentTime = currentTime;

    //         if (Math.abs(targetTime - currentTime) > 0.001) {
    //             requestAnimationFrame(animate);
    //         } else {
    //             isAnimating = false;
    //         }
    //     }

    //     $(window).on('scroll', function () {
    //         const scrollY = $(window).scrollTop() + $(window).height() * 0.3;

    //         const progress = Math.min(
    //             Math.max((scrollY - start) / (end - start), 0),
    //             1
    //         );

    //         targetTime = duration * progress;

    //         if (!isAnimating) {
    //             isAnimating = true;
    //             requestAnimationFrame(animate);
    //         }
    //     });
    // });


    // auto scroll imgs
    $('.auto-scroll-imgs').each(function () {
        const $img = $(this);
        const frameCount = parseInt($img.data('frame')) || 20;
        let frames = [];

        const comma_list = $img.attr('data-images');
        const img_array = comma_list.split(',').map(s => s.trim());

        // const imgFolder = $(this).attr('data-folder');

        console.log(img_array);

        if(img_array.length == 0) return;
        for (let i = 0; i < img_array.length; i++) {
            console.log(img_array[i]);
            const img = new Image();
            img.src = img_array[i];
            frames.push(img.src);
        }

        // for (let i = 1; i <= frameCount; i++) {
        //     const num = String(i).padStart(3, '0');
        //     const img = new Image();
        //     img.src = `frames/${imgFolder}/frame-${num}.png`;
        //     frames.push(img.src);
        // }

        let currentIndex = 0;
        let intervalId = null;

        function startLoop() {
            if (!intervalId) {
                intervalId = setInterval(() => {
                    $img.attr('src', frames[currentIndex]);
                    currentIndex = (currentIndex + 1) % frames.length;
                }, 200);
            }
        }

        function stopLoop() {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        }

        // IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startLoop();
                } else {
                    stopLoop();
                }
            });
        }, { threshold: 0.5 });

        observer.observe($img[0]);
    });



    //progress layer IMGS
    $('.scroll-imgs').each(function () {
        const $img = $(this);
        const $layers = $('.scroll-layers .layer-item');

        if ($img.length < 1) return;

        let frames = [];
        let frameCount = parseInt($img.data('frame')) || 20;
        const imgFolder = $(this).attr('data-folder');

        for (let i = 1; i <= frameCount; i++) {
            const num = String(i).padStart(3, '0');
            const img = new Image();
            img.src = `frames/${imgFolder}/frame-${num}.png`;
            frames.push(img.src);
        }

        function initScroll() {
            const start = $layers.first().offset().top;
            const end = $layers.last().offset().top + $layers.last().outerHeight() / 2;

            let targetProgress = 0;
            let currentProgress = 0;
            let animating = false;

            function animate() {
                currentProgress += (targetProgress - currentProgress) * 0.12; // smoothing

                if ($img.length > 0) {
                    const frameIndex = Math.floor(currentProgress * frameCount);
                    $img.attr('src', frames[frameIndex]);
                }

                if (Math.abs(targetProgress - currentProgress) > 0.001) {
                    requestAnimationFrame(animate);
                } else {
                    animating = false;
                }
            }

            $(window).on('scroll', function () {
                const scrollY = $(window).scrollTop() + window.innerHeight * 0.3;

                targetProgress = Math.min(
                    Math.max((scrollY - start) / (end - start), 0),
                    1
                );

                if (!animating) {
                    animating = true;
                    requestAnimationFrame(animate);
                }
            });
        }

        if ($img.length > 0) {
            initScroll();
        }
    });




    //fixed progress layer video
    const $sticky = $('.layers-sec .sticky-block');
    const $section = $('.layers-sec');
    const $header = $('.header');

    if (!$sticky.length || !$section.length) return;

    const isMobile = window.matchMedia('(max-width: 991px)').matches;
    if (!isMobile) return;

    const $placeholder = $sticky.parent();

    function recalc() {
        const headerHeight = $header.outerHeight() || 0;

        const stickyTop = $placeholder.offset().top;
        const stickyHeight = $sticky.outerHeight();

        const sectionTop = $section.offset().top;
        const sectionBottom = sectionTop + $section.outerHeight();

        return {
            headerHeight,
            stickyTop,
            stickyHeight,
            sectionBottom
        };
    }

    let metrics = recalc();

    $placeholder.height(metrics.stickyHeight);

    $(window).on('resize orientationchange', function () {
        metrics = recalc();
        $placeholder.height(metrics.stickyHeight);
    });


    $(window).on('scroll', function () {
        const scrollY = $(window).scrollTop();

        const startFix = metrics.stickyTop - metrics.headerHeight;
        const endFix = metrics.sectionBottom - metrics.stickyHeight - metrics.headerHeight;

        if (scrollY >= metrics.stickyTop - 104 && scrollY < endFix) {
            $sticky.addClass('fixed');
        } else {
            $sticky.removeClass('fixed');
        }
    });

});