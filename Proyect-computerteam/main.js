import express from "express";
import cors from "cors";
import bcrypt from "bcrypt"; // Para cifrar las contraseñas
import bodyParser from "body-parser";
import { MercadoPagoConfig, Preference } from "mercadopago";
import connection from "./database.js";

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*", // Asegúrate de que esto coincida con el dominio desde donde enviarás las peticiones
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

// Ruta para probar que el servidor está activo
app.get("/", function (req, res) {
  res.send("Soy el server");
});

// Ruta para registrar usuario
app.post("/api/registro", async (req, res) => {
  try {
    const { nombre, apellido, email, password } = req.body;

    // Verifica si el usuario ya existe
    const checkUserQuery = "SELECT * FROM usuarios WHERE email = ?";
    connection.query(checkUserQuery, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error en la consulta" });
      }

      if (result.length > 0) {
        return res.status(400).json({ message: "El usuario ya existe" });
      }

      // Cifrar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insertar el nuevo usuario
      const insertQuery =
        "INSERT INTO usuarios (nombre, apellido, email, password) VALUES (?, ?, ?, ?)";
      connection.query(
        insertQuery,
        [nombre, apellido, email, hashedPassword],
        (err, result) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error al registrar el usuario" });
          }

          // Responder con el usuario creado (sin la contraseña en texto claro)
          res.status(201).json({
            id: result.insertId,
            nombre,
            apellido,
            email,
          });
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
});

// Ruta para iniciar sesión
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar al usuario en la base de datos
    const query = "SELECT * FROM usuarios WHERE email = ?";
    connection.query(query, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error en la consulta" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Verificar la contraseña
      const user = result[0];
      const passwordMatches = await bcrypt.compare(password, user.password);

      if (!passwordMatches) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      // Responder con el usuario (sin la contraseña en texto claro)
      res.json({
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

const client = new MercadoPagoConfig({
  accessToken:
    "TEST-4018734024031816-091619-5304023977a91f29ac72afd5092c30b7-655107501", //agregar el token
});

app.post("/create_preference", async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: req.body.description,
          unit_price: Number(req.body.price),
          quantity: Number(req.body.quantity),
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: "http://127.0.0.1:5500/E-COMMERCE2024/client/media/index.html",
        failure: "http://127.0.0.1:5500/E-COMMERCE2024/client/media/index.html",
        pending: "http://127.0.0.1:5500/E-COMMERCE2024/client/media/index.html",
      },
      auto_return: "approved",
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error al crear la preferencia",
    });
  }
});

app.listen(port, () => {
  console.log("El servidor esta corriendo en el puerto", port);
});
