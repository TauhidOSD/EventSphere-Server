const Order = require("../../models/Order");
const Event = require("../../models/Event");


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

const metricsForAdminChart = async (req, res) =>{
  try {
    const events = await Event.find({});
    const orders = await Order.find({});
    
    const metrics = {
      totalEvents: events.length,
      totalSales: orders.reduce((acc, order) => acc + order.amount, 0),
      totalTickets: orders.reduce((acc, order) => acc + order?.totalTickets, 0),
      newOrganizers: 5 // Example static data or calculate from your data
    };
    
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
module.exports = { getAllOrder, createOrder, getOrderById, metricsForAdminChart};
