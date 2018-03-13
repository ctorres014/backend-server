var express = require('express');

var app = express();

// Rutas
app.get('/', (req, res, next) => { // Next para continuar con la siguiente instruccion
    res.status(200).json({
        OK: true,
        mensaje: 'Peticion realizada correctamente'
    });
});

module.exports = app;