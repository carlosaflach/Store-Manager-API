// middlewares/error.js

module.exports = (err, req, res, _next) => {
  const statusByErrorCode = {
    notFound: 404, // Erros do tipo `notFound` retornam status 404 Not Found
    alreadyExists: 409, // Erros do tipo `alreadyExists` retornam status 409 Conflict
    isRequired: 400,
    insuficientLength: 422,
    // Podemos adicionar quantos códigos novos desejarmos
  };

  const status = statusByErrorCode[err.code] || 500;

  // Por último, retornamos o status e a mensagem de erro para o client
  res.status(status).json({ message: err.message });
};