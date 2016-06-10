
$(function() {

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
        //using maps.google.com will launch native app
        if(isMobile.Android()){
            e.preventDefault();
            window.location = "venmo://paycharge" + origLink.substring(18);

            var count = 0;
            var myInterval = null;
            var before = Date.now();
            myInterval = setInterval(function(){
                count++;

                if (count>15){
                    clearInterval(myInterval);
                    var after = Date.now();
                    if ((after - before) < 3000){
                        window.location.href = origLink;
                    }
                }
            }, 100);

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