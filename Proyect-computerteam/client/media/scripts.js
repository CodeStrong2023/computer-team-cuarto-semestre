document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Aquí puedes agregar la lógica para autenticar al usuario
    // Por ejemplo, enviar una solicitud a tu API
    fetch('http://localhost:3000/api/auth/login', { // Cambia la URL según tu configuración
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Credenciales incorrectas');
        }
        return response.json();
    })
    .then(data => {
        // Guardar token en localStorage o manejar la respuesta
        localStorage.setItem('token', data.token);
        alert('Inicio de sesión exitoso');
        // Redirigir a la página deseada
        window.location.href = 'dashboard.html'; // Cambia a tu página deseada
    })
    .catch(error => {
        document.getElementById('error-message').textContent = error.message;
    });
});


