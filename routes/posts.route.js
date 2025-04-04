const express = require("express");
const router = express.Router();
const postController = require("../controller/post.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");
const upload = require("../middleware/multer.middleware.js");

router.post("/", authMiddleware("Member"), upload, postController.create);
router.get("/:offset/:limit", postController.getAll);
router.put("/:id", authMiddleware("Member"), upload, postController.update);
router.delete("/:id", authMiddleware("Member"), postController.delete);

module.exports = router;
