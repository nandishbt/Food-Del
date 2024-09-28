import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    //check whether user is already registered

    const existUser = await userModel.findOne({ email });

    if (existUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    //validate email

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a valid email " });
    }

    //validate password
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a Strong password" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const user = await userModel.findById(newUser._id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Error Creating User" });
    }

    const token = createToken(user._id);

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
    try {

        const {email,password} = req.body

        if(!email || !password){
            return res.status(400).json({success: false, message: 'All fields are required'});
        }

        const user = await userModel.findOne({email});

        if(!user){
            return res.status(404).json({success: false, message: 'User not found'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({success: false, message: 'Incorrect password'});
        }

        const token = createToken(user._id);

        return res.status(200).json({success: true, message: 'User logged in successfully', token});
        
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
};



export { loginUser, registerUser };
