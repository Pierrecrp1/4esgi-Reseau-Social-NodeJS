const  { Schema } = require("mongoose");
const mongoose = require("mongoose");

const ReactionType = ["like", "love", "haha", "bouh", "scary"]

const reaction = new Schema({
    userId: { type: String, required:true },
    postId: { type: String, required:true },
    type: { type: String, enum: ReactionType, required:true }
});

const Reaction = mongoose.model("Reaction", reaction, "reaction");

module.exports = { Reaction, ReactionType };
