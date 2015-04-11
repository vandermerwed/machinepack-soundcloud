module.exports = {

  friendlyName: 'Get login URL',
  description: 'Get the URL on SoundCloud that a user should visit to authorize the specified SoundCloud app (i.e. your app).',
  extendedDescription: 'This is the URL where you typically redirect a user in order for them to grant access to your SoundCloud app.',
  cacheable: true,

  inputs: {
    clientId: {
      example: 'abc123jdhs3h4js',
      description: 'The unique identifier for your SoundCloud app. It\'s listed on the application settings page.',
      required: true
    },
    callbackUrl: {
      example: 'http://localhost:1337/auth/soundcloud/callback',
      description: 'The URL in your app where users will be sent after authorization.',
      required: true
    },
    responseType: {
      example: ['code'],
      description: '(code, token_and_code)'
    },
    scope: {
      example: 'non-expiring',
      description: 'Must be `*` or `non-expiring`.'
    },
    display: {
      example: 'popup',
      description: 'Can specify a value of `popup` for mobile optimized screen'
    }
  },

  defaultExit: 'success',
  catchallExit: 'error',

  exits: {
    error: {
      description: 'Triggered when the SoundCloud API returns an error (i.e. a non-2xx status code)'
    },
    success: {
      example: 'https://soundcloud.com/connect?client_id=215798311808508&redirect_uri=http://localhost:1337/auth/soundcloud/callback&response_type=code&scope=non-expiring'
    }
  },

  fn: function (inputs, exits) {

    var util = require('util');
    var url = 'https://soundcloud.com/connect';
    inputs.scope = inputs.scope || [];

    // Generate a semi-random string to use for the state
    var state = (Math.random() + 1).toString(36).substring(7);

    try {
      return exits.success(util.format(
        'https://soundcloud.com/connect?client_id=%s&redirect_uri=%s&response_type=%s&scope=%s&state=%s',
        inputs.clientId, inputs.callbackUrl, inputs.responseType, inputs.scope, state
      ));
    }
    catch(e) {
      return exits.error(e);
    }
  }
};