
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
        //$("select[name='pre-state']").val("Virginia");
        $("input[name='pre-zip']").val("22903");
    }

    $(".bfh-states").on("change", function(e){
        $(this).css("color", "#333");
    });

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

        $(".bfh-states").prop("disabled", !recipientSelected);

    });

    $("#pp_form").on("submit", function(e){


        var checkoutElements = $("#checkout_elements");
        checkoutElements.empty();

        var amount = $(".amount_selected").text();

        if (!amount) {
            e.preventDefault();
            alert("Please select an amount!");
            return;
        }

        if (!$('input:radio[name="where_to_send"]:checked').val()){
            e.preventDefault();
            alert("Please choose where to send!");
            return;
        }

        if (isRecipientSelected() && !$(".bfh-states").val()){
            e.preventDefault();
            alert("Please select a state!")
            return;
        }

        $('<input type="hidden" />').attr({
            name: 'os0',
            value: amount
        }).appendTo(checkoutElements);

        if (isRecipientSelected()){
            $('<input type="hidden" />').attr({
                name: 'address_override',
                value: '1'
            }).appendTo(checkoutElements);

            $(".recipient_form .form-control").each(function(){

                $('<input type="hidden" />').attr({
                    name: $(this).attr("name").substring(4),
                    value: $(this).val()
                }).appendTo(checkoutElements);

            });
        }
    });

});

