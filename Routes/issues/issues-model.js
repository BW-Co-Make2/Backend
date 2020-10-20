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
  return db("issue");
}
// This adds an issue
function add(issue) {
  return db("issue").insert(issue);
}

///NEED TO ADD FUNCTIONALITY WHERE USER CAN ONLY EDIT THIER OWN
/// ISSUES THAT THEY CREATED IF THEY DIDNT CREATE IT THEY CAN NOT 
//  DELETE OR EDIT IT
 

// need to find a way to get a specific mosts id probably find by id then remove
function remove(id) {
  return db("issue").where({ "issue.id": id }).delete();
}


// This will update a issue
function update() {}
