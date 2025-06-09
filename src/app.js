const express = require('express');                     
const mongoose = require('mongoose');

const app = express()                                    

const PORT = process.env.PORT || 3000;                 

const DB_URI = 'mongodb+srv://amancio:amesma@clinica-db.yqdbirb.mongodb.net/clinica_db?retryWrites=true&w=majority&appName=clinica-db';

mongoose.connect(DB_URI)
    .then(() => {
        console.log('Conectado ao MongoDB Atlas!');  
    })
    .catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err.message);  
    });

app.use(express.json())                                

app.get('/', (req, res) => {                             
    res.send('API da Clinica Médica Funcionando')
})

app.listen(PORT, () => {                                / 
    console.log(`Servidor rodando na porta ${PORT}`)
    console.log(`Acesse: http://localhost:${PORT}`)
}) 