const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const authConfig = require("../config/auth");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

class SessionController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("Usuário ou senha incorreto!");
    };

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Usuário ou senha incorreto!");
    };

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    });

    return response.json({user, token});
  };
};

module.exports = SessionController;