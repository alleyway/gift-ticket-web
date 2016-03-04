$(function() {

    var BASE_URL = "https://api-staging.thegiftticket.com/api";

    $("body").on("input propertychange", ".floating-act-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-act-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-act-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });

    var mobileEntry = $("#mobileEntry");

    mobileEntry.intlTelInput({
        utilsScript: "/bower_components/intl-tel-input/lib/libphonenumber/build/utils.js"
    });

    var mobile = $("#mobile");

    mobileEntry.intlTelInput("setNumber", mobile.val());

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

    var activationForm = $("#activation_form");

    activationForm.on("submit", function(e){
        e.preventDefault();
        //$.ajax({
        //    type:"get",
        //    url: BASE_URL + "/activation",
        //    async: true,
        //    dataType: "json",
        //    success: function(){
        //        alert("success");
        //    }
        //});

        var activationRequest = {
            "activationCode": $("input[name='activationCode']").val(),
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
            success: function(){
                alert("success");
            }
        });

    });

});



