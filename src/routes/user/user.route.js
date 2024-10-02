const express = require("express");
const router = express.Router();
const { getSingleUser, createUser, updateUser } = require("../../controller/event/user.controller");


router.get("/user/:email", getSingleUser);
router.post("/user", createUser);
router.put("/user/:id", updateUser);


module.exports = router;