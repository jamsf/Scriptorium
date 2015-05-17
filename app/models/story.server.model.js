'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Story Schema
 */
var StorySchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	pageOne: {
		type: String,
		required: 'Missing contents from page one'
	},
	pageTwo: {
		type: String,
		required: 'Missing contents from page two'
	},
	pageThree: {
		type: String,
		required: 'Missing contents from page three'
	},
	pageFour: {
		type: String,
		required: 'Missing contents from page four'
	},
	title: {
		type: String,
		required: 'Story must have a title'
	}
});

mongoose.model('Story', StorySchema);