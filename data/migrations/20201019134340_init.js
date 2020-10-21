exports.up = function (knex) {
  return knex.schema.createTable("users_table", (table) => {
    table.increments(),
      table.string("username").unique().index().notNullable(),
      table.string("password").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users_table");
};
