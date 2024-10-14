const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  eventImage: {
    type: String,
  },
  eventName: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  eventOrganizerEmail: {
    type: String,
    required: true,
  },
  eventOrganizerName: {
    type: String,
    required: true,
  },
  eventOrganizerPhoto: {
    type: String,
    required: true,
  },
  bookedUserName: {
    type: String,
    required: true,
  },
  bookedUserPhoto: {
    type: String,
    required: true,
  },
  bookedUserEmail: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  totalTickets: {
    type: Number,
    required: true,
  },
  transitionId: {
    type: Number,
    required: true,
  },
  eventDate: {
    type: Date,  // Changed from String to Date
    required: true,
  },
  refundRequested: {
    type: String,
    enum: ['Requested', 'NotRequested'],  // Adjusted to make sense for a refund request
    default: 'NotRequested',
  },
},
{ timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;



// eventImage: {
//   type: String,  
// },
// eventName: {
//   type: String,
//   required: true
// },
// eventPlace: {
//   type: String,
//   required: true
// },
// status: {
//   type: String,
//   enum: ['Pending', 'Completed', 'Rejected'],  
//   default: 'Pending'
// },
// amount: {
//   type: Number,
//   required: true
// },
// date: {
//   type: String,
//   required: true
// },
// refund: {
//   type: String,
//   enum: ['Yes', 'No'],
//   default: 'No'
// },
// orderdBy: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref:"User"
// },

// Example array: 
[
  {
    "eventImage": "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFydHl8ZW58MHx8MHx8fDA%3D",
    "eventName": "Medical Innovation Congress 2024",
    "eventId": "66fb89a80aa2522dfaf0b366",
    "eventOrganizerEmail": "info@mediinnovators.com",
    "eventOrganizerName": "Dr. Michael Johnson",
    "eventOrganizerPhoto": "https://example.com/photos/dr-michael-johnson.png",
    "bookedUserName": "Mehedi  Hasan",
    "bookedUserPhoto": "https://res.cloudinary.com/dqdircc96/image/upload/v1728713778/gqth3pjooumzelwi60jz.png",
    "bookedUserEmail": "mehedi@gamil.com",
    "amount": 250,
    "totalTickets": 3,
    "transitionId": 123456789,
    "eventDate": "2024-11-15T09:00:00Z",
    "refundRequested": "NotRequested"
  },
  {
    "eventImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPsOd3VFXjHHkslwN3ksKwTGaSaS3ojs0MnQ&s",
    "eventName": "Global Tech Summit 2024",
    "eventId": "66fa76c192c98f3e89a6291b",
    "eventOrganizerEmail": "info@globaltech.com",
    "eventOrganizerName": "James Bond",
    "eventOrganizerPhoto": "https://example.com/images/organizer2.jpg",
    "bookedUserName": "Carla Wall",
    "bookedUserPhoto": "https://res.cloudinary.com/dqdircc96/image/upload/v1728711045/hljhkmhwgpkmqwbl6ign.png",
    "bookedUserEmail": "pidibogy@mailinator.com",
    "amount": 120,
    "totalTickets": 1,
    "transitionId": 987654321,
    "eventDate": "2024-12-22T18:00:00Z",
    "refundRequested": "Requested"
  },
  {
    "eventImage": "https://media.istockphoto.com/id/583827412/fr/photo/amis-ayant-une-f%C3%AAte-barbecue-dans-la-nature.jpg?s=612x612&w=0&k=20&c=L5Iq8PcGpczBl3cdkNqbixeH2aPXh3NXDZLwb1CwViU=",
    "eventName": "Medical Innovation Congress 2024",
    "eventId": "66fb89a80aa2522dfaf0b366",
    "eventOrganizerEmail": "contact@creativeminds.com",
    "eventOrganizerName": "Anita Verma",
    "eventOrganizerPhoto": "https://example.com/images/organizer3.jpg",
    "bookedUserName": "Web Averngers",
    "bookedUserPhoto": "https://res.cloudinary.com/dqdircc96/image/upload/v1728558305/if5todxz18cor2hb3xww.png",
    "bookedUserEmail": "webavengers@gmail.com",
    "amount": 400,
    "totalTickets": 5,
    "transitionId": 564738291,
    "eventDate": "2024-10-30T14:30:00Z",
    "refundRequested": "NotRequested"
  }
]
