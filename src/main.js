const express = require('express');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const mysql = require('mysql2');
const path = require('path');

const PORT = 3000;

const app = express();

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'docker',
  database: 'people'
});

connection.connect(err => {
  if (err) {
    console.error('🚨 Erro ao conectar ao banco de dados:', err);
  } else {
    createTableIfNotExists()
    console.log('Conexão bem-sucedida ao banco de dados 🐬');
  }
});

async function createTableIfNotExists() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS peoples (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(50)
    );`;
  
  try {
    connection.query(createTableQuery);
    console.log('Tabela criada ou já existe');
  } catch (error) {
    console.error('Erro ao criar a tabela:', error);
  } 
}

app.use(bodyParser.urlencoded({ extended: true }));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.post('/submit', (req, res) => {
  const submittedData = req.body.personName;
  const sql = 'INSERT INTO peoples SET name=?';
  connection.execute(sql, [submittedData], (err, results) => {
    if (err) {
      console.error('🚨 Erro ao inserir dados:', err);
      res.sendStatus(500);
    } else {
      res.redirect('/');
    }
  });
});


app.get('/', (request, response) => {
  connection.query('SELECT * FROM peoples', (err, results) => {
    if (err) {
      console.error('🚨 Erro ao buscar dados:', err);
      response.sendStatus(500);
    } else {
      response.render('home', { peoples: results });
    }
  });
});

// Encerre a conexão apenas quando o aplicativo for desligado
process.on('SIGINT', () => {
  connection.end();
  process.exit();
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
