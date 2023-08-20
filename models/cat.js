//This file deals with the db functionalities:
//Double dot is used to indicate that js file for dbConnection is one directory up as cats.js file comes under folder'models'
let db = require('../dbConnection');

function getAllCats(callback){
  //Fetch db collection inside get function
  let collection = db.getCollection();
  collection.find({}).toArray(callback);
  }

function catPost(cat, callback){
  //Fetch db collection inside post function
  let collection = db.getCollection();
  collection.insertOne(cat, callback);
}

//exporting functions for POST & GET
module.exports = {catPost,getAllCats}
  
