var PROJECT_ID = 'anu-bknhvv';
     var CLIENT_ID = '727213410009-7s91hsq2089f656b19iik147apeplq9q.apps.googleusercontent.com';
     var API_KEY = 'AIzaSyA5E0XSqyaQsoj2IuAjDIGDbhZCKL5Atqw';
     var SCOPES = 'https://www.googleapis.com/auth/cloud-platform';
var access_token="";
function authorization() {
       gapi.client.setApiKey(API_KEY);
       gapi.auth.authorize({
         client_id: CLIENT_ID,
         scope: SCOPES,
         immediate: false
       }, function(authResult) {
            if (authResult && !authResult.error) {
//              window.alert('Auth was successful!');
                console.log(authResult);
                access_token=authResult.access_token;
            } else {
//              window.alert('Auth was not successful');
            }
          }
       );
}

//$(document).ready(authorization);