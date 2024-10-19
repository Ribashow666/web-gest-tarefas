const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importar o middleware CORS
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do CORS
const corsOptions = {
  origin: '*',  // URL do seu frontend
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));  // Usando CORS com as opções definidas

// Middleware para parsing de JSON
app.use(bodyParser.json());

// Armazenamento temporário dos dados (pode ser um banco de dados em um cenário real)
let solicitacoes = [];

// Rota para lidar com o envio do formulário (POST)
app.post('/api/solicitar-demonstracao', (req, res) => {
    const { nome, email, mensagem } = req.body;

    // Verificar se os dados estão corretos
    if (!nome || !email || !mensagem) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    // Adicionar os dados recebidos no array de solicitações
    solicitacoes.push({ nome, email, mensagem, data: new Date() });

    // Enviar resposta de sucesso
    res.status(200).json({ message: 'Solicitação recebida com sucesso.' });
});

// Rota para obter todas as solicitações (GET)
app.get('/api/solicitar-demonstracao', (req, res) => {
    res.status(200).json(solicitacoes);
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
