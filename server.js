const express = require('express');
const mongoose = require('mongoose');
const questionRoutes = require('./routes/questionRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para manejar JSON
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(error => console.error('Error al conectar a MongoDB:', error));

// Usar rutas
app.use('/api/questions', questionRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${3000}`);
});
