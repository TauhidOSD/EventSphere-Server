const express = require("express");
const { createEvent, getAllEvent } = require("../../controller/event/event.controller");



const router = express.Router();

router.post("/", createEvent);
router.get("/", getAllEvent);


module.exports = router;
