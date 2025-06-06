const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    zona: {
        type: String,
        required: true,
        trim: true,
    },
    horario: {
        type: String,
        default: "",
    },
    contato: {
        type: String,
        required: true,
    },
    envio: {
        type: String,
        required: true,
    },
    os: {
        type: String,
        default: ""
    },
    obs: {
        type: String,
        default: "",
    },
    exec: {
        type: String,
        default: "-"
    }
}, {timestamps: true})

module.exports = mongoose.model('Item', itemSchema)