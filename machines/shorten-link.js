module.exports = {


  friendlyName: 'Shorten link',


  description: 'Generate a bitly URL',


  extendedDescription: 'Given a long URL, create a shortened link using the bitly API.',


  inputs: {

    clientId: {
      description: 'Your bitly OAuth client ID',
      friendlyName: 'Client ID',
      example: 'xyz123abcxxx',
      required: true
    },

    clientSecret: {
      description: 'Your bitly OAuth client secret',
      friendlyName: 'Client Secret',
      example: 'xyz123abcxxx',
      required: true
    },

    accessToken: {
      description: 'Your bitly OAuth access token',
      friendlyName: 'Access Token',
      example: 'xyz123abcxxx',
      required: true
    },

    url: {
      description: 'The URL to shorten',
      friendlyName: 'URL',
      example: 'http://www.somereallylongurl.com/man/that/is/long.html',
      required: true
    }

  },


  defaultExit: 'success',


  exits: {

    error: {
      description: 'Unexpected error occurred.',
    },

    success: {
      description: 'Done.',
      example: 'http://bit.ly/abc123'
    },

  },


  fn: function (inputs,exits) {
    var BitlyAPI = require("node-bitlyapi");
    var Bitly = new BitlyAPI({
        client_id: inputs.clientId,
        client_secret: inputs.clientSecret,
    });
    Bitly.setAccessToken(inputs.accessToken);
    Bitly.shorten({longUrl:inputs.url}, function(err, json) {
      try {
        var results = JSON.parse(json);
        if (results.status_code != 200) {return exits.error(results);}
        if (!results.data || !results.data.url) {return exits.error(results);}
        return exits.success(results.data.url.trim());
      } catch (e) {
        return exits.error(e);
      }
    });

  },



};
