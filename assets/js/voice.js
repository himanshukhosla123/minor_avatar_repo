var baseUrl = "https://myvoice.lyrebird.ai";
var basrUrlAvatar="https://avatar.lyrebird.ai"
var clientId = "1CCXLFRGtX1UArRYz9cCOH5OYOK";
var clientSecret = "$2a$10$RavlUyxmZ1D4vEdfzS1k0uBksTKTRTv78tOw3fldQEsTD42pTqlZG";
var encodedUrl="https%3A%2F%2Fhimanshukhosla123.github.io%2Fminor_avatar_repo%2F";
var token=localStorage.getItem("acs");
var code="9818478695";

function voiceAuth(){
    if(!token){
      getToken();
    }
    else{
        generate("Hi Himanshu Khosla");
    }
}

$(document).ready(function(){
    console.log(localStorage.getItem("acs"));
    var tokenDetected=extractAccessToken(location.href);
    console.log(tokenDetected);
    if(tokenDetected)
    {
        localStorage.setItem("acs",tokenDetected);
        token=tokenDetected;
        generate("Hi Himanshu Khosla");
        getGenerated();
    }
    else {
        getToken();
    }
});

function extractAccessToken(url){
    try{
    return url.split("access_token=")[1].split("&")[0];
    }
    catch(e){
        return null;
    }
}

function getToken() {
window.location.href="https://myvoice.lyrebird.ai/authorize?response_type=token&client_id="+clientId+"&redirect_uri="+encodedUrl+"&scope=voice&state="+code; 
}


function generate(text) {
         $.ajax({
            method: 'post',
            url: `https://avatar.lyrebird.ai/api/v0/generate`,
            headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
            data: {
                text: text
            }
        }).done(function(response){
             console.log(response)
         })
        .fail(function(error){
             console.log(error)
         })
}

function getGenerated() {
        $.ajax({
            method: 'get',
            url: `https://avatar.lyrebird.ai/api/v0/generated`,
            headers: { 'Authorization': 'Bearer ' + token }
        }).done(function(response){
            console.log(response.data.results)
        })
        .fail(function(error){
            console.log(error)
        })
}