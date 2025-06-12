const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email, mobile_number } = req.body;
  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { mobile_number }],
    });

    console.log("existingUser===>",existingUser);
    
    if (existingUser) {
      if (email === existingUser.email) {
        return res
          .status(400)
          .json({ message: "Email already exists", success: false });
      }
      return res
        .status(400)
        .json({ message: "Mobile number already exists", success: false });
    }

    const newUser = new User(req.body);
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({
      user: newUser,
      token,
      succss: true,
      message: "User added successfully",
    });
  } catch (err) {
    console.log("Error in register::", err);
    res.status(500).json({ message: "Something went wrong!", success: false });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log("user---->",user);
    
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({
      user,
      token,
      message: "Login user successfully!",
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!", success: false });
  }
};

const getUser = async (req, res) => {
  // console.log("req----->", req);

  try {
    const user = await User.findOne({ _id: req.user_id });
    if (!user)
      return res
        .status(400)
        .json({ message: "User not found", success: false });

    const { _id, first_name, last_name, mobile_number, email, dob, gender } =
      user;

    res.status(200).json({
      user: { _id, first_name, last_name, mobile_number, email, dob, gender },
      message: "Get user successfully!",
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Somthing went wrong!", success: false });
  }
};

module.exports = { register, login, getUser };
