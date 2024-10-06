const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require('cors');
const port = process.env.PORT || 5000;


const eventRoute = require( "./routes/events/event.route.js" );
const userRoute = require( "./routes/user/user.route.js" );
const orderRoute = require( "./routes/order/order.route.js" );


// middleware
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",  "http://localhost:3001",
    ],
    credentials: true,
  })
);

// application route

app.use('/events',eventRoute);
app.use('/',userRoute);
app.use('/',orderRoute);

//database connection with mongoose  
// mongodb+srv://<db_username>:<db_password>
const uri=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qnwtz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose
  .connect(uri,{dbName:process.env.DB_NAME})
  .then(console.log(`connected to mongodb database with mongoose`))
  .catch((err) => console.error(err));



// Home route
app.get("/", (req, res) => {
  res.send("Event Sphare app Home");
});
// health route
app.get("/health", (req, res) => {
  res.status(200).send({ health: "Health is Good" });
});

// send message to browser
app.get("/", (req, res) => {
  res.send("Welcome to Event Sphare app!");
});

// all method and all route
app.all('*', (req,res, next) => {
  // console.log('all');
  res.status(404).send({
      message : "Page not founded 404",
  })
})


// listennig server connection on local pc
app.listen(port, () => {
  console.log(`Event Sphare app listening on port ${port}`);
});



// port



