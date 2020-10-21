const router = require("express").Router();
const Users = require("./users-model");

router.get("/", (req, res) => {
  Users.find()
    .then((resp) => {
      res.status(200).json({ Data: resp });
    })
    .catch((err) => {
      res.status(500).json({ Message: err.message });
    });
});

module.exports = router;
