const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/protect");
const { uploadItemImages } = require("../middleware/upload");
const itemController = require("../controllers/itemController");


router.post("/add", protect, uploadItemImages.array("images", 5), itemController.addItem);

module.exports = router;
