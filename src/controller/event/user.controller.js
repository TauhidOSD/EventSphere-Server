const User = require("../../models/User");

const getSingleUser = async (req, res) => {
    try {

      const query = { 
        email: req.params.email };
      console.log(query);
      const result = await User.findOne(query);
  
      res.send(result);
  
    } catch (err) {
      next(err);
    }
  }
  // create user
 // create user
 const createUser = async (req, res) => {

    const user = req.body;
    try {
    
      await User.create(user)
      res.send({
        success: true,
        message: "Created successfull",
      })
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      })
    }
  };
  module.exports = { getSingleUser,createUser}; 