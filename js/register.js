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
  let jsonResult = {};
  $.each($(form).serializeArray(), function() {
      jsonResult[this.name] = this.value;
  });
  return jsonResult;
}

function apiFormHandler(form, event) {
  event.preventDefault();
  blockUi("#register-form");
  let data = serializeForm(form);

  $.getJSON("http://127.0.0.1:443/json/users.json", function(existingUsers) {
      let existingUsernames = existingUsers.map(user => user.uname);
      let existingEmails = existingUsers.map(user => user.email);

      if (existingUsernames.includes(data.uname)) {
          showErrorMessage("Username already exists");
          unblockUi("#register-form");
          return;
      }

      if (existingEmails.includes(data.email)) {
          showErrorMessage("Email already exists");
          unblockUi("#register-form");
          return;
      }

      $.post("http://127.0.0.1:443/json/users.json", JSON.stringify(data))
          .done(function() {
              $("#register-form")[0].reset();
              showSuccessMessage("Registration successful!");
              console.log("Form submitted successfully");
          })
          .fail(function() {
              console.log("Failed to submit form");
              //setTimeout(function() {
             //   window.location.href = '#home'; For demonstration shoud go to .done
           // }, 2000);
          })
          .always(function() {
              unblockUi("#register-form");
          });
  });
}

