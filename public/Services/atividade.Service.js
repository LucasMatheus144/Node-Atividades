const { Op } = require('sequelize');
const { Atividade } = require('../Models/Tarefas/Atividade');
const { StatusAtividade,SituacaoAtividade} = require('../enums/AtividadeEnum');
const { ensureEnum,ensureNotEmptyString} = require('../Helpers/validation.util');

const STATUS_VALUES = Object.values(StatusAtividade);
const SITUACAO_VALUES = Object.values(SituacaoAtividade);

async function getAll({
  status,
  situacao,
  q,
  limit = 100,
  offset = 0
} = {}) {
  ensureEnum(status, STATUS_VALUES, 'Status inválido.');
  ensureEnum(situacao, SITUACAO_VALUES, 'Situação inválida.');

  const where = {};

  if (status) where.status = status;
  if (situacao) where.situacao = situacao;

  if (q) {
    where.descricao = { [Op.iLike]: `%${q.trim()}%` };
  }

  const { rows, count } = await Atividade.findAndCountAll({
    where,
    limit,
    offset,
    order: [['dataCadastro', 'DESC']]
  });

  return {
    items: rows,
    total: count
  };
}

async function create({ descricao, status, situacao, dataCadastro } = {}) {
  ensureNotEmptyString(descricao, 'Descrição é obrigatória.');
  ensureEnum(status, STATUS_VALUES, 'Status inválido.');
  ensureEnum(situacao, SITUACAO_VALUES, 'Situação inválida.');

  return Atividade.create({
    descricao: descricao.trim(),
    status,
    situacao,
    ...(dataCadastro ? { dataCadastro: new Date(dataCadastro) } : {})
  });
}

async function merge(id, patch = {}) {
  const entity = await Atividade.findByPk(id);
  if (!entity) {
    const err = new Error('Registro não encontrado.');
    err.status = 404;
    throw err;
  }

  if (patch.descricao !== undefined) {
    ensureNotEmptyString(patch.descricao, 'Descrição inválida.');
    entity.descricao = patch.descricao.trim();
  }

  if (patch.status !== undefined) {
    ensureEnum(patch.status, STATUS_VALUES, 'Status inválido.');
    entity.status = patch.status;
  }

  if (patch.situacao !== undefined) {
    ensureEnum(patch.situacao, SITUACAO_VALUES, 'Situação inválida.');
    entity.situacao = patch.situacao;
  }

  if (patch.dataCadastro !== undefined) {
    const date = new Date(patch.dataCadastro);
    if (Number.isNaN(date.getTime())) {
      const err = new Error('Data de cadastro inválida.');
      err.status = 400;
      throw err;
    }
    entity.dataCadastro = date;
  }

  await entity.save();
  return entity;
}

async function remove(id) {
  const entity = await Atividade.findByPk(id);
  if (!entity) {
    const err = new Error('Registro não encontrado.');
    err.status = 404;
    throw err;
  }

  await entity.destroy();
  return { deleted: true, id };
}

async function listagemByStatus(status, options = {}) {
  ensureEnum(status, STATUS_VALUES, 'Status inválido.');
  return getAll({ ...options, status });
}

async function buscaByDescricao(descricao, options = {}) {
  if (!descricao || typeof descricao !== 'string' || !descricao.trim()) {
    const err = new Error('Informe a descrição para busca.');
    err.status = 400;
    throw err;
  }

  return getAll({ ...options, q: descricao.trim() });
}


module.exports = {
  getAll,
  create,
  merge,
  remove,
  listagemByStatus,
  buscaByDescricao
};
