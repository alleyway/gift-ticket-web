


$(function() {


    $("input,select,textarea").not("[type=submit]").jqBootstrapValidation();

    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null){
            return null;
        }
        else{
            return results[1] || 0;
        }
    };


    var BASE_URL = "https://api-staging.thegiftticket.com/api";

    if (window.location.href.indexOf('localhost') > 0){
        BASE_URL = "http://localhost:8080/api";
    }

    if (window.location.href.indexOf('thegiftticket.com')) {
        BASE_URL = "https://api.thegiftticket.com/api";
    }


    $("body").on("input propertychange", ".floating-act-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-act-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-act-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });


    var mobileEntry = $("#mobileEntry");

    mobileEntry.intlTelInput({
        onlyCountries: ["us"],
        utilsScript: "/bower_components/intl-tel-input/lib/libphonenumber/build/utils.js"
    });

    var mobile = $.urlParam("mobile");

    if (mobile) {
        mobileEntry.intlTelInput("setNumber", mobile);
    }

    var activationCode = $('#activationCode');

    $("body").on("focus", "#activationCode", function(e){
        $(this).parent().toggleClass("floating-label-form-group-with-value", true);
    }).on("blur", "#activationCode", function(e){
        $(this).parent().toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    });

    activationCode.inputmask({
        mask:"***-***",
        showMaskOnHover: false
    });

    activationCode.attr('autocomplete', 'off');
    activationCode.attr('autocorrect', 'off');
    activationCode.attr('autocapitalize', 'off');

    if (false){
        $("input[name='activationCode']").val("555-555");
        $("input[name='name']").val("Michael Lake");
        $("input[name='email']").val("mlake900+test@gmail.com");
        $("input[name='mobileEntry']").val("434-202-9223");
    }

    var activationButton = $("#activation_button");
    var activationForm = $("#activation_form");

    activationForm.on("submit", function(e){
        
        $('.box').spin('giftticket');
        activationButton.prop('disabled', true);
        
        var activationCode = $("#activationCode");
        activationCode.parent().toggleClass("floating-label-form-group-with-value", !! activationCode.val());
        e.preventDefault();

        var activationRequest = {
            "activationCode": activationCode.val(),
            "name" : $("input[name='name']").val(),
            "email" :$("input[name='email']").val(),
            "mobile" : $("input[name='mobileEntry']").val()
        };


        $.ajax({
            type:"post",
            data: JSON.stringify(activationRequest),
            url: BASE_URL + "/activation",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            async: true,
            dataType: "json",
            success: function(data){
                $('.box').spin(false);
                activationButton.prop('disabled', false);


                if (data.success){
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>" + data.message + "</strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    //$('#contactForm').trigger("reset");
                    
                } else {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>" + data.message + "</strong>" );
                    $('#success > .alert-danger').append('</div>');
                }
            }
        });

    });

});



