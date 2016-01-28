
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});


$(function () {

    if (false){
        $("input[name='pre-first_name']").val("Michael");
        $("input[name='pre-last_name']").val("Lake");
        $("input[name='pre-address1']").val("123 Fake Lane");
        $("input[name='pre-address2']").val("A");
        $("input[name='pre-city']").val("Charlottesville");
        $("input[name='pre-state']").val("VA");
        $("input[name='pre-zip']").val("22903");
    }

    function isRecipientSelected(){
        return $('input:radio[name="where_to_send"]:checked').val() == "recipient";
    }

    $(".gift_amounts li").on("click touchstart", function(e){
        $(".gift_amounts li").removeClass("amount_selected");
        $(this).addClass("amount_selected");
    });

    var once = false;
    $("input[name='where_to_send']").on("change", function (e) {
        if (!once) {
            $(this).parents(".custom_order_group").addClass("custom_order_group_selected");
            once = true;
        }
        else
            $(".custom_order_group").toggleClass("custom_order_group_selected");

        var recipientSelected = isRecipientSelected();

        $(".recipient_required").each(function(){
            $(this).prop("required", recipientSelected);
        });

        $(".recipient_form input.form-control").each(function(){
            $(this).prop("disabled", !recipientSelected);
        });

    });

    $("#pp_form").on("submit", function(e){


        var checkoutElements = $("#checkout_elements");
        checkoutElements.empty();

        var amount = $(".amount_selected").text();

        $('<input type="text" />').attr({
            name: 'os0',
            value: amount
        }).appendTo(checkoutElements);

        if (isRecipientSelected()){
            $('<input type="text" />').attr({
                name: 'address_override',
                value: '1'
            }).appendTo(checkoutElements);

            $(".recipient_form input.form-control").each(function(){

                $('<input type="text" />').attr({
                    name: $(this).attr("name").substring(4),
                    value: $(this).val()
                }).appendTo(checkoutElements);

            });

        }


    });



});


$(function() {

    //$("input,textarea").jqBootstrapValidation({
    //    preventSubmit: true,
    //    submitError: function($form, event, errors) {
    //        // additional error messages or events
    //    },
    //    submitSuccess: function($form, event) {
    //        event.preventDefault(); // prevent default submit behaviour
    //        // get values from FORM
    //        var name = $("input#name").val();
    //        var email = $("input#email").val();
    //        var phone = $("input#phone").val();
    //        var message = $("textarea#message").val();
    //        var firstName = name; // For Success/Failure Message
    //        // Check for white space in name for Success/Fail message
    //        if (firstName.indexOf(' ') >= 0) {
    //            firstName = name.split(' ').slice(0, -1).join(' ');
    //        }
    //    },
    //    filter: function() {
    //        return $(this).is(":visible");
    //    },
    //});
    //
    //$("a[data-toggle=\"tab\"]").click(function(e) {
    //    e.preventDefault();
    //    $(this).tab("show");
    //});
});