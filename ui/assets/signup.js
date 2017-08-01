window.onload = function(){
        if(readCookie("username") != ''&& document.cookie !=''){
        window.location.href='/';
    }
}

/* Take credentials from text fields and on button click a XMLHttpRequest (POST) is created to signup.
    A query is made to database to enter user_id (collected from responseText) and name */

function registerUser(){
    //take credentials from text boxes
    var username = document.getElementById("username").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;
    var serverResponseJSON;
    var id;
    
    //to avoid any error due to database not null violation
    if(username==''||name==''||email==''||pass==''){
       alert("All fields are required!");
        return;
       }
    //make sign up API request
    var request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    if(request.readyState === XMLHttpRequest.DONE){
      if(request.status === 200){
          serverResponseJSON = JSON.parse(request.responseText);
          id = serverResponseJSON.hasura_id;
      }else if(request.status === 400){
        alert('Enter valid email/ password > 10 character!');
      }else if(request.status === 409){
        alert('username already exist!');
      }else if(request.status === 500){
        alert('something went wrong on the server!');
      }
    }
  };
  request.open('POST', 'http://auth.c100.hasura.me/signup',false);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({username: username, password: pass,email: email}));
  alert('Registered Successfully!  You may now proceed to login...');
    //update the id and name in User_Details table
    var request2 = new XMLHttpRequest();
  request2.onreadystatechange = function(){
    if(request2.readyState === XMLHttpRequest.DONE){
      if(request2.status === 200){
        alert('Registered Successfully!');
              //redirect to login page on successful signup
            window.location.href= "/login";
      }else if(request2.status === 500){
        alert('something went wrong on the server!');
      }
    }
  };
  request2.open('POST', 'http://data.c100.hasura.me/v1/query',false);
  request2.setRequestHeader('Content-Type', 'application/json');
  request2.send(JSON.stringify({type: "insert",args: {table: "profile", objects: [{profile_id: id,name: name}]}}));
}


function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}