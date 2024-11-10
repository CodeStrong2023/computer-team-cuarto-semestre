const nombre = document.getElementById("InputName");
const apellido = document.getElementById("InputLastName");
const email = document.getElementById("InputEmail");
const password = document.getElementById("InputPassword");
const confirmpassword = document.getElementById("InputConfirmPassword");
const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita que el formulario se envíe de forma tradicional

  // Validar que las contraseñas sean iguales
  if (password.value !== confirmpassword.value) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Las contraseñas no coinciden!",
    });
    return;
  }

  // Validar que todos los campos están completos
  if (!nombre.value || !apellido.value || !email.value || !password.value) {
    Swal.fire({
      icon: "error",
      title: "Faltan campos",
      text: "Por favor, completa todos los campos",
    });
    return;
  }

  // Validar formato de email
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email.value)) {
    Swal.fire({
      icon: "error",
      title: "Correo inválido",
      text: "Por favor, ingresa un correo electrónico válido",
    });
    return;
  }

  // Crear un objeto con los datos del usuario
  const user = {
    nombre: nombre.value,
    apellido: apellido.value,
    email: email.value,
    password: password.value, // Usamos la contraseña sin cifrar, el backend se encarga de cifrarla
  };

  try {
    // Hacer la solicitud al backend
    const response = await fetch("http://localhost:8080/api/registro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Aseguramos que estamos enviando JSON
      },
      body: JSON.stringify(user), // Convertimos el objeto `user` a JSON
    });

    // Leer la respuesta como texto para ver qué devuelve el backend
    const responseText = await response.text();
    console.log("Respuesta del servidor:", responseText);

    let data;
    try {
      // Intentar parsear la respuesta como JSON
      data = JSON.parse(responseText);
    } catch (error) {
      console.error("Error al parsear JSON:", error);
    }

    if (!response.ok) {
      // Si la respuesta no es OK, lanza un error
      throw new Error(data?.message || "Error al crear el usuario");
    }

    console.log("Datos del usuario:", data);

    // Si el usuario se creó correctamente
    Swal.fire({
      icon: "success",
      title: "Usuario creado",
      text: "Usuario creado exitosamente",
    });

    // Redirigir a la página de productos después de 2 segundos
    setTimeout(() => {
      window.location.href = "../media/productos.html";
    }, 2000);
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text:
        error.message ||
        "Hubo un error al intentar comunicarse con el servidor",
    });
  }
});

//login
const emailLogin = document.getElementById("InputEmailLogin");
const passwordLogin = document.getElementById("InputPasswordLogin");
const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita que el formulario se envíe de forma tradicional

  // Validar que todos los campos están completos
  if (!emailLogin.value || !passwordLogin.value) {
    Swal.fire({
      icon: "error",
      title: "Faltan campos",
      text: "Por favor, completa todos los campos",
    });
    return;
  }

  // Validar formato de email
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(emailLogin.value)) {
    Swal.fire({
      icon: "error",
      title: "Correo inválido",
      text: "Por favor, ingresa un correo electrónico válido",
    });
    return;
  }

  // Crear un objeto con los datos del usuario
  const user = {
    email: emailLogin.value,
    password: passwordLogin.value, // Usamos la contraseña sin cifrar, el backend se encarga de cifrarla
  };

  try {
    // Hacer la solicitud al backend
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Aseguramos que estamos enviando JSON
      },
      body: JSON.stringify(user), // Convertimos el objeto `user` a JSON
    });

    // Leer la respuesta como texto para ver qué devuelve el backend
    const responseText = await response.text();
    console.log("Respuesta del servidor:", responseText);

    let data;
    try {
      // Intentar parsear la respuesta como JSON
      data = JSON.parse(responseText);
    } catch (error) {
      console.error("Error al parsear JSON:", error);
    }

    if (!response.ok) {
      // Si la respuesta no es OK, lanza un error
      throw new Error(data?.message || "Error al iniciar sesión");
    }

    console.log("Datos del usuario:", data);

    // Si el usuario se creó correctamente
    Swal.fire({
      icon: "success",
      title: "Inicio de sesión exitoso",
      text: "Bienvenido",
    });

    // Redirigir a la página de productos después de 2 segundos
    setTimeout(() => {
      window.location.href = "../media/productos.html";
    }, 2000);
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text:
        error.message ||
        "Hubo un error al intentar comunicarse con el servidor",
    });
  }
});
