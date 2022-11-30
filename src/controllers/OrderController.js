const knex = require("../database/knex");

class OrderController {
  async create(request, response) {
    const { paymentMethod, details } = request.body;
    const  user_id  = request.user.id;

    const status = "Pendente";

    const order_id = await knex("orders").insert({
      user_id,
      paymentMethod,
      status,
    });

    const orderItems = details.map(item => {
      return{
        dish: item.title,
        quantity: item.amount,
        dish_id: item.id,
        order_id
      };
    });

    await knex("orderItem").insert(orderItems);

    return response.json();
  }

  async index(request, response) {
    const  user_id  = request.user.id;

    const orders = await knex("orders").where({ user_id }).orderBy("id");
    const items = await knex("orderItem");

    const ordersWithItems = orders.map(order => {
      const orderItem = items.filter(item => item.order_id === order.id);

      return {
        ...order,
        items: orderItem
      };
    });

    return response.json(ordersWithItems);
  };

  async show(request, response) {
    const { id } = request.params;

    const order = await knex("orders").where({ id }).first();
    const orderItems = await knex("orderItem").where({order_id: order.id});

    response.json({
      ...order,
      orderItems
    });
  };
};

module.exports = OrderController;