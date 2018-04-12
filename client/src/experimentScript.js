var exec = require('child_process').exec, child;
var request = require('request');
var baseUrl = 'localhost:8081'
var asda=""
 function addUser(postData,context){
            var clientServerOptions = {
                uri: 'http://'+baseUrl+''+context,
                body: JSON.stringify(postData),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            request(clientServerOptions, function (error, response) {
                // console.log(error,response.body);
              
                return;
            });
        }
 function getUser(postData,context,userName){
            var clientServerOptions = {
                uri: 'http://'+baseUrl+''+context+'?user_name='+userName,
                body: JSON.stringify(postData),
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            request(clientServerOptions, function (error, response) {
                console.log(error,response.body);
                stuff = JSON.parse(response.body)
                asda = stuff.users._id 
                name = stuff.users.name 
                getProject({},"projects",asda,name)
                return ;
            });
        }
 function getProject(postData,context,user_id,user_name){
   var aaaa = "sada";
            var clientServerOptions = {
                uri: 'http://'+baseUrl+''+context+'?project_name=MINST Classification',
                body: JSON.stringify(postData),
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            request(clientServerOptions, function (error, response) {
                console.log(error,response.body);
                stuff = JSON.parse(response.body)
                asda = stuff.projects._id 
                project_name = stuff.projects.name 
                users = stuff.projects.users
                if(typeof users === "undefined"){
                  users = []
                }
                users.push({name : user_name, _id:user_id})
                projects = [{name: project_name , _id:asda}]
              aaaa = asda;
                // putProject({users},"projects",asda)
                // putUser({projects},"users",user_id)
                return;
            });
   console.log(aaaa);
        }
 function putProject(postData,context,id){
            var clientServerOptions = {
                uri: 'http://'+baseUrl+''+context+'/'+id,
                body: JSON.stringify(postData),
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            request(clientServerOptions, function (error, response) {
                console.log(error)
                console.log(error,response.body);
                return;
            });
        }
 function putUser(postData,context,id){
            var clientServerOptions = {
                uri: 'http://'+baseUrl+''+context+'/'+id,
                body: JSON.stringify(postData),
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            request(clientServerOptions, function (error, response) {
                console.log(error,response.body);
                return;
            });
        }

addUser({name : "Colin", password: "Iamarealgoodboi",_id:"2"}, "/users")
// addUser({name : "Jack", password: "Iamarealrealgoodboi"}, "/users")
// addUser({name : "Jill", password: "Iamarealrealrealgoodboi"}, "/users")
// addUser({name : "MINST Classification", owner: "Colin", description:"Enter Stuff here", date_of_creation:"April 1 1801",users:[]}, "/projects")
// getProject({},"/projects","","")
// getUser({},"/users","Colin")
