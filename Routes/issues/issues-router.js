const router = require("express").Router();
const Issue = require("./issues-model");

function bodycheck(req, res, next) {
  if (req.body) {
    next();
  } else {
    res.status(400).json({ Message: "Please Fill in all the required fields" });
  }
}

// Creates a new issue returns the id currently
router.post("/new", bodycheck, (req, res) => {
  const issue = req.body;
  Issue.add(issue)
    .then((resp) => {
      res.status(201).json({ Created: resp });
    })
    .catch((err) => {
      res.status(500).json({ Message: err.message });
    });
});

//This returns all the issues that have been posted
router.get("/public", (req, res) => {
  Issue.getPublic()
    .then((resp) => {
      res.status(200).json({ data: resp });
    })
    .catch((err) => {
      res.status(500).json({ Message: "Server failed to get public issues" });
    });
});

//This returns a users issues that he or she have posted
router.get("/private/:id", (req, res) => {
  Issue.getPrivate(req.params.id)
    .then((resp) => {
      res.status(200).json({ data: resp });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ Message: "Server failed to get your issue posts" });
    });
});
// this gets a users post by its id 
router.get("/private/post/:id", (req, res) => {
  Issue.getIssueById(req.params.id)
    .then((resp) => {
      res.status(200).json({ Issue: resp });
    })
    .catch((err) => {
      res.status(500).json({ Message: err.message,post: req.params  });
    });
});
//this deletes issue post
router.delete("/private/post/:id", (req, res) => {
  Issue.remove(req.params.id)
    .then((resp) => {
      res.status(200).json({ Removed: resp, });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
