const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requeriDir = require('require-dir');

// Iniciando o app
const app = express();
app.use(express.json());
app.use(cors());

// Iniciando o DB
mongoose.connect(
    'mongodb://localhost:27017/nodeapi', 
    { useNewUrlParser: true }
);
requeriDir('./src/models');


// Rotas
app.use('/api', require("./src/routes"));

app.listen(3001);