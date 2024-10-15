const express = require("express");
const { createOrder, getAllOrder, getOrderById } = require("../../controller/order/order.controller");
const router = express.Router();




router.post("/orders", createOrder);
router.get("/orders", getAllOrder);
router.get("/orders/:gmail", getOrderById);



module.exports = router;