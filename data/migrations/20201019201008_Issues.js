exports.up = function (knex) {
  return knex.schema
    .createTable("issue", (table) => {
      table.increments(),
        table.string("title").index().notNullable(),
        table.text("description").notNullable(),
        table.string("location").notNullable(),
        table.date("date"),
        table
          .integer("user_id")
          .unsigned()
          .references("users_table.id")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
    })
    //THIS TABLE IS USELESS AND DOES NOTHING
    .createTable("issue_list", (table) => {
      table.increments(),
        table
          .integer("user_id")
          .unsigned()
          .references("users_table.id")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
      table
        .integer("issue_id")
        .unsigned()
        .references("issue.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("issue_list").dropTableIfExists("issue");
};
