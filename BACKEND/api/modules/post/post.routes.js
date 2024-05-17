const { Router } = require("express");
const { postControllers } = require("./post.controllers");
const { protect } = require("../../middelware/authUser");

// post router
const postRouter = Router();

// post endpoints
postRouter.get("/", protect, postControllers.getAllPost);
postRouter.get("/:id", protect, postControllers.getSinglePost);
postRouter.get(
   "/posts/:userId",
   protect,
   postControllers.getAllThePostOfAPerticulerUser
);
postRouter.post("/create", protect, postControllers.createPost);
postRouter.put("/update/:id", protect, postControllers.updatePost);
postRouter.delete("/delete/:id", protect, postControllers.deletePost);

// exporting the router
module.exports = { postRouter };
