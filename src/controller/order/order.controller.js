const Order = require("../../models/Order");


const getAllOrder = async (req, res) => {
  try {
    const allOrder = await Order.find().populate('orderdBy');
    res.status(200).json(allOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get order by gmail
const getOrderById = async (req, res) => {
  try {
    const gmail = req.params.gmail
    const orders = await Order.find({eventOrganizerEmail: gmail})
    if (orders) {
      res.status(200).send(orders);
    }
    else{
      res.status(404).send({message: "Booking Data Not Found"})
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create user
const createOrder = async (req, res) => {
  const order = req.body;
  console.log(order);
  
  try {
    await Order.create(order);
    res.send({
      success: true,
      message: "Created successful",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { getAllOrder, createOrder, getOrderById};
