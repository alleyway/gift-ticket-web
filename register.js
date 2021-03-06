
function clearError(){
    $('#success').empty();
}


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

    if (window.location.href.indexOf('thegiftticket.com') > 0) {
        BASE_URL = "https://api.thegiftticket.com/api";
    }


    $("body").on("input propertychange", ".floating-act-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-act-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-act-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });


    var mobileEntry = $("#phone");

    mobileEntry.intlTelInput({
        autoPlaceholder: true,
        customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
            return "Phone";
        },
        utilsScript: "/bower_components/intl-tel-input/lib/libphonenumber/build/utils.js"
    });

    var mobile = $.urlParam("mobile");

    if (mobile) {
        mobileEntry.intlTelInput("setNumber", mobile);
    }

    var activationCode = $('#activationCode');

    $("body").on("focus", "#activationCode", function(e){
        $(this).parent().toggleClass("floating-label-form-group-with-value", true);
        $("div.flip-container")[0].classList.toggle("flip", true);
    }).on("blur", "#activationCode", function(e){
        $(this).parent().toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
        $("div.flip-container")[0].classList.toggle("flip", false);
    });

    activationCode.inputmask({
        mask:"***-***",
        showMaskOnHover: false,
        definitions: {
            '*': {
                validator: "[0-9A-Za-z]",
                cardinality: 1,
                casing: "upper"
            }
        }
    });

    activationCode.attr('autocomplete', 'off');
    activationCode.attr('autocorrect', 'off');
    activationCode.attr('autocapitalize', 'off');

    if (false){
        $("input[name='activationCode']").val("7ED-PHV");
        $("input[name='name']").val("Michael Lake");
        $("input[name='email']").val("mlake900+test@gmail.com");
        $("input[name='phone']").val("434-202-9223");
    }

    var activationButton = $("#activation_button");

    activationButton.on("click", function(e){
        e.preventDefault();
        clearError();
        
        $('.box').spin('giftticket');
        activationButton.prop('disabled', true);
        
        var activationCode = $("#activationCode");
        activationCode.parent().toggleClass("floating-label-form-group-with-value", !! activationCode.val());
        

        var activationRequest = {
            "activationCode": activationCode.val(),
            "name" : $("input[name='name']").val(),
            "email" :$("input[name='email']").val(),
            "mobileHolder" : mobileEntry.intlTelInput("getNumber"),
            "source" : "WEBSITE"
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
                    $('#activation_form').trigger("reset");
                    $('#activation_form label').parent().removeClass("floating-label-form-group-with-value");
                    $('#activation_form label').parent().removeClass("floating-label-form-group-with-focus");
                    
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



