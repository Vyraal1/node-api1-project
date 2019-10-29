// implement your API here
const express = require("express");
const users = require("./data/db");
const server = express();

server.get("/", (req, res) => {
  res.status(200).send("You made it to the server.");
});

server.get("/api/users", (req, res) => {
  users
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ err: "The users information could not be retrieved." });
    });
});

server.post("/api/users", (req, res) => {
  //you run the logic inside the post request
  console.log("request body", req.body);
  //check if there is a name or body
  if (req.body.name || req.body.bio) {
    users
      .insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the user to the database"
        });
      });
  } else {
    //if not do what the readme says
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
});

server.listen(8000, () => {
  console.log("API running on port 8000");
});
