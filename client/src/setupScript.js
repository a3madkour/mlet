var exec = require('child_process').exec, child;
var request = require('request');

// child = exec('mongo mlet --eval "db.dropDatabase()"',
//     function (error, stdout, stderr) {
//         console.log('stdout: ' + stdout);
//         console.log('stderr: ' + stderr);
//         if (error !== null) {
//              console.log('exec error: ' + error);
//         }
//     });
