const { Router } = require("express");
const { protect } = require("../../middelware/authUser");
const { followersControllersObject } = require("./followers.controller");

const followerRouter = Router();

followerRouter.get('/followers', protect, followersControllersObject.gettingAllTheFollwersOfAPerticularUser);
followerRouter.get('/following', protect, followersControllersObject.gettingAllTheFollowingsOfAPerticularUser);
followerRouter.post('/create', protect, followersControllersObject.createFollower);
followerRouter.delete('/delete', protect, followersControllersObject.removeFollower);
followerRouter.get('/serch', protect, followersControllersObject.searchFolower);

module.exports = { followerRouter }