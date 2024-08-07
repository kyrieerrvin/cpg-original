function handleLogin(event, successCallback) {
    event.preventDefault(); 

    $.ajax({
        data: {
            username: $('#userId').val(),
            password: $('#password').val()
        },
        type: 'POST',
        url: '/login'
    })
    .done(function(data) {
        if (data.status === "error") {
            $('#errorAlert').text('Error: Invalid User ID or Password.').show();
            $('#successAlert').hide();
        } else if (data.status === "success") {
            $('#successAlert').text("Login successful! Redirecting...").show();
            $('#errorAlert').hide();

            setTimeout(successCallback, 1000); 
        }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        $('#errorAlert').text('An unexpected error occurred: ' + textStatus).show();
        $('#successAlert').hide();
    });
}

$(document).ready(function() {
    $('#loginForm').submit(function(event) {
        handleLogin(event, function() {
            window.location.href = '/home.html'; // Redirect after main login (if needed)
        });
    });
});
