const express = require("express");
const {
  getAllUser,
  createUser,
  getAUser,
  deleteUserById,
  updateUser,
} = require("../../controller/user/user.controller");


const router = express.Router();

router.post("/users", createUser);
router.get("/users", getAllUser);
router.get("/user/:id", getAUser)
router.delete("/user/:id",deleteUserById)
router.patch("/user/:id",updateUser)


module.exports = router;
