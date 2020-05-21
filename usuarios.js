(function () {
    var mongoose = require('mongoose');

    var Schema = mongoose.Schema;

    var usuarioSchema = new Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true
        }
    });

    module.exports = mongoose.model('usuarios', usuarioSchema);
})();