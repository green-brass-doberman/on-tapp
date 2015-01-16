'use strict';

module.exports = {
  port: 8443,
  db: {
    uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/mean',
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
        'public/lib/bootstrap/dist/css/bootstrap.min.css',
        'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
      ],
      js: [
        'public/lib/angular/angular.min.js',
        'public/lib/angular-resource/angular-resource.min.js',
        'public/lib/angular-animate/angular-animate.min.js',
        'public/lib/angular-ui-router/release/angular-ui-router.min.js',
        'public/lib/angular-ui-utils/ui-utils.min.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js'
      ]
    },
    css: 'public/dist/application.min.css',
    js: 'public/dist/application.min.js'
  },
  facebook: {
    clientID: process.env.FACEBOOK_ID || '968149419880980',
    clientSecret: process.env.FACEBOOK_SECRET || 'fc60727d78e8fcd2e975822c8eef619e',
    callbackURL: 'https://localhost:443/auth/facebook/callback'
  },
  twitter: {
    clientID: process.env.TWITTER_KEY || 'k186DeKdHcNN4Vlk8lB9MmjBW',
    clientSecret: process.env.TWITTER_SECRET || '9V0X34pyjBuixI8bRwuGf639spcOWs91Q1Fb9Iq4qjDPRgsCf7',
    callbackURL: 'https://localhost:443/auth/twitter/callback'
  },
  google: {
    clientID: process.env.GOOGLE_ID || '768801944338-ms3g3ic84auevq51a2t4cld7ept7ffos.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || '5xxSzR-ltreqF7EloyCt9JVC',
    callbackURL: 'https://localhost:443/auth/google/callback'
  },
  mailer: {
    from: process.env.MAILER_FROM || 'MAILER_FROM',
    options: {
      service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
      auth: {
        user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
        pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
      }
    }
  },
  brewerydb: {
    api: '87f92c3b32c0d8e031f828b0d03c2c2a'
  },
  predictionio: {
    api: 'hmQhiIak1jIyaE4haGDSzUBhTd43XKZxkTfTRcyL9MPueUohvQcVdFnAB0smNQb6'
  }
};
