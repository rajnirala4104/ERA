const { Router } = require("express");
const { protect } = require('../../middleware/authUser');
const { followersControllersObject } = require("./followers.controller");

// followers router
const followerRouter = Router();

// endpoints
followerRouter.get('/followers', protect, followersControllersObject.getAllFollowJSONObject)
followerRouter.get('/followers/:userId', protect, followersControllersObject.gettingAllTheFollwersOfAPerticularUser);
followerRouter.get('/following/:userId', protect, followersControllersObject.gettingAllTheFollowingsOfAPerticularUser);
followerRouter.post('/create', protect, followersControllersObject.createFollower);
followerRouter.delete('/delete/:followedUserId', protect, followersControllersObject.removeFollower);
followerRouter.get('/search', protect, followersControllersObject.searchFolower);

module.exports = { followerRouter }