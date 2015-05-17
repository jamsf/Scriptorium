'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Story = mongoose.model('Story');

/**
 * Globals
 */
var user, story;

/**
 * Unit tests
 */
describe('Story Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			story = new Story({
				// Add model fields
				// ...
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('Save new story', function(done) {
			var story = new Story({
				title: 'The Witch or whatever',
				pageOne: 'example', 
				pageTwo: 'of', 
				pageThree: 'valid',
				pageFour: 'story'
			});

			story.save(function(err, saved) {
				should.not.exist(err);
				done();
			});
		});

		it('throws validation error when story longer than 4 strings', function(done) {
			var story = new Story({
				title: 'The Witch or whatever',
				pageOne: 'example', 
				pageTwo: 'of an invalid',
				pageFour: 'story'
			});

			story.save(function(err, saved) {
				should.exist(err);
				err.errors.body.message.should.equal('Missing contents from page three');
				done();
			});
		});

		it('throws validation error with non-existent title', function(done) {
			var story = new Story({
				pageOne: 'example', 
				pageTwo: 'of', 
				pageThree: 'no',
				pageFour: 'title'
			});

			story.save(function(err, saved) {
				should.exist(err);
				err.errors.title.message.should.equal('Story must have title');
				done();
			});
		});
	});

	afterEach(function(done) { 
		Story.remove().exec();
		User.remove().exec();

		done();
	});
});