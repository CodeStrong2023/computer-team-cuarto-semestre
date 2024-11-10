const email = document.getElementById("email");
const password = document.getElementById("password");
const btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener("click", async (e) => {
  e.preventDefault(); // Prevenir el comportamiento por defecto del botón de submit

  const user = {
    email: email.value,
    password: password.value,
  };

  try {
    // Realizar la solicitud POST al backend para verificar las credenciales
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    // Manejo de la respuesta
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en el inicio de sesión");
    }

    const data = await response.json(); // Aquí recibimos el token o la respuesta del servidor

    // Si el inicio de sesión fue exitoso, almacena el token y redirige
    localStorage.setItem("authToken", data.token); // Guarda el token en localStorage

    Swal.fire({
      icon: "success",
      title: "Bienvenido",
      text: "Ingreso exitoso",
    });

    // Redirigir a la página principal o de productos
    setTimeout(() => {
      window.location.href = "./productos.html";
    }, 2000);

  } catch (error) {
    // Si ocurre un error, mostrar un mensaje de alerta
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message || "Hubo un error al intentar iniciar sesión",
    });
  }
});