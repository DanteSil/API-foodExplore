const knex = require("../database/knex");
const AppError = require("../utils/AppError");

async function ensureIsAdmin(request, response, next) {
  const id = request.user.id;

  const user = await knex("users").where({id}).first();

  if(!user.isAdmin) {
    throw new AppError("Usuário não autorizado!");
  };

  next();
};

module.exports = ensureIsAdmin;