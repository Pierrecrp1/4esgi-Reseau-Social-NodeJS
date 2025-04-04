const express = require("express");
const authMiddleware = require('../middleware/auth.middleware.js');
const validateReaction = require('../middleware/reaction.middleware.js');
const reactionController = require('../controller/reaction.controller.js')
const router = express.Router();

// router.get('/:id', authMiddleware("Member"), validateReaction, reactionController.getPostReaction);
router.post('/:id', authMiddleware("Member"), validateReaction, reactionController.createPostReaction);
router.delete('/:id', authMiddleware("Member"), validateReaction, reactionController.deletePostReaction);


module.exports = router;