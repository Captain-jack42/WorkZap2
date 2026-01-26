const express = require('express');

const http = require('http');
const path = require('path');
const { Server } = require("socket.io");
const body_parser = require('body-parser');
const { Userrouter } = require('./Router/User-Router');
const { Hostrouter } = require('./Router/Host-Router');
const rootdir = require('./utils/pathUtil');
const session = require('express-session');
const mongodbsession = require('connect-mongodb-session')(session);
const errorcontroller = require("./controller/error");
const { mongoConnect } = require('./utils/databaseutil');


// const session = require('express-session');
const app = express();
const server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded());



const store = new mongodbsession({
  uri: `MONGODB_URI`,
  collection: 'sessions'
});


const io = new Server(server);
io.on("connection", (socket) => {
  // console.log("A user connected:", socket.id);
  socket.on("user-message", async (data) => {
    // console.log("New message:", data);
    // Broadcast the message to all connected clients
    io.emit("message", data);
  })
})



app.use(session({
  secret: 'your_secret_key', 
  resave: false,
  saveUninitialized: true,
  store: store,
}));





app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.userType = req.session.userType;
  res.locals.username = req.session.username;
  res.locals.email = req.session.email;
  res.user = req.session.user; 
  next();
})


app.use(Userrouter);
app.use(Hostrouter);


app.use(express.static(path.join(rootdir, 'public')));
app.use(errorcontroller.Error404);



const port = 3001;
mongoConnect(() => {
  server.listen(port, () => {
    console.log(`server Started At: http://localhost:${port}/home`);
  });
})

