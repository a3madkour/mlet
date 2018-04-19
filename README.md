# MLET

## Setup

### Required software
You will need to install npm to run MLET. You can install npm here: <https://nodejs.org/en/download/>
You will also need to run a MongoDB instance on your computer, you can install MongoDB here: <https://www.mongodb.com/download-center#community>
### Install dependencies
Once you have downloaded node.js/npm, download the repo. In the command line go to the client directory and run the following commands:
```
npm install
npm start
```
At this point you should have a MongoDB instance running at port 27017, instructions on how to do so can be found here: <https://docs.mongodb.com/tutorials/>

In another tab/command prompt go to the server directory and run the same commands: 
```
npm install
npm start
```

The webpage should show up at <http://localhost:8080>


For user testing we use two script found in the client folder: setupScript and experimentScript. If you would like to populate the database with the entries we used for the user testing run the following command in the client folder: 
```
node experimentScript
```

Note: You will need mongorestore for this script to work, refer to the mongodb doc for more details. 
