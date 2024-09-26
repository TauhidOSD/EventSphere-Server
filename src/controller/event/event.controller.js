const Event = require("../../models/Event");

const getAllEvent = async (req, res) => {
    try {
      const allEvent = await Event.find();
      res.status(200).json(allEvent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
  const getSingleEvent = async (req, res, next) => {
    try {
  
      const query = { _id: req.params.id };
      console.log(query);
      const result = await Event.findOne(query);
  
      res.send(result);
  
    } catch (err) {
      next(err);
    }
  }
  // create user
  const createEvent = async (req, res) => {

    const event = req.body;
    try {
    
      await Event.create(event)
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
  module.exports = { getAllEvent,createEvent};