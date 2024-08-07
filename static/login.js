document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    const errorAlert = document.getElementById('errorAlert');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const loginData = {
                username: username,
                password: password
            };

            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    loginModal.hide();
                    // Redirect to the desired page
                    const redirectPath = document.getElementById('redirectPath').value;
                    window.location.href = redirectPath;
                } else {
                    errorAlert.style.display = 'block';
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // Set up modal triggers with correct redirect paths
    const techArticlesLink = document.getElementById('techArticlesLink');
    const article3Link = document.getElementById('article3Link');

    if (techArticlesLink) {
        techArticlesLink.addEventListener('click', () => {
            document.getElementById('redirectPath').value = 'articles.html';
        });
    }

    if (article3Link) {
        article3Link.addEventListener('click', () => {
            document.getElementById('redirectPath').value = 'article3.html';
        });
    }
});
