const express = require('express');
const app = express();
const path = require('path');

// Importe a biblioteca mysql2
const mysql = require('mysql');

// Configurações de conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: '',
  password: '',
  database: 'numeros'
});

// Realize a consulta SELECT
const listaBuscada = 'lista1'; // Substitua pela lista que deseja buscar
const query = `SELECT numero FROM listas_numeros WHERE lista_nome = ?`;

connection.query(query, [listaBuscada], (error, results) => {
  if (error) {
    console.error('Ocorreu um erro ao buscar os dados:', error);
  } else {
    const numeros = results.map(row => row.numero);
    console.log(`Os números da lista '${listaBuscada}' são:`, numeros);
  }
});

// Feche a conexão com o banco de dados após a consulta
connection.end();


// Configurando o mecanismo de visualização Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Dados a serem passados para o template
const data = {
  pageTitle: 'Exemplo Pug Dinâmico com Express e Bootstrap',
  pageDescription: 'Esta é uma página de exemplo usando Pug com Express para valores dinâmicos e Bootstrap para layout responsivo.',
  items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
  obs: 'essa é uma observação'
};

// Rota para renderizar o template com os dados
app.get('/', (req, res) => {
  res.render('template', data);
});

// Servindo arquivos estáticos do Bootstrap, jQuery e CSS personalizado
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, '/estilos')));

// Iniciando o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor iniciado em http://localhost:3000');
});
