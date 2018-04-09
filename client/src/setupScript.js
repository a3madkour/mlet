var exec = require('child_process').exec, child;
var request = require('request');
var baseUrl = 'localhost:8081'
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
                console.log(error,response.body);
              
                return;
            });
        }

child = exec('mongo mlet --eval "db.dropDatabase()"',
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
        addUser({name : "User", password: "Iamagoodboi"}, "/users")
    });
