const mongoose = require('mongoose');

const anamneseSchema = new mongoose.Schema({
    pacienteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente', 
        required: true
    },
    dataAnamnese: {
        type: Date,
        default: Date.now, 
        required: true
    },
    queixasPrincipais: {
        type: String,
        required: true,
        trim: true
    },
    historicoDoencas: {
        type: String,
        trim: true,
        default: '' 
    },
    medicamentosEmUso: {
        type: String,
        trim: true,
        default: ''
    },
    alergias: {
        type: String,
        trim: true,
        default: ''
    },
    historicoFamiliar: { 
        type: String,
        trim: true,
        default: ''
    },
    historicoCirurgico: {
        type: String,
        trim: true,
        default: ''
    },
    examesFisicos: {
        type: String,
        trim: true,
        default: ''
    },
    diagnostico: {
        type: String,
        trim: true,
        default: ''
    },
    planoTratamento: {
        type: String,
        trim: true,
        default: ''
    }
}, {
    timestamps: true // Adiciona automaticamente campos `createdAt` e `updatedAt`
});


const Anamnese = mongoose.model('Anamnese', anamneseSchema);

module.exports = Anamnese;
