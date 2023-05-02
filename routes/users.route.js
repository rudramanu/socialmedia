const express = require("express");
const { UserModel } = require("../models/users.model");
const bcrypt = require("bcrypt");

const userRouter = express.Router();
userRouter.post("/register", (req, res) => {
  const { name, email, password, dob, bio } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, encrypted) => {
      if (err) {
        res.send(err);
      } else {
        const user = new UserModel({
          name,
          email,
          password: encrypted,
          dob,
          bio,
        });
        await user.save();
        res.send("user registered");
      }
    });
  } catch (error) {
    res.send("Error while registering", error);
  }
});
userRouter.get("/users", async (req, res) => {
  const users = await UserModel.find();
  res.send(users);
});
userRouter.get("/users/:id/friends", async (req, res) => {
  const id = req.params.id;
  try {
    let friends = await UserModel.findOne({ _id: id });
    res.send(friends.friends);
  } catch (error) {
    res.send("Error while fetching all the friends");
  }
});
userRouter.post("/users/:id/friends", async (req, res) => {
  const id = req.params.id;
  try {
    let friendd = await UserModel.findOne({ email: req.body.email });
    if (friendd) {
      console.log("sdfgh", friendd);
      let user = await UserModel.findByIdAndUpdate(
        { _id: id },
        { $push: { friends: friendd._id } }
      );
      if (user) {
        res.send("user added");
      }
    } else {
      res.send("You have to register first");
    }
  } catch (error) {
    res.send("Error while adding to Friend List");
  }
});
userRouter.patch("/users/:id/friends/:friendId", async (req, res) => {
  const id = req.params.id;
  const friendId = req.params.friendId;
});

module.exports = { userRouter };
