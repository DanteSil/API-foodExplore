const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class UserController {
  async create(request, response) {
      const { name, email, password } = request.body;
      const isAdmin = false;

      const checkUserExists = await knex("users").where({email}).first();

      if(checkUserExists) {
        throw new AppError("Usuário já cadastrado");
      }

      const hashedPassword = await hash(password, 5);

      await knex("users").insert({
        name, 
        email, 
        password: hashedPassword,
        isAdmin
      });
      
      return response.json();
  };

  async upDate(request, response) {
    const { name, email, password, old_password } = request.body;
    const id = request.user.id;

    const user = await knex("users").where({id}).first();

    if(!user) {
      throw new AppError("Usuário não encontrado");
    };

    const updatedEmail = await knex("users").where({email}).first();
    
    if(updatedEmail && updatedEmail.id !== user.id) {
      throw new AppError("E-mail já utilizado");
    };

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(password && !old_password) {
      throw new AppError("Você precisa informar a senha antiga para trocar de senha!");
    };

    if(password && old_password) {
      const authPassword = await compare(old_password, user.password);

      if(!authPassword) {
        throw new AppError("Senha antiga invalida");
      };

      user.password = await hash(password, 5);
    };

    await knex("users").where({id}).update({
      name: user.name,
      email: user.email,
      password: user.password
    });

    return response.json();
  };
};

module.exports = UserController;