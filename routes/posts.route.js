const express = require("express");
const { PostModel } = require("../models/posts.model");
const { UserModel } = require("../models/users.model");

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const post = await PostModel.find();
  res.send(post);
});
postRouter.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const new_post = new PostModel(payload);
    await new_post.save();
    res.send("Created a post");
  } catch (error) {
    res.send({ message: "Something went wrong while posting" });
  }
});
postRouter.patch("/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const post = await PostModel.find({ _id: id });
  //   console.log(post);
  try {
    await PostModel.findByIdAndUpdate({ _id: id }, payload);
    res.send("post updated");
  } catch (error) {
    res.send("Getting error while updating");
  }
});
postRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const post = await PostModel.find({ _id: id });
  //   console.log(post);
  try {
    await PostModel.findByIdAndRemove({ _id: id });
    res.send("post deleted");
  } catch (error) {
    res.send("Getting error while deleting");
  }
});
postRouter.post("/:id/like", async (req, res) => {
  const id = req.params.id;
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      let post = await PostModel.findByIdAndUpdate(
        { _id: id },
        { $push: { likes: user._id } }
      );
      if (post) {
        res.send("like added");
      }
    } else {
      res.send("You have to register first");
    }
  } catch (error) {
    res.send("Error while adding likes");
  }
});
postRouter.post("/:id/comment", async (req, res) => {
  const id = req.params.id;
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      console.log("hello");
      let post = await PostModel.findByIdAndUpdate(
        { _id: id },
        { $push: { comments: user._id } }
      );
      if (post) {
        res.send("comment added");
      }
    } else {
      res.send("You have to register first");
    }
  } catch (error) {
    res.send("Error while adding comments");
  }
});

module.exports = { postRouter };
