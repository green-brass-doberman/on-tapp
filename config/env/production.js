'use strict';

module.exports = {
  db: {
    uri: process.env.CUSTOMCONNSTR_MONGOLAB_URI || 
         'mongodb://MongoLab-i:8Lu9GZSXvdiVCqOTDGRZL7CHOS4XN.FzDpCqHCeTKhc-@ds052827.mongolab.com:52827/MongoLab-i' || 
         'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/mean',
    options: {
      user: '',
      pass: ''
    }
  },
  log: {
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: 'combined',
    // Stream defaults to process.stdout
    // Uncomment to enable logging to a log on the file system
    options: {
      stream: 'access.log'
    }
  },
  assets: {
    lib: {
      css: [
      ],
      js: [
        'public/lib/angular/angular.min.js',
        'public/lib/angular-resource/angular-resource.min.js',
        'public/lib/angular-animate/angular-animate.min.js',
        'public/lib/angular-ui-router/release/angular-ui-router.min.js',
        'public/lib/angular-ui-utils/ui-utils.min.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'public/lib/lodash/dist/lodash.min.js',
        'public/lib/angular-google-maps/dist/angular-google-maps.min.js',
        'public/lib/angularjs-geolocation/src/geolocation.js',
        'public/lib/spin.js/spin.js',
        'public/lib/angular-spinner/angular-spinner.min.js',
        'public/lib/fastclick/lib/fastclick.js'
      ]
    },
    css: 'public/dist/application.min.css',
    js: 'public/dist/application.min.js'
  },
  facebook: {
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: '/auth/facebook/callback'
  },
  twitter: {
    clientID: process.env.TWITTER_KEY,
    clientSecret: process.env.TWITTER_SECRET,
    callbackURL: '/auth/twitter/callback'
  },
  google: {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: '/auth/google/callback'
  },
  mailer: {
    from: process.env.MAILER_FROM || 'ontappapp@gmail.com',
    options: {
      service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
      auth: {
        user: process.env.MAILER_EMAIL_ID,
        pass: process.env.MAILER_PASSWORD
      }
    }
  },
  brewerydb: {
    api: process.env.BREWERYDB_API
  },
  predictionio: {
    eventServerIP: process.env.eventServerIP,
    resultsServerIP: process.env.resultsServerIP,
    api: process.env.PREDICTIONIO_API
  },
  beermapper: {
    api: process.env.BEERMAPPER_API
  }
};
