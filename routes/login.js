var express = require('express');
//bcryptjs para realizar la encriptacion
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

// Importamos el esquema
var Usuario = require('../models/usuario');

var app = express();

// ===========================================
// Login de usuario
// ===========================================
app.post('/', (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al recuperar los datos',
                errors: err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: true,
                mensaje: 'Credenciales incorrectas',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: true,
                mensaje: 'Credenciales incorrectas',
                errors: err
            });
        }

        usuarioDB.password = ':)';
        // Creamos el token
        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 })
        return res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            id: usuarioDB._id,
            token: token
        });

    });

    res.status(200).json({
        OK: true,
        mensaje: 'Peticion correcta'
    });
});

module.exports = app;