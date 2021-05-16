const express = require("express");

const router = express.Router();
const { body } = require("express-validator");

const isAuth = require("../middleware/is-auth");
const feedController = require("../controllers/feed");

router.get("/posts", isAuth, feedController.getPosts);

router.post(
  "/posts",
  isAuth,
  [
    body("title").trim().isLength({ min: 5, max: 100 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPosts
);

router.get("/posts/:postId", isAuth, feedController.getPost);

router.put(
  "/posts/:postId",
  isAuth,
  [
    body("title").trim().isLength({ min: 5, max: 100 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.updatePost
);

router.delete("/posts/:postId", isAuth, feedController.deletePost);

module.exports = router;
