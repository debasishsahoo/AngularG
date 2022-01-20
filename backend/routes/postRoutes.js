const express = require("express");
const router = express.Router();
const PostCTRL = require("../controllers/postController");

router.get("/", PostCTRL.getPosts);
router.get("/:id", PostCTRL.getPostById);
router.get("/:time", PostCTRL.getPostBytime);
router.post("/", PostCTRL.createPosts);
router.patch("/:id", PostCTRL.updatePosts);
router.patch("/:id/likepost", PostCTRL.likePosts);
router.delete("/:id", PostCTRL.deletePosts);

module.exports = router;
