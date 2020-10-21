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
          .onUpdate("CASCADE"),
          table.integer('vote_count')
    })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("issue_list").dropTableIfExists("issue");
};
