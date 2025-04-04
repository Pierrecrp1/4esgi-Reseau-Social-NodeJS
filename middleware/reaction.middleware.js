const { ReactionType } = require("./../model/reaction.model");

// vérification de la validité des données (postId, userId et type de réaction)
module.exports = function validateReaction(req, res, next) {
  if (!req.params.id)
    return res.status(400).json({ error: "Veuillez spécifier le post" });
  if (!req.token?._id)
    return res.status(401).json({ error: "Veuillez vous connecter" });
  if (req.method !== 'GET' && (!req.body.type || !ReactionType.includes(req.body.type))) {
    return res
      .status(400)
      .json({ error: "Veuillez spécifier un type de réaction valide" });
  }
  next();
};
