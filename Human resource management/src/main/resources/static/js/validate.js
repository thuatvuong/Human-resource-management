$("form[role='form']").validate({
    rules: {
        "cert-id":{
            required: true,
            certId: true
        },
        "cost":{
            required: true,
        },
        "cert-name": {
            required: true,
        }
    },
    messages: {
        "cert-id": {
            required: "Please enter your cert's id",
        },
        "cost": {
            required: "Please enter your cost",
        },
        "cert-name": {
            required: "Please enter your cert's name",
        },
    },
    highlight: function (element) {
        $(element).removeClass('error');
    },
    unhighlight: function (element) {
        $(element).removeClass('error');
    }
})

$('button[type="reset"]').click(function () {
    $('form[role="form"]').validate().resetForm();
});

jQuery.validator.addMethod("certId", function (value, element) {
    return this.optional(element) || /^[a-zA-Z0-9-]{1,12}$/.test(value);
}, "Id wrong format!");
