const Order = require("../../models/Order");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const getAllOrder = async (req, res) => {
  try {
    const allOrder = await Order.find().populate('orderdBy');
    res.status(200).json(allOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// create user
const createOrder = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { price, order } = req.body; 
      const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(price * 100), // amount in cents
        currency: 'usd',
        payment_method_types: ['card']
      });

      await Order.create(order);

      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
        success: true,
        message: "Order created successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};


module.exports = { getAllOrder, createOrder };
