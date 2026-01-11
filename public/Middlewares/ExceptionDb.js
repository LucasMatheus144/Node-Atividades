function dbErrorConection(err, req, res, next) {
  if (
    err.name === 'SequelizeConnectionError' ||
    err.name === 'SequelizeHostNotFoundError' ||
    err.name === 'SequelizeInvalidConnectionError' ||
    err.name === 'SequelizeConnectionTimedOutError'
  ) {
    console.error('Erro de conexão com o banco:', err);

    return res.status(503).json({
      message: 'Serviço temporariamente indisponível.',
      detail: 'Erro ao conectar ao banco de dados.'
    });
  }
  next(err);
}

module.exports = { dbErrorConection };
