import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/usermodel.js";
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// Route for user Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User Doesn't Exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id);
            return res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: 'Invalid Credentials' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Route for Register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Checking if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User Already Exist" });
        }

        // Validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please Enter Valid Email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please Enter a strong Password" });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Route For Admin Login 
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid CREDENTIALS" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Route to get user profile info using JWT token
const getUserProfile = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Expect "Bearer token"
        if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).select('-password'); // Exclude password field

        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        res.json({ success: true, user });
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};
// Verify if email exists
const verifyEmail = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await userModel.findOne({ email });
  
      if (!user) {
        return res.json({ success: false, message: "Email not found" });
      }
  
      res.json({ success: true, message: "Email verified" });
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  };
  
  // Reset password after verifying email
  const resetPassword = async (req, res) => {
    try {
      const { email, newPassword } = req.body;
  
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.json({ success: false, message: "Email not found" });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      user.password = hashedPassword;
      await user.save();
  
      res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  };
  

export { resetPassword,verifyEmail,loginUser, registerUser, adminLogin, getUserProfile };
