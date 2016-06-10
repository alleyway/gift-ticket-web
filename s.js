
$(function() {

    $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
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

    var scratcherId = $.urlParam("s");


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

    
});