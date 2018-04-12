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
                return ;
            });
        }
 function getProject(postData,context,user_id,user_name){
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
                return;
            });
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

addUser({name : "Jack", password: "Iamarealrealgoodboi",projects: [{name : 'MINST Classification', _id:'1'}]}, "/users")
addUser({name : "Jill", password: "Iamarealrealrealgoodboi",projects: [{name : 'MINST Classification', _id:'1'}]}, "/users")
addUser({name : "MINST Classification", owner: "User", description:"Enter Stuff here", date_of_creation:"April 1 1801",users:[{name:'user',_id:'1'}, {name:'Jack',_id:'_2'},{name:'Jill',_id:'3'},{name:'User',_id:'3'}], parameterFile: "epochs,int,100,Number of epochs to train for\nlr,float,0.1,Learning rate\noptimizer,str,sgd,Optimizer to use: (sgd/rms/adam)\nnum_hidden,int,2,Number of hidden layers\nhidden_size,int,32,Number of units in hidden layer"}, "/projects")
experiments  = [
  {
    "name": "Experiment 1",
    "owner": "User",
    "parameterFile": "'Epochs': 100,\n'Learning Rate': 0.1,\n'Optimizer': 'SGD',\n'Num Hidden Layers': 1,\n'Hidden Layer Size': 32,\n'Final Loss': 0.3251,\n'Classification Accuracy': 0.72",
    "status": "Complete",
    "project": "MINST Classification",
    "project_id": "1",
    "start_time": "April 13th 2018, 11:23:12 am"
  },
  {
    "name": "Experiment 2",
    "owner": "Jack",
    "parameterFile": "'Epochs': 200,\n'Learning Rate': 0.1,\n'Optimizer': 'SGD',\n'Num Hidden Layers': 2,\n'Hidden Layer Size': 32,\n'Final Loss': 0.49792,\n'Classification Accuracy': 0.65",
    "status": "Complete",
    "project": "MINST Classification",
    "project_id": "1",
    "start_time": "April 13th 2018, 11:23:12 am"
  },
  {
    "name": "Experiment 3",
    "owner": "Jill",
    "parameterFile": "'Epochs': 100,\n'Learning Rate': 0.01,\n'Optimizer': 'SGD',\n'Num Hidden Layers': 1,\n'Hidden Layer Size': 64,\n'Final Loss': 0.39078,\n'Classification Accuracy': 0.7",
    "status": "Complete",
    "project": "MINST Classification",
    "project_id": "1",
    "start_time": "April 13th 2018, 11:23:12 am"
  },
  {
    "name": "Experiment 4",
    "owner": "User",
    "parameterFile": "'Epochs': 100,\n'Learning Rate': 0.001,\n'Optimizer': 'SGD',\n'Num Hidden Layers': 2,\n'Hidden Layer Size': 32,\n'Final Loss':  0.32343,\n'Classification Accuracy': 0.73",
    "status": "Complete",
    "project": "MINST Classification",
    "project_id": "1",
    "start_time": "April 13th 2018, 11:23:12 am"
  },
  {
    "name": "Experiment 5",
    "owner": "User",
    "parameterFile": "'Epochs': 50,\n'Learning Rate': 0.001,\n'Optimizer': 'SGD',\n'Num Hidden Layers': 2,\n'Hidden Layer Size': 32,\n'Final Loss':  0.28967,\n'Classification Accuracy': 0.78",
    "status": "Complete",
    "project": "MINST Classification",
    "project_id": "1",
    "start_time": "April 13th 2018, 11:23:12 am"
  },
  {
    "name": "Experiment 6",
    "owner": "Jack",
    "parameterFile": "'Epochs': 100,\n'Learning Rate': 0.1,\n'Optimizer': 'RMS',\n'Num Hidden Layers': 2,\n'Hidden Layer Size': 128,\n'Final Loss':  0.2423432,\n'Classification Accuracy': 0.81",
    "status": "Complete",
    "project": "MINST Classification",
    "project_id": "1",
    "start_time": "April 13th 2018, 11:23:12 am"
  },
  {
    "name": "Experiment 7",
    "owner": "Jill",
    "parameterFile": "'Epochs': 200,\n'Learning Rate': 0.01,\n'Optimizer': 'RMS',\n'Num Hidden Layers': 4,\n'Hidden Layer Size': 32,\n'Final Loss':  0.2987532,\n'Classification Accuracy': 0.87",
    "status": "Complete",
    "project": "MINST Classification",
    "project_id": "1",
    "start_time": "April 13th 2018, 11:23:12 am"
  },
  {
    "name": "Experiment 8",
    "owner": "User",
    "parameterFile": "'Epochs': 500,\n'Learning Rate': 0.1,\n'Optimizer': 'ADAM',\n'Num Hidden Layers': 4,\n'Hidden Layer Size': 64,\n'Final Loss':  0.39852,\n'Classification Accuracy': 0.7",
    "status": "Complete",
    "project": "MINST Classification",
    "project_id": "1",
    "start_time": "April 13th 2018, 11:23:12 am"
  },
  {
    "name": "Experiment 9",
    "owner": "Jack",
    "parameterFile": "'Epochs': 100,\n'Learning Rate': 0.1,\n'Optimizer': 'RMS',\n'Num Hidden Layers': 2,\n'Hidden Layer Size': 256,\n'Final Loss':  0.42354,\n'Classification Accuracy': 0.68",
    "status": "Complete",
    "project": "MINST Classification",
    "project_id": "1",
    "start_time": "April 13th 2018, 11:23:12 am"
  },
  {
    "name": "Experiment 10",
    "owner": "Jill",
    "parameterFile": "'Epochs': 1000,\n'Learning Rate': 0.00001,\n'Optimizer': 'SGD',\n'Num Hidden Layers': 1,\n'Hidden Layer Size': 256,\n'Final Loss':  0.542134,\n'Classification Accuracy': 0.57",
    "status": "Complete",
    "project": "MINST Classification",
    "project_id": "1",
    "start_time": "April 13th 2018, 11:23:12 am"
  },
  {
    "name": "Experiment 11",
    "owner": "Jill",
    "parameterFile": "'Epochs': 500,\n'Learning Rate': 0.0001,\n'Optimizer': 'ADAM',\n'Num Hidden Layers': 8,\n'Hidden Layer Size': 32,\n'Final Loss':  0.190423,\n'Classification Accuracy': 0.85",
    "status": "Complete",
    "project": "MINST Classification",
    "project_id": "1",
    "start_time": "April 13th 2018, 11:23:12 am"
  },
  {
    "name": "Experiment 12",
    "owner": "Jill",
    "parameterFile": "'Epochs': 100,\n'Learning Rate': 0.001,\n'Optimizer': 'ADAM',\n'Num Hidden Layers': 8,\n'Hidden Layer Size': 16,\n'Final Loss':  0.24151,\n'Classification Accuracy': 0.79",
    "status": "Complete",
    "project": "MINST Classification",
    "project_id": "1",
    "start_time": "April 13th 2018, 11:23:12 am"
  },
  {
    "name": "Experiment 13",
    "owner": "User",
    "parameterFile": "'Epochs': 100,\n'Learning Rate': 0.01,\n'Optimizer': 'RMS',\n'Num Hidden Layers': 8,\n'Hidden Layer Size': 16,\n'Final Loss':  0.14349,\n'Classification Accuracy': 0.88",
    "status": "Complete",
    "project": "MINST Classification",
    "project_id": "1",
    "start_time": "April 13th 2018, 11:23:12 am"
  },
  {
    "name": "Experiment 14",
    "owner": "Jack",
    "parameterFile": "'Epochs': 200,\n'Learning Rate': 0.1,\n'Optimizer': 'ADAM',\n'Num Hidden Layers': 4,\n'Hidden Layer Size': 8,\n'Final Loss':  0.12458,\n'Classification Accuracy': 0.89",
    "status": "Complete",
    "project": "MINST Classification",
    "project_id": "1",
    "start_time": "April 13th 2018, 11:23:12 am"
  },
  {
    "name": "Experiment 15",
    "owner": "Jill",
    "parameterFile": "'Epochs': 50,\n'Learning Rate': 0.1,\n'Optimizer': 'RMS',\n'Num Hidden Layers': 4,\n'Hidden Layer Size': 8,\n'Final Loss':  0.09874,\n'Classification Accuracy': 0.91",
    "status": "Complete",
    "project": "MINST Classification",
    "project_id": "1",
    "start_time": "April 13th 2018, 11:23:12 am"
  },
  {
    "name": "Experiment 16",
    "owner": "Jill",
    "parameterFile": "'Epochs': 100,\n'Learning Rate': 0.01,\n'Optimizer': 'ADAM',\n'Num Hidden Layers': 4,\n'Hidden Layer Size': 32,\n'Final Loss':  0.08798,\n'Classification Accuracy': 0.92",
    "status": "Complete",
    "project": "MINST Classification",
    "project_id": "1",
    "start_time": "April 13th 2018, 11:23:12 am"
  },
  {
    "name": "Experiment 17",
    "owner": "User",
    "parameterFile": "'Epochs': 200,\n'Learning Rate': 0.001,\n'Optimizer': 'ADAM',\n'Num Hidden Layers': 2,\n'Hidden Layer Size': 64,\n'Final Loss':  0.11423,\n'Classification Accuracy': 0.89",
    "status": "Complete",
    "project": "MINST Classification",
    "project_id": "1",
    "start_time": "April 13th 2018, 11:23:12 am"
  },
  {
    "name": "Experiment 18",
    "owner": "Jack",
    "parameterFile": "'Epochs': 500,\n'Learning Rate': 0.001,\n'Optimizer': 'RMS',\n'Num Hidden Layers': 2,\n'Hidden Layer Size': 64,\n'Final Loss':  0.0553,\n'Classification Accuracy': 0.94",
    "status": "Complete",
    "project": "MINST Classification",
    "project_id": "1",
    "start_time": "April 13th 2018, 11:23:12 am"
  },
  {
    "name": "Experiment 19",
    "owner": "Jill",
    "parameterFile": "'Epochs': 200,\n'Learning Rate': 0.01,\n'Optimizer': 'ADAM',\n'Num Hidden Layers': 4,\n'Hidden Layer Size': 32,\n'Final Loss':   0.032,\n'Classification Accuracy': 0.96",
    "status": "Running",
    "project": "MINST Classification",
    "project_id": "1",
    "start_time": "April 13th 2018, 11:23:12 am"
  }
]
for(var i =0; i< experiments.length;i++){
    addUser(experiments[i], "/experiments")
}
