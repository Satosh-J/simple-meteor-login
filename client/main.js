import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Router } from 'meteor/iron:router';
import './main.html';

const loggedInVar = new ReactiveVar("not login");

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});


Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'submit form': function (event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    console.log({
      username, password
    })
    if (!(username && password)) return

    // Make an API call to authorize the user
    Meteor.call('authorizeUser', username, password, function (error, result) {
      if (error) {
        console.error(error);
        //Session.set('data', error);
        loggedInVar.set("error");
        // Router.go('/dashboard');
      } else {
        console.log(result);
        if (result.status == 200) {
          loggedInVar.set(JSON.stringify(result.facilities));
        } else {
          loggedInVar.set("failed");
        }
        Router.go('/dashboard');
        // Handle successful login, redirect user, etc.
      }
    });
  }
});

Template.dashboard.helpers({
  data: function () {
    return loggedInVar.get();
  }
});

// Template.hello.events({
//   'click #signin'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);

//     const username = instance.find('#username').value;
//     const password = instance.find('#password').value;

//     const apiUrl = 'http://dev.vertisoft.com:30300/api/rest/v1/authorize'; // Replace with your API endpoint

//     axios.post(apiUrl, {
//         username: username,
//         password: password
//       }
//     )
//     .then(response => {
//       console.log('API response:', response);
//       // Handle the API response here
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });

//     // try {
//     //   const response = HTTP.post(apiUrl, {
//     //     username:  username,  
//     //     password: password
//     //   });
//     //   console.log(response);
//     //   // return response.data; // Return the response data
//     // } catch (error) {
//     //   throw new Meteor.Error('api-error', 'Failed to fetch users');
//     // }


//     const data = "Hello, Dashboard!"; // Replace with the data you want to send
//     Router.go('/dashboard/' + encodeURIComponent(data));
//   },
// });


Router.route('/dashboard', {
  action() {
    this.render('dashboard');
  }
});

// Add more routes if needed

// Define a default route
Router.route('/', function () {
  this.render('hello'); // 'login' is the template name for your login page
});