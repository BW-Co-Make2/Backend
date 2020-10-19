module.exports = {
  find,
  findBy,
  add,
  findById,
};

const db = require("../../data/config");

function add(user) {
  return db("users_table").insert(user);
}

function find() {
  return db("users_table").select( "id","username").orderBy('id');
}
function findById(id) {
  return db("users_table").where({ id }).first();
}
function findBy(filter) {
  return db("users_table").where(filter);
}
