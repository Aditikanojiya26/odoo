const User = require("../models/user"); // Adjust path based on your structure
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
exports.newSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const avatar = req.file;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      avatar: avatar?.filename || null, // if you save files
    });

    await user.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.newlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false, // set to true if using HTTPS
    });
    res.status(200).json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    if (err.response?.status === 400 || err.response?.status === 401) {
        const serverError = err.response.data.message;
        if (serverError && serverError.toLowerCase().includes("email")) {
          setErrors({ email: serverError });
        } else {
          setErrors({ password: serverError });
        }
      } else {
        alert("Something went wrong");
      }
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    console.error("Me route error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.googleCallback = (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, info) => {
   

    if (err || !user) {
      return res.redirect("http://localhost:5173/login");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });

    res.redirect("http://localhost:5173/dashboard");
  })(req, res, next);
};

exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  });
  res.status(200).json({ message: "Logged out successfully" });
};
