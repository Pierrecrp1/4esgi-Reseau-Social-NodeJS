const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const post = new Schema({
  text: String,
  file: {
    type: String,
    required: false,
  },
  author: String,
});

const Post = mongoose.model("Post", post, "post");

module.exports = Post;
