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
// 
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
// monthly-metrics
const monthlyMetrics = async (req, res) =>{
  try {
    const currentYear = new Date().getFullYear();
    
    const eventMetrics = await Event.aggregate([
      {
        $match: {
          updatedAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`)
          }
        }
      },
      {
        $group: {
          _id: { $month: "$updatedAt" },
          totalEvents: { $sum: 1 },
          newOrganizers: { $addToSet: "$organizer.email" }
        }
      },
      {
        $project: {
          month: "$_id",
          totalEvents: 1,
          newOrganizers: { $size: "$newOrganizers" }
        }
      },
      { $sort: { month: 1 } }
    ]);

    const orderMetrics = await Order.aggregate([
      {
        $match: {
          updatedAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`)
          }
        }
      },
      {
        $group: {
          _id: { $month: "$updatedAt" },
          ticketSales: { $sum: "$totalTickets" },
          totalSales: { $sum: "$amount" }
        }
      },
      {
        $project: {
          month: "$_id",
          ticketSales: 1,
          totalSales: 1
        }
      },
      { $sort: { month: 1 } }
    ]);

    // Combine the results
    const monthlyMetrics = Array.from({ length: 12 }, (_, i) => {
      const month = i + 1;
      const eventData = eventMetrics.find(e => e.month === month) || { totalEvents: 0, newOrganizers: 0 };
      const orderData = orderMetrics.find(o => o.month === month) || { ticketSales: 0, totalSales: 0 };
      
      return {
        name: new Date(currentYear, i).toLocaleString('default', { month: 'short' }),
        totalEvents: eventData.totalEvents,
        newOrganizers: eventData.newOrganizers,
        ticketSales: orderData.ticketSales,
        totalSales: orderData.totalSales
      };
    });

    res.json(monthlyMetrics);
  } catch (error) {
    res.status(500).json({ message: "Error fetching monthly metrics", error: error.message });
  }
}
module.exports = { getAllOrder, createOrder, getOrderById, metricsForAdminChart, monthlyMetrics};
