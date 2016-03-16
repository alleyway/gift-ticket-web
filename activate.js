


$(function() {

    $(window).on("load", function() {
        $.fn.spin.presets.giftticket = {
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
            , top: '50%' // Top position relative to parent
            , left: '50%' // Left position relative to parent
            , shadow: false // Whether to render a shadow
            , hwaccel: false // Whether to use hardware acceleration
            , position: 'absolute' // Element positioning
        };
    });

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
                    

                } else {

                }

                alert(data.message);
            }
        });

    });

});



