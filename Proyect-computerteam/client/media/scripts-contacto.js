document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Aquí puedes agregar la lógica para enviar el formulario a tu API o servidor
    // Por ejemplo:
    fetch('http://localhost:3000/api/contact', { // Cambia la URL según tu configuración
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al enviar el mensaje');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('success-message').textContent = 'Mensaje enviado exitosamente.';
        document.getElementById('contactForm').reset(); // Reinicia el formulario
    })
    .catch(error => {
        document.getElementById('error-message').textContent = error.message;
    });
});
