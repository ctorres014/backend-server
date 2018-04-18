var express = require('express');
//bcryptjs para realizar la encriptacion
var bcrypt = require('bcryptjs');

//Importamos el middleware
var md = require('../middlewares/autenticacion');

// Importamos el esquema
var Usuario = require('../models/usuario');

var app = express();

// ===========================================
// Obtenemos todos los usuarios
// ===========================================
app.get('/', (req, res, next) => { // Next para continuar con la siguiente instruccion

    // Obtenemos todos los usuarios
    Usuario.find({}, 'nombre email img role')
        .exec(
            (err, usuarios) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuario',
                        errors: err
                    });
                }

                return res.status(200).json({
                    OK: true,
                    // como estamos usando las caracteristicas
                    // de ES6 podriamos haber devuelto solo usuarios
                    usuarios: usuarios
                });
            }
        );

});

// ===========================================
// Actualizar un usuario
// ===========================================
app.put('/:id', md.VerificaToken, (req, res) => {

    // Obtenemos el id pasado por parametro desde el request
    let id = req.params.id;
    let body = req.body;

    Usuario.findById(id, (err, usuario) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error interno del servidor',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: true,
                mensaje: 'El usuario no existe',
            });
        }

        // Si el usuario existe
        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error interno del servidor al actualizar',
                    errors: err
                });
            }

            return res.status(200).json({
                OK: true,
                usuario: usuarioGuardado
            });

        });

    });

});

// ===========================================
// Creamos un usuario
// ===========================================
app.post('/', md.VerificaToken, (req, res) => {

    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }

        return res.status(201).json({
            OK: true,
            // como estamos usando las caracteristicas
            // de ES6 podriamos haber devuelto solo usuarios
            usuario: usuarioGuardado
        });

    });

});

// ===========================================
// Borrar un usuario
// ===========================================
app.delete('/:id', md.VerificaToken, (req, res) => {
    var usuarioId = req.params.id;

    Usuario.findByIdAndRemove(usuarioId, (err, usuario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al eliminar usuario',
                errors: err
            });
        }

        return res.status(200).json({
            ok: true,
            usuario: usuario
        });

    });
})

module.exports = app;