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
            const { pacienteId } = req.body; // Pega o ID do paciente do corpo da requisição

            // 1. Validação: Verifica se o pacienteId existe
            const pacienteExiste = await Paciente.findById(pacienteId);
            if (!pacienteExiste) {
                return res.status(404).json({ message: 'Paciente não encontrado. Não é possível criar anamnese.' });
            }

            // 2. Cria uma nova instância da Anamnese com os dados da requisição
            const novaAnamnese = new Anamnese(req.body);

            // 3. Salva a nova anamnese no banco de dados
            const anamneseSalva = await novaAnamnese.save();

            // 4. Retorna a anamnese criada com status 201 (Created)
            res.status(201).json(anamneseSalva);

        } catch (error) {
            console.error('Erro ao criar anamnese:', error); // Este console.error deve aparecer no seu terminal
            // Captura erros de validação do Mongoose (ex: campo obrigatório faltando)
            if (error.name === 'ValidationError') {
                return res.status(400).json({ message: error.message });
            }
            // Captura erros de formato de ID (se pacienteId for inválido)
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
            const { id } = req.params; // Pega o ID do paciente da URL (parâmetro de rota)

            // 1. Opcional: Verifica se o paciente existe antes de buscar as anamneses
            const pacienteExiste = await Paciente.findById(id);
            if (!pacienteExiste) {
                return res.status(404).json({ message: 'Paciente não encontrado.' });
            }

            // 2. Busca todas as anamneses que têm o pacienteId correspondente
            // O método .populate('pacienteId') é opcional, mas útil para trazer os dados do paciente junto
            const anamneses = await Anamnese.find({ pacienteId: id }).populate('pacienteId');

            // 3. Retorna a lista de anamneses com status 200 (OK)
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
