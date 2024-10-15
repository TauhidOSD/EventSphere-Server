const express = require("express");
const router = express.Router();
const { getSingleUser, createUser, updateUser, addedFollower, updateUserReviw } = require("../../controller/user/user.controller");


router.get("/user/:email", getSingleUser);
router.post("/user", createUser);
router.put("/user/:email", updateUser);
router.put("/userAddedFollower", addedFollower);
router.put("/updateUserReviw/:email", updateUserReviw);


module.exports = router;