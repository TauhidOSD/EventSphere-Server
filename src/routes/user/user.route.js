const express = require("express");
const router = express.Router();
const { getSingleUser, createUser } = require("../../controller/event/user.controller");


router.get("/user/:email", getSingleUser);
router.post("/user", createUser);


module.exports = router;