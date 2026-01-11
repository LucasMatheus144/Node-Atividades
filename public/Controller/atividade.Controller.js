const atividadeService = require('../Services/atividade.Service');


async function getAll(req, res, next) {
  try {
    const query = {
      ...req.query,
      status: req.query.status ? Number(req.query.status) : undefined,
      situacao: req.query.situacao ? Number(req.query.situacao) : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      offset: req.query.offset ? Number(req.query.offset) : undefined
    };

    const result = await atividadeService.getAll(query);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const body = {
      ...req.body,
      status: req.body.status ? Number(req.body.status) : undefined,
      situacao: req.body.situacao ? Number(req.body.situacao) : undefined
    };

    const result = await atividadeService.create(body);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}


async function merge(req, res, next) {
  try {
    const id = Number(req.params.id);

    const patch = {
      ...req.body
    };

    if (patch.status !== undefined) patch.status = Number(patch.status);
    if (patch.situacao !== undefined) patch.situacao = Number(patch.situacao);

    const result = await atividadeService.merge(id, patch);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}


async function remove(req, res, next) {
  try {
    const id = Number(req.params.id);
    const result = await atividadeService.remove(id);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}


async function listagemByStatus(req, res, next) {
  try {
    const status = Number(req.params.status);

    const options = {
      ...req.query,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      offset: req.query.offset ? Number(req.query.offset) : undefined
    };

    const result = await atividadeService.listagemByStatus(status, options);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function buscaByDescricao(req, res, next) {
  try {
    const { descricao } = req.query;

    const options = {
      ...req.query,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
      offset: req.query.offset ? Number(req.query.offset) : undefined
    };

    const result = await atividadeService.buscaByDescricao(descricao, options);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAll,
  create,
  merge,
  remove,
  listagemByStatus,
  buscaByDescricao
};
