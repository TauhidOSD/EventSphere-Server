const User = require("../../models/User.js");

const getAllUser = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAUser = async (req, res, next) => {
  try {

    const query = { _id: req.params.id };
    console.log(query);
    const result = await User.findOne(query);

    res.send(result);

  } catch (err) {
    next(err);
  }
}
// create user
const createUser = async (req, res) => {
  // try {
  //   const newUser = await User(req.body);
  //   await newUser.save();
  //   res.status(201).json(newUser);
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
  const user = req.body;
  try {
    const isExists = await User.findOne({ email: user?.email });
    if (isExists) {
      return res.send({
        success: true,
        message: "User is already exists",
      })
    }
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
    const { id } = req.params;
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateUser) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a User
const deleteUserById = async (req, res) => {
  try {

    const id = req?.params?.id;
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({
        success: false,
        message: "Not found"
      })
    };

    res.send({
      success: true,
      message: "Delete successfull",
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "wrong info"
    })
  }
}


module.exports = { getAllUser, createUser, getAUser, updateUser, deleteUserById };
