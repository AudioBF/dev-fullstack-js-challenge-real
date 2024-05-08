exports.up = function (knex) {
  return knex.schema.createTable("students", (table) => {
    table.bigInteger("ra").primary();
    table.string("name").notNull();
    table.string("email").notNull();
    table.bigInteger("cpf").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("students");
};
