const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const ReactionType = ["like", "love", "haha", "bouh", "scary"]

const reaction = new Schema({
    userId: { type: String, required },
    postId: { type: String, required },
    type: { type: String, enum: ReactionType, required }
});

const User = mongoose.model("User", user);

module.exports = User;
