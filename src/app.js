const express = require('express');                     
const mongoose = require('mongoose');
const pacienteRoutes = require('./routes/pacientesRoutes')

//  -----------------   Inicialização do express
const app = express()                                    
const PORT = process.env.PORT || 3000;  

app.use(express.json())

app.use('/api', (req, res, next) => {
    console.log(`Requisição recebida em /api${req.url} - Método: ${req.method}`);
    next(); 
}, pacienteRoutes); 


//  -----------------   Conexão com o BD - MongoDB
const DB_URI = 'mongodb+srv://amancio:amesma@clinica-db.vkyh2tc.mongodb.net/?retryWrites=true&w=majority&appName=clinica-db';

mongoose.connect(DB_URI)
    .then(() => {
        console.log('Conectado ao MongoDB Atlas!');  
    })
    .catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err.message);  
    });


//  -----------------   Definição de rotas:

app.get('/', (req, res) => {                             
    res.send('API da Clinica Médica Funcionando')
})

app.use('/api', pacienteRoutes)


app.listen(PORT, () => {                                
    console.log(`Servidor rodando na porta ${PORT}`)
    console.log(`Acesse: http://localhost:${PORT}`)
}) 