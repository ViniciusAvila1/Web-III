const express = require('express')

const app = express()

const port = 3000

// necessário para analisar o corpo das requisições POST e PUT, que geralmente enviam dados em formato JSON

app.use(express.json())

// Dados de exemplo

let usuarios = [
    {id: 1, nome: 'Ana'},
    {id: 2, nome: 'Matheus'}
];

// GET /usuarios

app.get('/usuarios', (req,res) => {
    res.json(usuarios)
})

app.get('/usuarios/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const usuario = usuarios.find(u=> u.id === id)
    if (usuario) {
        res.json(usuario)
    } else {
        res.status(404).json({mensagem: 'Usuario não encontrado'})
    }
})

// POST

app.post('/usuarios', (req,res) => {
    const novoUsuario = req.body
    novoUsuario.id = usuarios.length + 1
    usuarios.push(novoUsuario)
    res.status(201).json(novoUsuario)
})

// PUT

app.put('/usuarios/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const usuarioIndex = usuarios.findIndex(u=> u.id === id)
    if (usuarioIndex !== -1) { 
        usuarios[usuariosIndex] = {...usuarios[usuarioIndex], ...req.body}
        res.json(usuarios[usuarioIndex])
    } else {
        res.status(404).json({mensagem: 'Usuário não encontrado'})
    }
})

// DELETE 

app.delete('/usuarios/:id', (req,res) => {
    const id = parseInt(req.params.id)
    usuarios = usuarios.filter(u=> u.id !== id)
    res.json({mensagem: 'Usuário excluído com sucesso'})
})

// Ligar o servidor

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})

app.get('/', (req,res) => {
    res.send('Olá, DSM FRANCA')
})

app.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})