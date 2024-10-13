const express = require("express");
const router = express.Router();
const { getSingleUser, createUser, updateUser, beOrganizer, getOrganizerRequest } = require("../../controller/user/user.controller");


router.get("/user/:email", getSingleUser);
router.post("/user", createUser);
router.put("/user/:email", updateUser);
router.put("/beOrganizer/:email", beOrganizer);
router.get("/organizerRequest", getOrganizerRequest)


module.exports = router;