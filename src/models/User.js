
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    surname: String,
    email:String,
    phone: String,
    city: String,
    country: String,
    gender: String,
    skills: String, 
    specialty: String,
    CEOEmail: String,
    socialPlatform: String,
    location: String,
    companyName: String,
    organizer: Boolean,
    email: {
      type: String,
      unique: true
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'] // Restricting gender values to specific options
    },
    specialty: String,
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String, // Specify the type
      enum: ["user", "admin"],
      default: "user",
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
 