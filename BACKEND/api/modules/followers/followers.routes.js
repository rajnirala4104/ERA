const { Router } = require("express");
const { protect } = require("../../middelware/authUser");
const { followersControllersObject } = require("./followers.controller");

// followers router
const followerRouter = Router();

// endpoints
followerRouter.get('/followers', protect, followersControllersObject.getAllFollowJSONObject)
followerRouter.get('/followers/:userId', protect, followersControllersObject.gettingAllTheFollwersOfAPerticularUser);
followerRouter.get('/following/:id', protect, followersControllersObject.gettingAllTheFollowingsOfAPerticularUser);
followerRouter.post('/create', protect, followersControllersObject.createFollower);
followerRouter.delete('/delete', protect, followersControllersObject.removeFollower);
followerRouter.get('/serch', protect, followersControllersObject.searchFolower);

module.exports = { followerRouter }