
exports.up = knex => knex.schema.createTable("orderItem", table => {
  table.increments("id");
  table.integer("order_id").references("id").inTable("orders").onDelete("CASCADE");
  table.integer("dish_id").references("id").inTable("dishes");

  table.text("dish");
  table.integer("quantity");
  
  table.timestamp('created_at').default(knex.fn.now());
  table.timestamp('updated_at').default(knex.fn.now());
})

exports.down = knex => knex.schema.dropTable("orderItem");
