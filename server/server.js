const express = require('express');
const app = express();
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const createRouter = require('./helpers/create_router.js');

app.use(parser.json());
app.use(cors());

//connect takes one argument, the location and port number of mongoDB
//27017 is the default place that mongo runs in
//this is  promise from MongoDb so we can run then and catch. 
//no semicolons because these lines are all chained
MongoClient.connect('mongodb://localhost:27017')
  .then((client)=> {
    const db = client.db('games_hub');
    const gamesCollection= db.collection('games');
    //this passes our collection of JS objects to router
    const gamesRouter= createRouter(gamesCollection);
    app.use('/api/games', gamesRouter);
  })
    .catch(console.error);

app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
