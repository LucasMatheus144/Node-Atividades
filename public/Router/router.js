const express = require('express');
const authRouter = require('./Rotas/auth.router');
const atividadeRouter = require('./Rotas/Atividade.router');

const router = express.Router();

router.use('/auth', authRouter);
router.use(atividadeRouter);

module.exports = router;
