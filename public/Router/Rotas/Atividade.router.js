const express = require('express');
const atividadeController = require('../../Controller/atividade.Controller');

const router = express.Router();

router.get('/atividades/busca', atividadeController.buscaByDescricao);
router.get('/atividades/status/:status', atividadeController.listagemByStatus);

router.get('/atividades', atividadeController.getAll);
router.post('/atividades', atividadeController.create);
router.patch('/atividades/:id', atividadeController.merge);
router.delete('/atividades/:id', atividadeController.remove);

module.exports = router;
