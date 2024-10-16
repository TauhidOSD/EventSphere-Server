const Event = require("../../models/Event");
const Order = require("../../models/Order");

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { ObjectId } = require("mongodb");

// All order get korar api
const getAllOrder = async (req, res) => {
  try {
    const allOrder = await Order.find();
    res.status(200).json(allOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get a user all orderd events
const myAllOrder = async (req, res) => {
  const userEmail = req.params.email;
  console.log(userEmail)
  try {
    const query = { bookedUserEmail: userEmail }
    const allOrder = await Order.find(query)
    res.status(200).json(allOrder);
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// refund request
const refundRequest = async (req, res) => {
  const id = req.params.id;
  console.log(id)
  const query = { _id: new ObjectId(id) }
  try {
    const resp = await Order.updateOne(
      query, {
      $set: {
        refundRequested: "Requested"
      }
    }, { upsert: false, runValidators: true })
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// create user
const createPayment = async (req, res) => {
  if (req.method === 'POST') {
      try {
          const { price } = req.body;
          if (!price) {
              return res.status(400).json({ error: "Price is required" });
          }

          const paymentIntent = await stripe.paymentIntents.create({
              amount: parseInt(price * 100), // amount in cents
              currency: 'usd',
              payment_method_types: ['card'],
          });

          res.status(200).json({
              clientSecret: paymentIntent.client_secret,
              success: true,
              message: "Payment intent created successfully",
          });
      } catch (error) {
          console.error("Payment Intent Error:", error.message);
          res.status(500).json({ error: error.message });
      }
  } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
  }
};


 // payment intent
 const createOrder= async (req, res) => {
  const order = req.body;
  const id=req.params.id
  console.log(id)
    console.log(order,"order api");
  
    try {
      const result = await Order.create(order)
      // const seatUpdate = await Event.updateOne(
      //   { _id: new ObjectId(id) },
      //   { $set: { followers: updateFollowArrayCurrentuser } }
      // );
      res.send({
        success: true,
        paymentResult: { insertedId: result._id },
        message: "Order created successfully",
    });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
}

module.exports = { getAllOrder, createOrder,createPayment, myAllOrder, refundRequest };
