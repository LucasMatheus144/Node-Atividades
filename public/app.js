require('dotenv').config();

const express = require('express');
const rotas = require('./Router/router');
const { openConnection, closeDb } = require('./Services/db.service');
const { dbErrorConection } = require('./Middlewares/ExceptionDb');

require('./Models/Login/User');

const app = express();
const porta = Number(process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', rotas);
app.use(dbErrorConection);

// health-check
app.get('/api/status/healthcheck', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'API UP 🚀'
  });
});

async function iniciarApp() {
  await openConnection();

  const server = app.listen(porta, () => {
    console.log(`🚀 Rodando na porta ${porta}`);
  });

  const shutdown = async (signal) => {
    server.close(async () => {
      await closeDb();
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

iniciarApp();
