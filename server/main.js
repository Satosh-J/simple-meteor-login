import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  authorizeUser: function(username, password) {
    // Make an HTTP POST request to the authorize API endpoint
    const response = HTTP.post('http://dev.vertisoft.com:30300/api/rest/v1/authorize', {
      data: {
        userName: username,
        password: password
      }
    });

    return response.data;
  }
});