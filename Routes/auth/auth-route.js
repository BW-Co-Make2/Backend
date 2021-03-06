const router = require("express").Router();
const Users = require("../users/users-model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Secret = require("./Secret");
const { isValid } = require("../users/users-service");

function bodyCheck(req, res, next) {
  const user = req.body;

  if (user.username && user.password) {
    next();
  } else {
    res.status(400).json({ Message: "Please provide a username or password" });
  }
}

router.post("/register", bodyCheck, (req, res) => {
  const user = req.body;

  const hash = bcryptjs.hashSync(user.password, 10);

  user.password = hash;

  Users.add(user)
    .then((resp) => {
      res.status(201).json({ User: resp });
    })
    .catch((err) => {
      res.status(500).json({ Message: err.message });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (isValid(req.body)) {
    Users.findBy({ username: username })
    .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
            const token = getJwt(user);
  
            res.status(200).json({ Welcome: user.username, token: token,});
          } else {
            res.status(401).json({ message: "Invalid credentials" });
          }
        })
    .catch((err) => {
        res
          .status(500)
          .json({ Message: "No such Username", Error: err.message });
      });
  }else {
    res.status(400).json({
      message:
        "Please provide username and password and the password should be alphanumeric",
    });
  }
});

function getJwt(user) {
  const payload = {
    username: user.username,
    id: user.id,
  };
  const secret = Secret.secret;
  const options = {
    expiresIn: "8hrs",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
