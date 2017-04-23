$.fn.extend({
    animateCss: function (animationName) {
        'use strict';
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName)
        });
    }
});
$(document).ready(function () {
    var linkColor;
    $('#slogan').animateCss('zoomInDown');
    $('.nav-link').hover(function () {
        'use strict';
        linkColor = $(this).css("color");
        $(this).css("color", "#FF3D00")
    }, function () {
        'use strict';
        $(this).css("color", linkColor)
    });
    $('.navbar__cart__btn').click(function () {
        if (!$('.navbar__cart').hasClass('show')) {
            $('.navbar__cart__dropdown-menu').animateCss('zoomIn')
        }
    });
    var sideslider = $('[data-toggle=collapse-side]');
    var sel = sideslider.attr('data-target');
    sideslider.click(function () {
        $(sel).toggleClass('in')
    });
    $('button[name="submit"]').click(function () {
        $.post('subscribe', $('#subscribe').serialize())
    })
});
$(window).scroll(function () {
    'use strict';
    if ($(document).scrollTop() >= 30) {
        $('nav').addClass('shrink');
        $('.navbar').css("background-color", "#FFF");
        $('.nav-link:not(.active)').css("color", "#424242");
        $('.navbar-brand').css("color", "#424242");
        $('.navbar-toggler').css("color", "#424242");
        // Small screen
        if (window.matchMedia('(max-width: 992px)').matches) {
            $('.side-collapse').css("background-color", "#FFF")
        } else {
            $('.side-collapse').css("background-color", "");
            $('.input--search').css("width", "22vw")
        }
    } else {
        $('nav').removeClass('shrink');
        $('.navbar').css("background-color", "");
        $('.nav-link:not(.active)').css("color", "#FFF");
        $('.navbar-brand').css("color", "#FFF");
        $('.navbar-toggler').css("color", "#FFF");
        // Small screen
        if (window.matchMedia('(max-width: 992px)').matches) {
            $('.side-collapse').css("background-color", "rgba(0, 0, 0, 0.9)");
            $('.input--search').css("width", "22vw")
        } else {
            $('.side-collapse').css("background-color", "");
            $('.input--search').css("width", "10vw")
        }
    }
});
$(window).resize(function () {
    'use strict';
    if (window.matchMedia('(max-width: 992px)').matches) {
        $('.input--search').css("width", "22vw");
        if ($(document).scrollTop() >= 30) {
            $('.side-collapse').css("background-color", "#FFF")
        } else {
            $('.side-collapse').css("background-color", "rgba(0, 0,033, 0.9)")
        }
    } else {
        if ($(document).scrollTop() >= 30) {
            $('.side-collapse').css("background-color", "");
            $('.input--search').css("width", "22vw")
        } else {
            $('.side-collapse').css("background-color", "");
            $('.input--search').css("width", "10vw")
        }
    }
});

function initMap() {
    var uluru = {
        lat: 10.762644,
        lng: 106.682027
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    })
}
