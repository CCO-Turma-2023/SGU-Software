const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

// Conectar ao banco de dados SQLite
const dbConnection = new sqlite3.Database('./db.users', (err) => {
    if (err) {
        console.error('Error while connecting to database', err.message);
    } else {
        console.log('Connected to database');
    }
});

// Criar a tabela se não existir
dbConnection.serialize(() => {
    dbConnection.run("CREATE TABLE IF NOT EXISTS users (cpf TEXT PRIMARY KEY, senha TEXT)");
});

app.post('/create_user', (req, res) => {
    const { cpf, senha } = req.body;

    if (!cpf || !senha) {
        return res.status(400).json({ error: 'CPF e senha são obrigatórios.' });
    }

    dbConnection.run("INSERT INTO users (cpf, senha) VALUES (?, ?)", [cpf, senha], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({ message: 'Usuário criado com sucesso.' });
    });
});



app.post('/check_user', (req, res) => {
  const { cpf, senha } = req.body;

  if (!cpf || !senha) {
      return res.status(400).json({ error: 'CPF e senha são obrigatórios.' });
  }

  // Verificar se o usuário existe no banco de dados
  dbConnection.get("SELECT * FROM users WHERE cpf = ? AND senha = ?", [cpf, senha], (err, row) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }

      // Se houver um registro correspondente, o usuário existe
      const result = !!row; // Convertendo para boolean

      res.json({ result });
  });
});





// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para servir o arquivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para servir o arquivo home.html
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home', 'home.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin', 'admin.html'));
});

app.get('/aluno', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'aluno', 'aluno.html'));
});

app.get('/professor', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'professor', 'professor.html'));
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
