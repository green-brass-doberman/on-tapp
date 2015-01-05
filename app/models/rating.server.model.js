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
  beerId: {
    type: String,
    default: '',
  },
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
  styleName: {
    type: String,
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

// assign a function to the "statics" object of our RatingSchema
RatingSchema.statics.findByBeerId = function (beerId, cb) {
  this.find({ beerId: new RegExp(beerId, 'i') }, cb);
};

mongoose.model('Rating', RatingSchema);
