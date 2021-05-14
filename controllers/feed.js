exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{ title: "First title", content: "The content is here" }],
  });
};

exports.createPosts = (req, res, next) => {
  const { title, content } = req.body;
  res.status(201).json({
    message: "Post created successfully",
    posts: [{ id: Date.now(), title, content }],
  });
};
