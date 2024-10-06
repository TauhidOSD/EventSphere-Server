const express = require("express");
const { createEvent, getAllEvent, getSingleEvent } = require("../../controller/event/event.controller");



const router = express.Router();

router.post("/", createEvent);
router.get("/", getAllEvent);
router.get("/:id", getSingleEvent);


module.exports = router;
