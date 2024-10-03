const express = require("express");
const router = express.Router();
const { getSingleUser, createUser, updateUser } = require("../../controller/user/user.controller");


router.get("/user/:email", getSingleUser);
router.post("/user", createUser);
router.put("/user/:email", updateUser);


module.exports = router;