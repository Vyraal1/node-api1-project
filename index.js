// implement your API here
const express = require("express");
const users = require("./data/db");
const server = express();

server.get("/", (req, res) => {
  res.status(200).send("You made it to the server.");
});

server.get("/api/users", (req, res) => {
  console.log(req.body);
  users
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
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
      .catch(() => {
        res.status(500).json({
          errorMsg: "There was an error while saving the user to the database"
        });
      });
  } else {
    //if not do what the readme says
    res
      .status(400)
      .json({ errorMsg: "Please provide name and bio for the user." });
  }
});

//getting users by their ID
server.get(`api/users/:id`, (req, res) => {
  // assuming I didn't have videos or TK to lean on
  // where tf are the id's in the request?
  console.log(req.params);
  users
    .findById(req.params.id)
    .then(user => {
      //return the user that was found
      if (user) {
        res.status(200).json(user);
      } else {
        //if not found, user should be an empty array, resolving to false
        res
          .status(404)
          .json({ errorMsg: "The user information could not be retrieved." });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ errorMsg: "The user information could not be retrieved." });
    });
});

server.delete(`/api/users/:id`, (res, req) => {
  users.remove(req.params.id).then(numDeleted => {
    //if no users are found, 0 should resolve to false
    if (numDeleted) {
      res
        .status(200)
        .json({ message: `Successfully deleted ${numDeleted} users.` });
    } else {
      //if the user cannot be found
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  });
});

server.listen(8000, () => {
  console.log("API running on port 8000");
});
