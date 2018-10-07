// Initialize Firebase
var access_token="";
var config = {
    apiKey: "AIzaSyBlryrKX-6q-Rx-_xg1-U8IXd-7WkWbN6A",
    authDomain: "anu-bknhvv.firebaseapp.com",
    databaseURL: "https://anu-bknhvv.firebaseio.com",
    projectId: "anu-bknhvv",
    storageBucket: "anu-bknhvv.appspot.com",
    messagingSenderId: "664668571146"
  };
  firebase.initializeApp(config);
var provider = new firebase.auth.GoogleAuthProvider();        

$(document).ready(function(){
  
firebase.auth().onAuthStateChanged(function(user) {
      if (user){
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        uid = user.uid;
        var providerData = user.providerData;
         console.log(user);
}});
    
});
    
function handleSignInClick(){
    firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
        access_token=token;
  var user = result.user;
        console.log(result);
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
        console.log(error);
});
}    
        
function handleSignOutClick(){
    firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
}