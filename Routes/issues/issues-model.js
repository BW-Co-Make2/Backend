module.exports = {
  getPublic,
  getPrivate,
  add,
  remove,
  update,
  getIssueById,
};

const db = require("../../data/config");
//This returns a users issues that he or she have posted
function getPrivate(userid) {
  return db("issue").where({ user_id: userid });
}
function getIssueById(id) {
  return db("issue").where({ "issue.id": id });
}
//This returns all the issues that have been posted
function getPublic() {
  return db("issue").select("title", "description", "location");
}
// This adds an issue
function add(issue) {
  return db("issue").insert(issue);
}

///NEED TO ADD FUNCTIONALITY WHERE USER CAN ONLY EDIT THIER OWN
/// ISSUES THAT THEY CREATED IF THEY DIDNT CREATE IT THEY CAN NOT
//  DELETE OR EDIT IT

//This removes a post issue
function remove(id) {
  return db("issue").where({ "issue.id": id }).delete();
}

// This will update a issue
function update(id, changes) {
  return db("issue").where({ "issue.id": id }).update(changes);
}
