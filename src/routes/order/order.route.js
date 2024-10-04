const express = require("express");
const { createOrder, getAllOrder } = require("../../controller/order/order.controller");
const router = express.Router();




router.post("/orders", createOrder);
router.get("/orders", getAllOrder);



module.exports = router;