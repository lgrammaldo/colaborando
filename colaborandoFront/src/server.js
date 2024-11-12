const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000
const whiteList = ['http://localhost:3000']

app.use(cors({origin: whiteList}));

// Configuración de rutas
app.get('/turnos', (req, res) => {
  // Manejar la solicitud
  res.send('Respuesta desde el servidor');
});

app.get('/sonrisadental/turnos', (req, res) => {
    // Manejar la solicitud
    res.send('Respuesta desde el servidor');
  }); 
// Otro middleware y configuraciones...

// Iniciar el servidor

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});