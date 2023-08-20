//collection data can be used only when cat js file can be accessed
let collection = require('../models/cat');

//post fn operation performed in the back-end and response is sent back
const catPost = (req, res)=> {
    let cat = req.body;
    collection.catPost(cat, (err, result)=>{
        if(!err){
          res.json({statusCode:201, data:result, message:'success'});
        }
        else {
          res.json({ statusCode: 500, message: 'Internal server error' });
        }
    });
}

//get fn operation performed in the back-end and response is sent back
const getAllCats = (req, res)=> {
    collection.getAllCats((err, result)=> {
        if(!err){
          res.json({statusCode:200, data:result, message:'get all cats success'});
        }
        else {
          res.json({ statusCode: 500, message: 'Internal server error' });
        }
      });
}

module.exports = {catPost, getAllCats}