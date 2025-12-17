//*===========
//*  SWIPER  =
//*===========
jQuery(function ($) {
    "use strict";
    // Options set Swiper
    _functions.getSwOptions = function (swiper) {
        let options = swiper.data('options');
        options = (!options || typeof options !== 'object') ? {} : options;
        const $p = swiper.closest('.swiper-entry'),
            slidesLength = swiper.find('.swiper-wrapper>.swiper-slide').length;

        if (!options.pagination) options.pagination = {
            el: $p.find('.swiper-pagination')[0],
            clickable: true,
            dynamicBullets: (slidesLength > 14) ? true : false,
        };
        if (!options.navigation) options.navigation = {
            nextEl: $p.find('.swiper-button-next')[0],
            prevEl: $p.find('.swiper-button-prev')[0]
        };
        if (options.arrowsOut) options.navigation = {
            nextEl: $p.closest('.section').find('.swiper-button-next')[0],
            prevEl: $p.closest('.section').find('.swiper-button-prev')[0]
        };
        options.preloadImages = false;
        options.lazy = {
            loadPrevNext: true
        };
        options.observer = true;
        options.observeParents = true;
        options.watchOverflow = true;
        options.centerInsufficientSlides = true;
        if (!options.speed) options.speed = 1000;
        options.roundLengths = true;
        if (isTouchScreen) options.direction = "horizontal";
        if (slidesLength <= 1) {
            options.loop = false;
        }
        return options;
    };


    // Init each Swiper
    _functions.initSwiper = function (el) {
        const swiper = new Swiper(el[0], _functions.getSwOptions(el));
    };
    $('.swiper-entry .swiper-container').each(function () {
        _functions.initSwiper($(this));
    });


    // thumbs Swiper
    $('.swiper-thumbs').each(function () {
        if ($('.swiper-thumbs-top').length && $('.swiper-thumbs-bottom').length) {
            let t = $(this);
            let top = t.find('.swiper-thumbs-top>.swiper-container')[0].swiper,
                bottom = t.find('.swiper-thumbs-bottom>.swiper-container')[0].swiper;
            top.thumbs.swiper = bottom;
            top.thumbs.init();
            top.thumbs.update();

            if (top.slides.length < 2) {
                t.addClass('hide-bottom');
            }
        }
    });

    // sleep slider
    var $slider = $('.sleep-slider .swiper-container');
    var $controls = $('.control-slider .item');

    if (!$slider.length || !$controls.length) return;

    if (typeof $slider[0].swiper === 'undefined') return;

    var sleepSwiper = $slider[0].swiper;

    function setActiveControl(index) {
        $controls.removeClass('active');
        $controls.eq(index).addClass('active');
    }

    sleepSwiper.on('slideChange', function () {
        setActiveControl(this.realIndex);
    });

    $controls.on('click', function () {
        var index = $(this).index();
        sleepSwiper.slideTo(index);
        setActiveControl(index);
    });

});