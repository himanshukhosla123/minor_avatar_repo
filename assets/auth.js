var access_token="";

function handleClientLoad() {
        gapi.load('client:auth2', initClient);
}

var conifg={
            apiKey: 'AIzaSyA5E0XSqyaQsoj2IuAjDIGDbhZCKL5Atqw',
//            discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
            clientId: '727213410009-7s91hsq2089f656b19iik147apeplq9q.apps.googleusercontent.com',
            scope: 'profile'
        };

      function initClient() {
        gapi.client.init(conifg).then(function (response) {
            console.log(response);
          gapi.auth2.getAuthInstance()
              .isSignedIn
              .listen(updateSigninStatus);
            
//            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
      }

      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          makeApiCall();
        }
      }

      function handleSignInClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }

      function handleSignOutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

      function makeApiCall() {
        // Make an API call to the People API, and print the user's given name.
        gapi.client.people.get({
          'resourceName': 'people/me',
          'requestMask.includeField': 'person.names'
        }).then(function(response) {
          console.log('Hello, ' + response.result.names[0].givenName);
        }, function(reason) {
          console.log('Error: ' + reason.result.error.message);
        });
      }