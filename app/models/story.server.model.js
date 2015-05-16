'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Makes sure Story's body is 4 strings in length
 */
function validateBody(v) {
	return v.length === 4;
}

/**
 * Story Schema
 */
var StorySchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	body: {
		type: [String],
		validate: [validateBody, 'Story body must have 4 strings']
	},
	title: {
		type: String,
		required: 'Story must have title'
	}
});

mongoose.model('Story', StorySchema);