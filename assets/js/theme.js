(function($) {
    'use strict';

    //===== Slick slider js

    if ($('.testimonial-slider').length) {
        $('.testimonial-slider').slick({
            dots: true,
            arrows: false,
            infinite: true,
            speed: 800,
            autoplay: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: '<div class="prev"><i class="fas fa-angle-left"></i></div>',
            nextArrow: '<div class="next"><i class="fas fa-angle-right"></i></div>',
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 1250,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });
    }

    if ($('.client-slider').length) {
        $('.client-slider').slick({
            dots: false,
            arrows: false,
            infinite: true,
            speed: 800,
            autoplay: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            prevArrow: '<div class="prev"><i class="fas fa-angle-left"></i></div>',
            nextArrow: '<div class="next"><i class="fas fa-angle-right"></i></div>',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 450,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });
    }


})(window.jQuery);