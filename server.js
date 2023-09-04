//import the express library
let express = require('express');
//initialize an express application
let app = express();
//set the server port. Initially, it tries to use the PORT environment variable value,but if it doesn't exist/undefined, it uses 3000 by default as the port
let port = process.env.PORT || 3000;
let db = require('./dbConnection');
let router = require('./routers/router');
//const {Socket} = require('socket.io');
let http = require('http').createServer(app);
let io = require('socket.io')(http); 

//by using the current directory, static files (like HTML, CSS, images)are served; this directory is root to location of our project
app.use(express.static(__dirname + '/'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//server is referencing the router
app.use('/', router);

io.on('connection', (socket)=>{
  console.log('a client has connected');
  socket.on('disconnect', ()=>{
    console.log('a client has disconnected');
  });
  setInterval(()=>{
    // emit method is to send out the message, where 1st parameter is identifier and second parameter is a package
    socket.emit('num', parseInt(Math.random()*10)); 
  }, 1000); // measured in ms
  
});

// //start the server when db is connected
// db.connect().then(()=>{
//   app.listen(port, () => {
//     console.log('server started');
//   });
// }).catch(err => {
//   console.error("Failed to connect to the database:", err);
// });

http.listen(port, ()=>{
  console.log('server starts');
});


