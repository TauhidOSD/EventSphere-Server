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


// module.exports = { getAllOrder, createOrder };
//   const order = req.body;
//   console.log(order);

//   try {
//     await Order.create(order);
//     res.send({
//       success: true,
//       message: "Created successfull",
//     });
//   } catch (error) {
//     res.send({
//       success: false,
//       message: error.message,
//     });
  
// };
module.exports = { getAllOrder, createOrder, myAllOrder, refundRequest };
