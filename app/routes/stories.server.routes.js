'use strict';

module.exports = function(app) {
    var stories = require('../../app/controllers/stories.server.controller');
    var users = require('../../app/controllers/users.server.controller');
    app.route('/stories')
        .get(stories.list)
        .post(users.requiresLogin, stories.create);
    app.route('/stories/:storyId')
        .get(stories.read)
        .put(users.requiresLogin, stories.update)
        .delete(users.requiresLogin, stories.delete);

    // Finish by binding the article middleware
    app.param('storyId', stories.storiesById);
};