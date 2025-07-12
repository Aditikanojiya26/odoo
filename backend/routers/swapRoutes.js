// routes/swapRoutes.js
const express = require("express");
const { createSwapRequest, getMySwapItems, getItemById } = require("../controllers/swapController");
const {protect} = require("../middleware/protect");

const router = express.Router();
router.post("/swap-request", protect, createSwapRequest);

router.get("/items/my-swap-items", protect, getMySwapItems);
router.get("/:id", getItemById);
module.exports = router;
