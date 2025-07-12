const express=require("express")
const router=express.Router();
const sampleControllers= require("../controllers/sampleControllers")
router.get("/sample",sampleControllers.getSample)
module.exports=router;