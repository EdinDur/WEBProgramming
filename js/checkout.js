$("#billingForm").validate({
    rules: {
        fname: {
            required: true
        },
        lname: {
            required: true
        },
        email: {
            required: true
        },
        address: {
            required: true
        },
        city: {
            required: true
        },
        country: {
            required: true
        },
        zip: {
            required: true
        },
        tel: {
            required: true
        },
        onotes: {
            required: false
        }
    }
  });
  
  $("#paymentForm").validate({
    rules: {
        "card-number": {
            required: function() {
                return $("#Visa").is(":checked");
            },
            minlength: 16
        },
        "selectedYear": {
            required: function() {
                return $("#Visa").is(":checked");
            }
        },
        "selectedMonth": {
            required: function() {
                return $("#Visa").is(":checked");
            }
        },
        "ccv": {
            required: function() {
                return $("#Visa").is(":checked");
            },
            minlength: 3
        },
        "username": {
            required: function() {
                return $("#Paypal").is(":checked");
            }
        },
        "verification": {
            required: function() {
                return $("#Paypal").is(":checked");
            },
            minlength: 4
        }
    }   
});



  $("#submitButton").click(function(event) {
    var billingFormValid = $("#billingForm").valid();
    var paymentFormValid = $("#paymentForm").valid();
    
    if (billingFormValid && paymentFormValid) {
        console.log("Both forms are valid. Proceeding with submission.");
        event.preventDefault();
        blockUi("#paymentForm");
        blockUi("#billingForm");
        //sent ajax post request with both forms 

    } else {
        event.preventDefault();
        console.log("One or both forms are invalid. Please fill out all required fields.");
        unblockUi("#paymentForm");
        unblockUi("#billingForm");
    }
});

function blockUi(element) {
    $(element).block({
        message: '<div class="spinner-border text-primary" role="status"></div>',
        css: {
            backgroundColor: "transparent",
            border: "0",
        },
        overlayCSS: {
            backgroundColor: "#000",
            opacity: 0.25,
        },
    });
  }
  
  function unblockUi(element) {
    $(element).unblock({});
  }
  
  function serializeForm(form) {
    let jsonResult = {};
    $.each($(form).serializeArray(), function() {
        jsonResult[this.name] = this.value;
    });
    return jsonResult;
  }