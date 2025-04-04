// Page créé par Pierre et Thibault
const jwt = require("jsonwebtoken");
const { Reaction } = require("./../model/reaction.model.js");
const Post = require("./../model/post.model.js");

// Import des types de réaction possible
require("dotenv").config();

// Function permettant de récupérer la réaction d'un post
async function getPostReaction(req) {
  const post = await Post.findOne({ _id: req.params.id });
  if (!post) {
    throw { status: 404, message: "Post non trouvé" };
  }

  const reaction = await Reaction.findOne({
    postId: req.params.id,
    userId: req.token._id,
    type: req.body.type,
  });

  return reaction;
}

exports.getPostReaction = async (req, res) => {
  try {
    const reaction = await getPostReaction(req);
    if (!reaction) {
      return res.status(404).json({ error: "Réaction non trouvée" });
    }
    return res.status(200).json(reaction);
  } catch (e) {
    const status = e.status || 500;
    const message = e.message || "Erreur inconnue";
    return res.status(status).json({ error: message });
  }
};

// Fonction de création d'un post avec le postId, userId et type de réaction
exports.createPostReaction = async (req, res) => {
  try {
    let reaction = await getPostReaction(req);
    if (reaction) {
      return res
        .status(400)
        .json({ error: "Vous avez déjà réagi avec cette réaction à ce post" });
    }

    reaction = await Reaction.create({
      postId: req.params.id,
      userId: req.token._id,
      type: req.body.type,
    });

    return res.status(201).json(reaction);
  } catch (e) {
    const status = e.status || 500;
    const message = e.message || "Erreur inconnue";
    return res.status(status).json({ error: message });
  }
};

exports.deletePostReaction = async (req, res) => {
  try {
    let reaction = getPostReaction(req);

    if (!reaction) {
      return res.status(400).json({
        error: "Vous n'avez pas encore réagi avec cette réaction à ce post",
      });
    }

    reaction = await Reaction.deleteOne({
      postId: req.params.id,
      userId: req.token._id,
      type: req.body.type,
    });

    return res.status(200).json({ message: "Réaction supprimée" });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};
