const knex = require("../database/knex");

class FavController{
  async create(request, response) {
    const {favorites} = request.body;
    const user_id = request.user.id;

    await knex("favorites").insert({
      favorites,
      user_id
    });

    return response.status(201).json();
  };

  async update(request, response) {
    const {favorites} = request.body;
    const user_id = request.user.id;

    await knex("favorites").where({user_id}).update({
      favorites
    });

    return response.json();
  }

  async show(request, response) {
    const user_id = request.user.id;

    const favList = await knex("favorites").where({user_id}).first();

    return response.json(favList);
  }
}

module.exports = FavController;