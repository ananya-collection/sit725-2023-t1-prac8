//import the express library
let express = require('express');
//import mongodb using MongpClient
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://s222625051:user00@cluster0.2rxiut4.mongodb.net/?retryWrites=true&w=majority";
//db collection declared
let collection;

//initialize an express application
let app = express();
//set the server port. Initially, it tries to use the PORT environment variable value,but if it doesn't exist/undefined, it uses 3000 by default as the port
let port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//create a MongoClient to set up the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function runDBConnection() {
  try {
    await client.connect();
    collection= client.db().collection('Cat');
    console.log('collection');
    //console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } 
  catch(ex) {
    console.error(ex);
  }

}

//by using the current directory, static files (like HTML, CSS, images)are served
app.use(express.static(__dirname + '/'));

//by rendering the index html file a view engine is set up
app.get('/', (_, res) => {
    res.render('index.html');
});

//get fn in the back-end
app.get('/api/cats', (req,res) => {
  getAllCats((err, result)=> {
    if(!err){
      res.json({statusCode:200, data:result, message:'get all cats success'});
    }
  })
 }
)

//post fn in the back-end
app.post('/api/cat', (req,res)=>{
    let cat = req.body;
    catPost(cat, (err, result)=>{
      if(!err){
        res.json({statusCode:201, data:result, message:'success'});
      }

    });
});

function getAllCats(callback){
  collection.find({}).toArray(callback);
}

function catPost(cat, callback){
    collection.insertOne(cat, callback);
}
app.listen(port, () => {
    console.log('server started');
    runDBConnection().catch(console.dir);
});