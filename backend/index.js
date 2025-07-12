require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
require("./passport");
const authRoutes =require("./routers/authRoutes")
const sampleRoutes=require("./routers/sampleRoutes")
const itemRoutes = require("./routers/itemRoutes");
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use("/api", [authRoutes,sampleRoutes,itemRoutes]);

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(4000, () => {
        console.log("Server Started and Database Connected")
    })
})