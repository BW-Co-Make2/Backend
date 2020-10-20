module.exports = {
  find,
  findBy,
  add,
  findById,
};

const db = require("../../data/config");

function find() {
  return db("users_table").select("id", "username").orderBy("id");
}
function findById(id) {
  return db("users_table").where({ id });
}
function findBy(filter) {
  return db("users_table").where(filter);
}

function add(user) {
  return db("users_table")
    .insert(user)
}
