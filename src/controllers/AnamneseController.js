// src/controllers/AnamneseController.js
// Lógica de negócio para a criação e consulta de anamneses

const Anamnese = require('../models/Anamnese'); // Importa o modelo Anamnese
const Paciente = require('../models/Paciente'); // Importa o modelo Paciente para validação

const AnamneseController = {

    /**
     * @description Cria uma nova anamnese para um paciente.
     * @route POST /api/anamneses
     * @param {Object} req - Objeto de requisição do Express
     * @param {Object} res - Objeto de resposta do Express
     */
    async createAnamnese(req, res) {
        try {
            const { pacienteId } = req.body;

            const pacienteExiste = await Paciente.findById(pacienteId);

            if (!pacienteExiste) {
                return res.status(404).json({ message: 'Paciente não encontrado. Não é possível criar anamnese.' });
            }
            const novaAnamnese = new Anamnese(req.body);
            const anamneseSalva = await novaAnamnese.save();
           
            res.status(201).json(anamneseSalva);

        } catch (error) {
            console.error('Erro ao criar anamnese:', error); 
            if (error.name === 'ValidationError') {
                return res.status(400).json({ message: error.message });
            }
           
            if (error.name === 'CastError' && error.path === 'pacienteId') {
                return res.status(400).json({ message: 'ID do paciente inválido.' });
            }
            res.status(500).json({ message: 'Erro interno ao criar anamnese.' });
        }
    },

    /**
     * @description Lista todas as anamneses de um paciente específico.
     * @route GET /api/pacientes/:id/anamneses
     * @param {Object} req - Objeto de requisição do Express (req.params.id será o ID do paciente)
     * @param {Object} res - Objeto de resposta do Express
     */
    async getAnamnesesByPacienteId(req, res) {
        try {
            const { id } = req.params; 

            const pacienteExiste = await Paciente.findById(id);
            if (!pacienteExiste) {
                return res.status(404).json({ message: 'Paciente não encontrado.' });
            }

            const anamneses = await Anamnese.find({ pacienteId: id }).populate('pacienteId');
            res.status(200).json(anamneses);

        } catch (error) {
            console.error('Erro ao buscar anamneses por paciente ID:', error);
            // Captura erros de formato de ID inválido
            if (error.name === 'CastError') {
                return res.status(400).json({ message: 'ID de paciente inválido.' });
            }
            res.status(500).json({ message: 'Erro interno ao buscar anamneses.' });
        }
    },
};

module.exports = AnamneseController;
