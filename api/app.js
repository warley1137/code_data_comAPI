const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost',  // ou IP do servidor de banco de dados
  user: 'root',
  password: '',
  database: 'codedata'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao MySQL');
});

// Endpoint para pegar todos os equipamentos
app.get('/equipamentos', (req, res) => {
  const sql = 'SELECT * FROM equipamentos';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Endpoint para adicionar um novo equipamento
app.post('/equipamentos', (req, res) => {
  const equipamento = req.body;
  const sql = 'INSERT INTO equipamentos SET ?';
  db.query(sql, equipamento, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
