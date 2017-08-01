window.onload= function(){
    if(readCookie("username") == ''|| document.cookie==''){
        window.location.href='/login';
}
}



function addinfo(){
    // get the credentials from the cookie
    var id = readCookie("hasura_id");
    var auth_token = readCookie("auth_token");
    var name1 = document.getElementById("name").value;
    var mback1 = document.getElementById("mback").value;
    var jonre1 = document.getElementById("jonre").value;
    var ph1 = document.getElementById("ph").value;
    var add1 = document.getElementById("add").value;
    var req1 = document.getElementById("req").value;
    var purp1 = document.getElementById("purp").value;
    
    if(name1==''||mback1==''||jonre1==''||ph1==''||add1==''||req1==''||purp1==''){
        alert("All fields are mandatory!");
        return;
    }
    
    var request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    if(request.readyState === XMLHttpRequest.DONE){
      if(request.status === 200){
        alert('Profile updated successfully!We shall contact you soon.....');
        window.location.href="/";
          
      }else if(request.status === 500){
        alert('something went wrong on the server!');
      }
    }
  };
  request.open('POST', 'http://data.c100.hasura.me/v1/query',false);
  request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer '+ auth_token);
  request.send(JSON.stringify({type: "insert",args: {table: "profile", objects: [{profile_id:id,name:name1,musi_back:mback1,ur_req:jonre1,contact:ph1,address:add1,sp_req:req1,pur_find:purp1}]}}));
}
               

function logout(){
    document.cookie = "username=; path=/";
    document.cookie = "auth_token=;path=/";
    document.cookie = "hasura_id=;path=/";
    window.location.href ='/login';
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