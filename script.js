document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    if (username === 'praveen' && password === '1234') {
        message.style.color = 'green';
        message.textContent = 'Login successful!';
        setTimeout(() => {
            window.location.href = 'dashboard.html'; // Redirect to dashboard
        }, 1000); // Redirect after 1 second
    } else {
        message.style.color = 'red';
        message.textContent = 'Invalid username or password.';
    }
});