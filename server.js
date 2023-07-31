//// Import the express library
let express = require('express');

// // Initialize an express application
let app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Set the server port. First, it tries to use the PORT environment variable value, 
// but if it doesn't exist (undefined), it uses 3000 as a default port
let port = process.env.PORT || 3000;

// Serve static files (like HTML, CSS, images) from the current directory
app.use(express.static(__dirname + '/'));

// Handle GET requests to the server root ('/') by rendering 'index.html'
// (this assumes that a view engine is set up)
app.get('/', (req, res) => {
    res.render('index.html');
});

app.listen(port, () => {
    console.log('server started');
});