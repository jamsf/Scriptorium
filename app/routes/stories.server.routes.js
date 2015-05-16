'use strict';

module.exports = function(app) {
	var stories = require('../../app/controllers/stories.server.controller');
	app.route('/stories')
		.get(stories.list)
		.post(stories.create);
	app.route('/stories/:storyId')
		.get(stories.read)
		.put(stories.update)
		.delete(stories.delete);
};