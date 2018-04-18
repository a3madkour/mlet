var exec = require('child_process').exec, child;
var request = require('request');
var baseUrl = 'localhost:8081'
child = exec('mongo mlet --eval "db.dropDatabase()"',
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });
child = exec('mongorestore -d mlet startUpDump/',
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });
