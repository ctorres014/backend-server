var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;
//Definimos un objeto de roles validos
var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
}

// definiemos el esquema
var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, required: [true, 'El correo es necesario'] },
    password: { type: String, required: [true, 'La contrasena es necesaria'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos }
});

// Le decimos a mongoose que en el esquema actual aplique el validator
// {PATH} indica el/los campos unicos
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

// exponemos el modelo creado
module.exports = mongoose.model('Usuario', usuarioSchema);