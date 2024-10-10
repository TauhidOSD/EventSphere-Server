const express = require("express");
const { createEvent, getAllEvent, getSingleEvent, getMyEvent, getCategoryEvent } = require("../../controller/event/event.controller");



const router = express.Router();

router.post("/", createEvent);
router.get("/", getAllEvent);
router.get("/:id", getSingleEvent);
router.get("/getMyEvent/:email", getMyEvent);
router.get("/getCategoryEvent/:category", getCategoryEvent);


module.exports = router;
