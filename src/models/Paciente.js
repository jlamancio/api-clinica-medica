const mongoose = require('moongoose');

const pacienteSchema = new mongoose.Schema({
    nomeCompleto: {
        type: String,
        requiered: true,
        trim: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    dataNascimento: {
        type: Date,
        required: true
    },
    telefone: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    logradouro:  { type: String, trim: true },
    numero:      { type: String, trim: true },
    complemento: { type: String, trim: true },
    bairro:      { type: String, trim: true },
    cidade:      { type: String, trim: true },
    estado:      { type: String, trim: true },
    cep:         { type: String, trim: true }
})

const Pasciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente