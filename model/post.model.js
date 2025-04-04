const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const post = new Schema({
  text: String,
  file: {
    type: String,
    required: false,
  },
});

const Post = mongoose.model("Post", post);

module.exports = Post;
