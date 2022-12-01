const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

function ingredientImg(name) {
  switch (name) {
    case 'alface':
      return 'alface.png'
    case 'ameixa':
      return 'ameixa.png'
    case 'amêndoas':
      return 'amêndoas.png'
    case 'aniz':
      return 'aniz.png'
    case 'café':
      return 'café.png'
    case 'camarão':
      return 'camarão.png'
    case 'canela':
      return 'canela.png'
    case 'claras':
      return 'claras.png'
    case 'damasco':
      return 'damasco.png'
    case 'farinha':
      return 'farinha.png'
    case 'limão':
      return 'limão.png'
    case 'maçã':
      return 'maçã.png'
    case 'massa':
      return 'massa.png'
    case 'pão naan':
      return 'pão naan.png'
    case 'pão':
      return 'pão.png'
    case 'pepino':
      return 'pepino.png'
    case 'pêssego':
      return 'pêssego.png'
    case 'pesto':
      return 'pesto.png'
    case 'maracujá':
      return 'maracujá.png'
    case 'presunto':
      return 'presunto.png'
    case 'rabanete':
      return 'rabanete.png'
    case 'rúcula':
      return 'rúcula.png'
    case 'tomate':
      return 'tomate.png'
    case 'whiskey':
      return 'whiskey.png'
    default:
      return 'default'
  }
}

class DishesController {
  async create(request, response) {
    const data = request.body.data;
    const { name, description, price, foodCategory, ingredients } = JSON.parse(data);
    const img = request.file.filename;

    const diskStorage = new DiskStorage();
    
    if(!name || !description || !price){
      throw new AppError("É obrigatório dar um nome, uma descrição, um valor e informar os ingredientes do prato.");
    };

    const filename = await diskStorage.saveFile(img);
    
    const dish_id = await knex("dishes").insert({
      name,
      description,
      price,
      foodCategory,
      image: filename,
    });

    const dishIngredients = ingredients.map(ingredient => {
      return {
        dish_id,
        name: ingredient,
        image: ingredientImg(ingredient)
      }
    });

    await knex("ingredients").insert(dishIngredients);
    
    return response.status(201).json();
  }

  async update(request, response){
    const data = request.body.data;
    const { name, description, price, foodCategory, ingredients } = JSON.parse(data);
    const { id } = request.params;
    const img = request.file.filename;

    const diskStorage = new DiskStorage();

    if(!name || !description || !price || !img){
      throw new AppError("É obrigatório dar um nome, uma descrição, um valor e informar os ingredientes do prato.");
    };

    const dish = await knex("dishes").where({ id }).first();

    if(dish.image) {
      diskStorage.deleteFile(dish.image);
    };

      const filename = await diskStorage.saveFile(img);
      
      await knex("dishes").where({ id }).update({
        name,
        description,
        price,
        foodCategory,
        image: filename,
      });

    await knex("ingredients").where({ dish_id: id }).del();

    const dishIngredients = ingredients.map(ingredient => {
      return {
        dish_id: id,
        name: ingredient,
      };
    });

    await knex("ingredients").insert(dishIngredients);
    return response.status(201).json();
  }

  async show(request, response) {
    const { id } = request.params;

    const dish = await knex("dishes").where({id}).first();
    const ingredients = await knex("ingredients").where({dish_id: id});

    return response.status(201).json({
      ...dish,
      ingredients
    });
  };

  async delete(request, response) {
    const { id } = request.params;

    const diskStorage = new DiskStorage();

    const dish = await knex("dishes").where({ id }).first();

    if(dish.image){
      diskStorage.deleteFile(dish.image);
    }

    await knex("dishes").where({ id }).first().delete();

    return response.status(202).json();
  }

  async index (request, response) {
    const { name } = request.query;

    let dishes;

    if(name){
      dishes = await knex("dishes")
      .whereLike("dishes.name", `%${name}%`)
      .groupBy("dishes.id")
      .orderBy("dishes.name")
    }else{
      dishes = await knex("dishes").orderBy("name")
    };

    const dishesIngredients = await knex("ingredients");
    const dishesWithIngredients = dishes.map( dish => {
      const ingredientDishes = dishesIngredients.filter(ing => ing.dish_id === dish.id);

      return {
        ...dish,
        ingredients: ingredientDishes
      };
    });

    return response.status(200).json(dishesWithIngredients);
  };
};

module.exports = DishesController;