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

    },


    async getAllPacientes(req, res) {
        try {
            const pacientes = await Paciente.find({})
            res.status(200).json(pacientes)
        } catch (error) {
            console.error('Erro ao buscar pacientes:', error)
            res.status(500).json({ message: error.message })
        }
        
    },


    async getPacienteById(req, res) {
        try {
            const { id } = req.params
            const paciente = await Paciente.findById(id)
            if (!paciente) {
                return res.status(404).json({ message: 'Paciente não encontrado. ' })
            }
            res.status(200).json(paciente)

        } catch (error) {
            console.error('Erro ao buscar paciente por ID:', error)
            if (error.name === 'CastError') {
                return res.status(400).json({ message: 'ID de paciente inválido.' })
            }
            res.status(500).json({ message: error.message })
        }
    },


    async updatePaciente(req, res) {
        try {
            const { id } = req.params
            const dadosAtualizados = req.body
            const pacienteAtualizado = await Paciente.findByIdAndUpdate(
                id,
                dadosAtualizados,
                { new: true, runValidators: true }
            )
            if (!pacienteAtualizado) {
                return res.status(404).json({ message: 'Paciente não encontrado para atualização.' });
            }
            res.status(200).json(pacienteAtualizado);

        } catch (error) {
            console.error('Erro ao atualizar paciente:', error)

            if (error.name === 'ValidationError') {
                return res.status(400).json({ message: error.message })
            }
            if (error.name === 'CastError') {
                return res.status(400).json({ message: 'ID de paciente inválido para atualização.' })
            }
            res.status(500).json({ message: 'Erro interno ao atualizar paciente.' })
        }
    },


    async deletePaciente(req, res) {
        try {
            const { id } = req.params
            const pacienteDeletado = await Paciente.findByIdAndDelete(id)
            console.log('Documento retornado por findByIdAndDelete:', pacienteDeletado)

            if (!pacienteDeletado) {
                return res.status(404).json({ message: 'Paciente não encontrado para exclusão.' })
            }
            res.status(200).json({ message: 'Paciente excluído com sucesso!', pacienteDeletado })

        } catch (error) {
            console.error('Erro ao excluir paciente:', error)
            // Captura erros de formato de ID inválido
            if (error.name === 'CastError') {
                return res.status(400).json({ message: 'ID de paciente inválido para exclusão.' })
            }
            res.status(500).json({ message: 'Erro interno ao excluir paciente.' })
        }
    }
}



module.exports = PacienteController
