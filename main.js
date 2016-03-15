/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
// $(window).scroll(function () {
//     if ($(".navbar").offset().top > 50) {
//         $(".navbar-fixed-top").addClass("top-nav-collapse");
//     } else {
//         $(".navbar-fixed-top").removeClass("top-nav-collapse");
//     }
// });
//

$(function () {

    var buyNowForm = $('#buy_now_form');

    if (buyNowForm != null) {
        buyNowForm.on("submit", function (event) {
            event.preventDefault();

            //TODO: change to when they actually finish the purchase
            goog_report_conversion();

            ga('send', 'event', 'Buy Now Form', 'submit', {
                hitCallback: createFunctionWithTimeout(function () {
                    buyNowForm.off();
                    buyNowForm.submit();
                })
            });
        });
    }

    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href').slice(2)).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    $(window).unload(function(){
        ga('send', 'pageview', '/page_unload');
    })

});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function () {
    $('.navbar-toggle:visible').click();
});

function createFunctionWithTimeout(callback, opt_timeout) {
    var called = false;
    setTimeout(callback, opt_timeout || 1000);
    return function () {
        if (!called) {
            called = true;
            callback();
        }
    }
}


var trackLink = function(category, action, label, url) {
    ga('send', 'event', category, action, label, {
        'transport': 'beacon',
        'hitCallback': function(){document.location = url;}
    });
}