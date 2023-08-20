//This file deals with the db connection only:
//import mongodb using MongpClient
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://s222625051:user00@cluster0.2rxiut4.mongodb.net/?retryWrites=true&w=majority";

//create a MongoClient to set up the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  let collection;

  async function connect() {
    //A new Promise has created a promise object that represents the asynchronus function
    return new Promise(async (resolve, reject) => {
    try {
      await client.connect();
      collection= client.db().collection('Cat');
      console.log('connected to collection');
      //console.log("Pinged your deployment. You successfully connected to MongoDB!");
      resolve(); //when successful
    } 
    catch(ex) {
      console.error(ex);
      reject(ex); //when error
    }
   });
  }

function getCollection() {
    return collection;
}

//for exporting the client so that it can be used in some other part of this application
module.exports = {connect, getCollection};

