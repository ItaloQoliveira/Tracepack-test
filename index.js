const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
require('dotenv').config()


const url = process.env.BD_URL;
const options = { useUnifiedTopology: true , useNewUrlParser: true};

mongoose.connect(url,options);


mongoose.connection.on('error', (err) =>{
    console.log(`Erro na conexão com o banco de dados: ${err} `);
})

mongoose.connection.on('connected',() =>{
    console.log("Conectado com sucesso ao banco de dados");
})

mongoose.connection.on('disconnected',() =>{
    console.log("aplicação desconectada do banco de dados");
})

app.use(express.static('./app/public'));
//app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');
const mapsRoute = require('./routes/maps');

app.set('view engine', 'ejs');
app.set('views', "./app/views");
app.use('/', indexRoute); //setando o index como padrão caso nao seja passado rota, utilizado para navegacao no site
app.use('/users',usersRoute); //criando a rota de usuario
app.use('/maps', mapsRoute); //criando a rota de maps

app.use((req, res) => {
    res.send('404: Página não encontrada')
})




app.listen(3000);

module.exports = app;