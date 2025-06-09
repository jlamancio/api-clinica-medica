const Paciente = require('../models/Paciente')

const PacienteController = {
    async createPaciente(req, res) {
        try {
            const novoPaciente = new Paciente(req.body)
            const pacienteSalvo = await novoPaciente.save()
            res.status(201).json(pacienteSalvo)
        } catch (error) {
            console.error('Erro ao criar paciente: ', error)
            res.status(400).json({ message: error.message })
        }
    }
}

module.exports = PacienteController
