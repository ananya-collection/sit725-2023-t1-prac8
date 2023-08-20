//This file deals with the routing to the locations which are defined in the server file, whereas logic is routed to the controller file:
//router is a middleware within express; we need to refer express again
let express = require('express');
let router = express.Router();
let controller = require('../controllers/controller');

//routing to get fn logic in controller file
router.get('/api/cats', (req,res) => {
   controller.getAllCats(req, res);
   }
  );
  
  //routing to post fn logic in controller file
  router.post('/api/cat', (req,res)=>{
    controller.catPost(req, res);
  });

//exporting router
  module.exports = router;