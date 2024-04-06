const { Router } = require('express');
const { protect } = require('../../middelware/authUser');
const { storyControllersObject } = require('./story.controllers');

//story router
const storyRouter = Router();

// endpoints
storyRouter.get('/', protect, storyControllersObject.gettingAllStories);
storyRouter.post('/create', protect, storyControllersObject.createStory);
storyRouter.delete('/delete', protect, storyControllersObject.deleteStory)

//exporting the router
module.exports = { storyRouter }