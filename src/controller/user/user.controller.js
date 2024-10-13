const User = require("../../models/User");

const getSingleUser = async (req, res) => {
  try {

    const query = {
      email: req.params.email
    };

    const result = await User.findOne(query);

    res.send(result);

  } catch (err) {
    next(err);
  }
}
// create user
const createUser = async (req, res) => {

  const user = req.body;
  try {

    await User.create(user)
    res.send({
      success: true,
      message: "Created successfull",
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    })
  }
};

// update user
const updateUser = async (req, res) => {
  try {
    await  User.updateOne(
        { email: req.params.email},  
        {
          $set: {
            name: req.body.name ,
            surname: req.body.surname,
            email: req.body.email,
            phone: req.body.phone,
            city: req.body.city,
            country:req.body.country,
            gender: req.body.gender,
            skills: req.body.skills,
            specialty: req.body.specialty,
          }
        },
        { upsert: false, runValidators: true } 
      )
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Post OrganizerRequest
const beOrganizer = async (req, res) => {
  try {
    const updateResult = await User.updateOne(
      { email: req.params.email },
      {
        $set: {
          companyName: req.body.companyName,
          location: req.body.location,
          email: req.body.email,
          phone: req.body.phone,
          socialPlatform: req.body.socialPlatform,
          country: req.body.country,
          CEOEmail: req.body.CEOEmail,
          organizer: false,
        }
      },
      { upsert: false, runValidators: true }
    );
    
    // Send the update result as a response
    res.status(200).json(updateResult);
    console.log('Update result:', updateResult);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Organizer Requested User
const getOrganizerRequest= async (req, res) => {
  try {
    const query = { organizer: false };
    const result = await User.find(query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getSingleUser, createUser, updateUser, beOrganizer, getOrganizerRequest }; 