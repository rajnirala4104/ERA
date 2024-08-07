const { Router } = require("express");
const { userControllers } = require("./user.controllers");
const { protect } = require("../../middleware/authUser");
const { upload } = require("../../middleware/multer");

// user router
const userRouter = Router();
//endpoints
userRouter.post(
   "/signup",
   upload.single("profilePic"),
   userControllers.userRegistration
); // ------/api/v1/user/signup
userRouter.post("/login", userControllers.login); // -------- /api/v1/user/login
userRouter.get("/", protect, userControllers.searchUser);
userRouter.get("/all", protect, userControllers.getAllUser);
userRouter.get(
   "/:userId",
   protect,
   userControllers.getAllTheInformationAboutAPerticularUser
);
userRouter.put(
   "/update/:id",
   protect,
   upload.single("profilePic"),
   userControllers.updatedUserInfo
);
userRouter.put("/password", userControllers.updatePassword);

module.exports = { userRouter };
