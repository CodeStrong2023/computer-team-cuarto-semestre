import mysql2 from "mysql2";

// Conexión a la base de datos

const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "MirtaRoberto",
  database: "mundodeporte",
});

connection.connect((err) => {
  if (err) {
    console.log("Error database", err);
    return;
  }

  console.log("Conexion exitosa a MYSQL");
});

export default connection;
