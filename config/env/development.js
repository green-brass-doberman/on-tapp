'use strict';

module.exports = {
	db: {
		uri: 'mongodb://localhost/mean-dev',
		options: {
			user: '',
			pass: ''
		}
	},
	log: {
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'dev',
		// Stream defaults to process.stdout
		// Uncomment to enable logging to a log on the file system
		options: {
			//stream: 'access.log'
		}
	},
	app: {
		title: 'OnTapp - Hack Reactor Thesis Project'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '968149419880980',
		clientSecret: process.env.FACEBOOK_SECRET || 'fc60727d78e8fcd2e975822c8eef619e',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'k186DeKdHcNN4Vlk8lB9MmjBW',
		clientSecret: process.env.TWITTER_SECRET || '9V0X34pyjBuixI8bRwuGf639spcOWs91Q1Fb9Iq4qjDPRgsCf7',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '768801944338-ms3g3ic84auevq51a2t4cld7ept7ffos.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || '5xxSzR-ltreqF7EloyCt9JVC',
		callbackURL: '/auth/google/callback'
	},
	// linkedin: {
	// 	clientID: process.env.LINKEDIN_ID || 'APP_ID',
	// 	clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
	// 	callbackURL: '/auth/linkedin/callback'
	// },
	// github: {
	// 	clientID: process.env.GITHUB_ID || 'APP_ID',
	// 	clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
	// 	callbackURL: '/auth/github/callback'
	// },
	mailer: {
		from: process.env.MAILER_FROM || 'ontappapp@gmail.com',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'ontappapp@gmail.com',
				pass: process.env.MAILER_PASSWORD || 'Cs0cs5#BVfrBR5a&ZK@Z'
			}
		}
	}
};
