'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Rating Schema
 */
var RatingSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Rating name',
		trim: true
	},
  stars: {
    type: Number,
    default: 0
  },
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Rating', RatingSchema);
