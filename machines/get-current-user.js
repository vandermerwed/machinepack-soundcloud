module.exports = {

  friendlyName: 'Get current user',
  description: 'Get the SoundCloud profile data for a user by access token.',
  cacheable: true,

  inputs: {
    accessToken: {
      description: 'A valid access token that can be used to access the SoundCloud api.',
      example: 'AQDvCav5zRSafS795TckAerUV53xzgqRyrcfYX2i',
      required: true
    }
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'Unexpected error occurred.'
    },
    success: {
      description: 'Returns the user\'s profile.',
      example: {
        id: 123,
        permalink: "sbahn-sounds",
        username: "Doctor Wilson",
        uri: "http://api.soundcloud.com/comments/32562",
        permalink_url: "http://soundcloud.com/bryan/sbahn-sounds",
        avatar_url: "http://i1.sndcdn.com/avatars-000011353294-n0axp1-large.jpg",
        country: "Germany",
        full_name: "Tom Wilson",
        city: "Berlin",
        description: "Buskers playing in the S-Bahn station in Berlin",
        discogs_name: "myrandomband",
        myspace_name: "myrandomband",
        website: "http://facebook.com/myrandomband",
        website_title: "myrandomband on Facebook",
        online: true,
        track_count: 12,
        playlist_count: 1,
        followers_count: 416,
        followings_count: 174,
        public_favorites_count: 26,
        plan: "Pro Plus",
        private_tracks_count: 63,
        private_playlists_count: 3,
        primary_email_confirmed: true
      }
    }
  },

  fn: function(inputs, exits) {

    var request = require('request');

    request.get({
      url: 'https://api.soundcloud.com/me.json',
      qs: {
        'oauth_token': inputs.accessToken
      },
      json: true,
      headers: {}
    }, function(err, response, body) {
       if (err) {
        return exits.error(err);
      }
      if (response.statusCode > 299 || response.statusCode < 200) {
        return exits.error(response.statusCode);
      }

       // Parse profile data from the response body
        try {
          var data = JSON.parse(body);

          //var accessToken = data.access_token;
          //return exits.success({ token: accessToken });
          return exits.success(data);
        }
        catch (e) {
          return exits.error(e);
        }
    });
  }
};