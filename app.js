// Este archivo es el punto de entrada de la app

//Required
var express = require('express');
var mongoose = require('mongoose');

// Inicializar Variables
var app = express();


// Conexion a la base de datos
mongoose.connect('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) throw err;

    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
});


// Rutas
app.get('/', (req, res, next) => { // Next para continuar con la siguiente instruccion
    res.status(200).json({
        OK: true,
        mensaje: 'Peticion realizada correctamente'
    });
});

// Escuchar peticiones

app.listen(3000, () => {
    console.log('Express Server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});