var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

// ===========================================
// Verificar Token
// ===========================================
exports.VerificaToken = function(req, res, next) {

    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }

        // Asignamos la informacion del usuario al request
        // Esto nos permite tener la informacion del usuario que realiza la peticion
        req.usuario = decoded.usuario;

        // Le dicimos al middelware que puede seguir
        // con las instrucciones
        next();
    })

}