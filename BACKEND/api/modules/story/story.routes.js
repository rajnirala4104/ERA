const { Router } = require('express');
const { protect } = require('../../middelware/authUser');
const { storyControllersObject } = require('./story.controllers');

const storyRouter = Router();

storyRouter.get('/', protect, storyControllersObject.gettingAllStories);
storyRouter.post('/create', protect, storyControllersObject.createStory);
storyRouter.delete('/delete', protect, storyControllersObject.deleteStory)


module.exports = { storyRouter }