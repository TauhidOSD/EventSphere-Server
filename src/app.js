const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

const userRoute = require( "./routes/users/user.route.js" );


// middleware
const app = express();
app.use(express.json());

// application route
app.use("/users", userRoute);

//database connection with mongoose 
const uri=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e0fsll4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose
  .connect(uri,{dbName:process.env.DB_NAME})
  .then(console.log(`connected to mongodb database with mongoose`))
  .catch((err) => console.error(err));



// Home route
app.get("/", (req, res) => {
  res.send("Blog app Home");
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



