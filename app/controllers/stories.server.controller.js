'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Story = mongoose.model('Story'),
    _ = require('lodash');

/**
 * Create a Story
 */
exports.create = function(req, res) {
    var story = new Story(req.body);

    story.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.status(201).json(story);
        }
    });
};

/**
 * Show the current Story
 */
exports.read = function(req, res) {
	res.json(req.story);
};

/**
 * Update a Story
 */
exports.update = function(req, res) {
	var story = req.story;
 
	story = _.extend(story, req.body);
 
	story.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(story);
		}
	});
};

/**
 * Delete an Story
 */
exports.delete = function(req, res) {
	var story = req.story;
 
	story.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(story);
		}
	});
};

/**
 * List of Stories
 */
exports.list = function(req, res) {
    Story.find().exec(function(err, stories) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(stories);
        }
    });
};

/**
 * Story middleware
 */
exports.storyByID = function(req, res, next, id) {
 
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Story is invalid'
		});
	}
 
	Story.findById(id).exec(function(err, story) {
		if (err) return next(err);
		if (!story) {
			return res.status(404).send({
  				message: 'Story not found'
  			});
		}
		req.story = story;
		next();
	});
};