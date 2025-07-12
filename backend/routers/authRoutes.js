const express=require("express")
const router=express.Router();
const authControllers= require("../controllers/authControllers")
const { protect } = require("../middleware/protect");
const upload = require("../middleware/upload");
const passport = require("passport");
router.post("/signup",upload.single("avatar"),authControllers.newSignUp)
router.post("/login",authControllers.newlogin)
router.get("/me", protect,authControllers.me)
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
  "/google/callback",
  authControllers.googleCallback
);
router.post("/logout", authControllers.logout);


module.exports=router;