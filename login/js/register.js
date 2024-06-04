$("#register-form").validate({
    rules: {
        uname: {
            required: true
        },
        email: {
            required: true
        },
        psw: {
            required: true,
            minlength: 8
        },
        psw2: {
            required: true,
            equalTo: "#psw"
        }
    },
    messages: {
        uname: {
            required: "You must fill this field"
        },
        email: {
            required: "You must fill this field"
        },
        psw2: {
            equalTo: "Enter the same password"
        }
    },
    submitHandler: function(form, event) {
        apiFormHandler(form, event);
    }
});

function showSuccessMessage(message) {
    toastr.success(message);
}
function showErrorMessage(message) {
    toastr.error(message);
}

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
    let jsonResult = {
        username: form.uname.value,
        email: form.email.value,
        psw: form.psw.value
    };
    return jsonResult;
}

function apiFormHandler(form, event) {
    event.preventDefault();
    blockUi("#register-form");
    let data = serializeForm(form);

    RestClient.post("beckend/users/add", JSON.stringify(data), 
        function(response) {
            $("#register-form")[0].reset();
            showSuccessMessage("Registration successful!");

            Utils.set_to_localstorage('user', response);

            setTimeout(function() {
                 window.location = '../';
            }, 2000);
            unblockUi("#register-form");
        }, 
        function(xhr, status, error) {
            showErrorMessage("Username or Email already exist");
            unblockUi("#register-form");
        }
    );
}