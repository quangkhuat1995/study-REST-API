const express = require("express");

const router = express.Router();
const { body } = require("express-validator");

const feedController = require("../controllers/feed");

router.get("/posts", feedController.getPosts);

router.post(
  "/posts",
  [
    body("title").trim().isLength({ min: 5, max: 100 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPosts
);

router.get("/posts/:postId", feedController.getPost);

router.put(
  "/posts/:postId",
  [
    body("title").trim().isLength({ min: 5, max: 100 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.updatePost
);

router.delete("/posts/:postId", feedController.deletePost);

module.exports = router;
