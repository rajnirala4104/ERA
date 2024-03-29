const { Router } = require("express");
const { protect } = require("../../middelware/authUser");
const { commentControllers } = require("./comment.controllers");

// Comment Router
const commentRouter = Router();

// all comment's endpoint
commentRouter.get("/", protect, commentControllers.getAllTheComments);
commentRouter.get(
   "/:postId",
   protect,
   commentControllers.getAllTheCommentsOfSinglePost
);
commentRouter.post("/", protect, commentControllers.createComment);
commentRouter.post("/update", protect, commentControllers.updateComment);
commentRouter.delete("/:id", protect, commentControllers.deleteComment);

module.exports = { commentRouter };
