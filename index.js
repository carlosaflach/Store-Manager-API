const express = require('express');
const app = require('./app');
require('dotenv').config();
const errorMiddleware = require('./middlewares/error');

app.use(express.json());

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
