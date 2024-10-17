const express = require("express");
const { createOrder, getAllOrder, getOrderById, metricsForAdminChart, monthlyMetrics } = require("../../controller/order/order.controller");
const router = express.Router();




router.post("/orders", createOrder);
router.get("/orders", getAllOrder);
router.get("/orders/:gmail", getOrderById);
router.get("/metricsForAdminChart", metricsForAdminChart);
router.get("/monthlyMetrics", monthlyMetrics);



module.exports = router;