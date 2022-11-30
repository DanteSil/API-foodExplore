const knex = require("../database/knex");

class AllOrderController {
  async update(request, response) {
    const { status, id } = request.body;

    await knex("orders").where({ id }).update({status});

    return response.json();
  };

  async index(request, response) {
    const allOrders = await knex("orders").orderBy("id");
    const items = await knex("orderItem");

    const allOrdersWithItems = allOrders.map(order => {
      const orderItem = items.filter(item => item.order_id === order.id);

      return {
        ...order,
        items: orderItem
      };
    });

    return response.json(allOrdersWithItems);
  };
};

module.exports = AllOrderController;