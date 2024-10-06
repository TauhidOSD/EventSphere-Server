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
console.log(req.body);
console.log(req.params.email);

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
module.exports = { getSingleUser, createUser, updateUser }; 