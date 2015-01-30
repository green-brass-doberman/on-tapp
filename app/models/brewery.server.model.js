'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Location Child Schema
 */
var LocationSchema = new Schema({
  locId: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: '',
    trim: true
  },
  streetAddr: {
    type: String,
    default: '',
    trim: true    
  },
  locality: {
    type: String,
    default: '',
    trim: true    
  },
  region: {
    type: String,
    default: '',
    trim: true    
  },
  postalCode: {
    type: String,
    default: '',
    trim: true    
  },
  phone: {
    type: String,
    default: '',
    trim: true    
  },
  website: {
    type: String,
    default: '',
    trim: true
  },
  hours: {
    type: String,
    default: '',
    trim: true
  },
  locationType: {
    type: String,
    default: '',
    trim: true
  },
  yearOpened: {
    type: String,
    default: '',
    trim: true
  },
  status: {
    type: String,
    default: '',
    trim: true
  },
  images: {
    icon: {
      type: String,
      default: '',
      trim: true
    },
    medium: {
      type: String,
      default: '',
      trim: true
    },
    large: {
      type: String,
      default: '',
      trim: true
    }
  },
});

/**
 * Social Media Child Schema
 */
var SocialMediaSchema = new Schema({
  smId: {
    type: String,
    default: ''
  },
  handle: {
    type: String,
    default: '',
    trim: true
  },
  link: {
    type: String,
    default: '',
    trim: true
  },
  smName: {
    type: String,
    default: '',
    trim: true
  }
});

/**
 * Guild Child Schema
 */
var GuildSchema = new Schema({
  guildId: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: '',
    trim: true
  },
  desc: {
    type: String,
    default: '',
    trim: true    
  },
  website: {
    type: String,
    default: '',
    trim: true
  },
  established: {
    type: String,
    default: '',
    trim: true
  },
  status: {
    type: String,
    default: '',
    trim: true
  },
  images: {
    icon: {
      type: String,
      default: '',
      trim: true
    },
    medium: {
      type: String,
      default: '',
      trim: true
    },
    large: {
      type: String,
      default: '',
      trim: true
    }
  },
});

/**
 * Brewery Schema
 */
var BrewerySchema = new Schema({
  breweryId: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: '',
    trim: true
  },
  desc: {
    type: String,
    default: '',
    trim: true    
  },
  website: {
    type: String,
    default: '',
    trim: true
  },
  established: {
    type: String,
    default: '',
    trim: true
  },
  isOrganic: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: '',
    trim: true
  },
  images: {
    icon: {
      type: String,
      default: '',
      trim: true
    },
    medium: {
      type: String,
      default: '',
      trim: true
    },
    large: {
      type: String,
      default: '',
      trim: true
    }
  },
  locations: {
    type: [LocationSchema]
  },
  socialAccounts: {
    type: [SocialMediaSchema]
  },
  guilds: {
    type: [GuildSchema]
  }
});

mongoose.model('Brewery', BrewerySchema);