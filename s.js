
$(function() {

    $(function () {
        $.fn.spin.presets.c2p = {
            lines: 13 // The number of lines to draw
            , length: 28 // The length of each line
            , width: 14 // The line thickness
            , radius: 42 // The radius of the inner circle
            , scale: 0.75 // Scales overall size of the spinner
            , corners: 1 // Corner roundness (0..1)
            , color: '#000' // #rgb or #rrggbb or array of colors
            , opacity: 0.25 // Opacity of the lines
            , rotate: 0 // The rotation offset
            , direction: 1 // 1: clockwise, -1: counterclockwise
            , speed: 1 // Rounds per second
            , trail: 60 // Afterglow percentage
            , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
            , zIndex: 2e9 // The z-index (defaults to 2000000000)
            , className: 'spinner' // The CSS class to assign to the spinner
            , top: '30%' // Top position relative to parent
            , left: '50%' // Left position relative to parent
            , shadow: false // Whether to render a shadow
            , hwaccel: false // Whether to use hardware acceleration
            , position: 'absolute' // Element positioning
        };

        

        $(".btn-paypal, .btn-venmo").on("click", function () {

            $("body").spin('c2p');

        });
    });

    $.readScratcherId = function () {
        var results = new RegExp('\\?([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        }
        else {
            return results[1] || 0;
        }
    };

    var BASE_URL = "https://api-staging.thegiftticket.com/api";

    if (window.location.href.indexOf('localhost') > 0) {
        BASE_URL = "http://localhost:8080/api";
    }

    if (window.location.href.indexOf('alleyway.duckdns.org') > 0) {
        BASE_URL = "http://alleyway.duckdns.org:8080/api";
    }
    
    if (window.location.href.indexOf('thegiftticket.com') > 0) {
        BASE_URL = "https://api.thegiftticket.com/api";
    }

    var scratcherId = $.readScratcherId();


    $.ajax({
        type:"get",
        url: BASE_URL + "/scratcher/paymentlinks/" + scratcherId,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        async: true,
        dataType: "json",
        success: function(data){

            //alert(data.amount);

            $("#payment_container .pay-amount").text(data.amount);
            $("#payment_container .gt-recipient-email").text(data.recipientEmail);
            $("#payment_container .btn-paypal").attr("href", data.payPalUrl);
            $("#payment_container .btn-venmo").attr("href", data.venmoUrl);

            $("#payment_container").show();

        },
        error: function(e){
            $("#payment_container").hide();

            var errorMessage = "So sorry! We're having an error finding payment details or the server is down for maintenance!";

            $('#message_container').html("<div class='alert alert-danger'>");
            $('#message_container > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                .append("</button>");
            $('#message_container > .alert-danger').append("<strong>" + errorMessage + "</strong>" );

            $('#message_container > .alert-danger').append('<br/>Please try again later, if problem persists, please email <strong>support@thegiftticket.com</strong>');

            $('#message_container > .alert-danger').append('</div>');
        }
    });


    $('#payment_container .btn-venmo').on('click', function(e){

        var origLink = e.currentTarget.href;

        // try to launch the native app first, if that fails, then load web-page

        e.preventDefault();
        window.location = "venmo://paycharge" + origLink.substring(18);
        var count = 0;
        var myInterval = null;
        var before = Date.now();
        myInterval = setInterval(function(){
            count++;

            if (count>17){
                clearInterval(myInterval);
                var after = Date.now();
                if ((after - before) < 3000){
                    window.location.href = origLink;
                }
            }
        }, 100);


    });

    $(document).on('show', function() {
        $("body").spin(false);
    });

    $(document).on('hide', function() {
        $("body").spin(false);
    });

    $(window).bind("pageshow", function(event) {
        if (event.originalEvent.persisted) {
            $("body").spin(false);
        }
    });
});



var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};