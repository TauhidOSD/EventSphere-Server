const Event = require("../../models/Event");
const { ObjectId } = require('mongodb');
const { startOfToday, addDays, startOfWeek, addMonths } = require('date-fns');

const getAllEvent = async (req, res) => {
  const {
    category,
    minimumPrice,
    maximumPrice,
    type,
    country,
    city,
    startDate,
    endDate,
    limit = 6, 
    page = 1, 
  } = req.query;

  const filters = {};

  // Category filter
  if (category) {
    filters.category = category;
  }

  // Type filter
  if (type) {
    filters.type = type;
  }

  // Location filters
  if (country) {
    filters['location.country'] = country;
  }
  if (city) {
    filters['location.city'] = city;
  }

  // Date filters
  if (startDate || endDate) {
    filters.dateTime = {};

    if (startDate) {
      filters.dateTime.$gte = new Date(startDate);
    }

    if (endDate) {
      filters.dateTime.$lte = new Date(endDate);
    }
  }

  // Price filters
  if (minimumPrice || maximumPrice) {
    filters.price = {};
    if (minimumPrice) filters.price.$gte = Number(minimumPrice);
    if (maximumPrice) filters.price.$lte = Number(maximumPrice);
  }

  const itemsPerPage = parseInt(limit); // Number of items per page
  const currentPage = parseInt(page); // Current page number

  try {
    // Counting total events
    const totalEvents = await Event.countDocuments(filters);

    // Finding filtered events with pagination
    const events = await Event.find(filters)
      .skip((currentPage - 1) * itemsPerPage) 
      .limit(itemsPerPage); 

    res.json({
      totalEvents, 
      currentPage, 
      totalPages: Math.ceil(totalEvents / itemsPerPage), 
      events, 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getSingleEvent = async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const result = await Event.findOne(query);

    if (!result) {
      return res.status(404).send({ message: "Event Not Found" });
    }

    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server Error" });
  }
};

// Create Event
const createEvent = async (req, res) => {
  const event = req.body;
  try {
    await Event.create(event);
    res.send({
      success: true,
      message: "Created successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getAllEvent, createEvent, getSingleEvent };
