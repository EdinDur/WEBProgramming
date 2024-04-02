$(document).ready(function() {
    $('form').submit(function(e) {
        e.preventDefault();

        var uname = $('[name="uname"]').val();
        var psw = $('[name="psw"]').val();

        $.ajax({
            url: 'http://127.0.0.1:443/json/users.json',
            dataType: 'json',
            success: function(usersData) {
                var isValidUser = false;
                usersData.forEach(function(user) {
                    if (user.uname === uname && user.psw === psw) {
                        isValidUser = true; 
                        return false;
                    }
                });

                if (isValidUser) {
                    toastr.success('Login successful!');
                    setTimeout(function() {
                        window.location.href = '#home';
                    }, 2000);
                } else {
                    toastr.error('Invalid username or password. Please try again.');
                }
            },
            error: function() {
                toastr.error('Error loading user data. Please try again later.');
            }
        });
    });
});
