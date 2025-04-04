const jwt = require("jsonwebtoken");
const Post = require("./../model/post.model.js");
const Role = require("../model/role.model.js");
require("dotenv").config();

exports.create = async (req, res) => {
  if (!req.body.text || req.body.text === "") {
    return res
      .status(400)
      .json({ message: "Veuillez saisir un texte pour le post" });
  }
  let post = await Post.create({
    text: req.body.text,
    file: req.file.filename,
  });
  Post.save(post)
};

exports.getAll = async (req, res) => {
  let postList = await Post.find()
    .skip(req.params.offset)
    .limit(req.params.limit);
    
  if (!postList) {
    return res.status(404).json({ error: "Posts non trouvés" });
  }
  return res.status(200).json(postList);
};

exports.getById = async (req, res) => {
  let post = await Post.findOne({ _id: req.params.id });
  if (!post) {
    return res.status(404).json({ error: "Post non trouvé" });
  }
  res.status(200).json(post);
};

exports.update = async (req, res) => {
  let post = await Post.findOne({ _id: req.token._id });
  if (!post) {
    return res.status(404).json({ error: "Le post n'existe pas" });
  }
  if (req.body.text) {
    post.text = req.body.text;
  }
  if (req.file) {
    post.picture = "./file/" + req.file.filename;
  }
  try {
    await user.save();
    return res.status(201).json(user);
  } catch (e) {
    return res.status(500).json({ error: "" });
  }
};

exports.delete = async (req, res) => {
  let result = await Post.deleteOne({ _id: req.params.id });
  if (result !== 1) {
    return res.status(404).json({ error: "Post non trouvé" });
  }
  return res.status(200).json({ message: "Post supprimé" });
  
};
