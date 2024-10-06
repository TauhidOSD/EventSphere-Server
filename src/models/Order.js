const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  eventImage: {
    type: String,  
  },
  eventName: {
    type: String,
    required: true
  },
  eventPlace: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Rejected'],  
    default: 'Pending'
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  refund: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'No'
  },
  orderdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;