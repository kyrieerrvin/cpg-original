const users = {
    "admin": "pass123",
    "user1": "pass234"
};

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from submitting traditionally

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users[username] && users[username] === password) {
        // Close modal if login is successful
        $('#loginModal').modal('hide');
        
        // Use a timeout to ensure modal closes before displaying the article
        setTimeout(() => {
            document.getElementById('article3').style.display = 'block';
        }, 300);
    } else {
        // Show error message if credentials are incorrect
        document.getElementById('errorAlert').style.display = 'block';
    }
});
