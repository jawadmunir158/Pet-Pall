import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/usermodel.js";
import jwt from 'jsonwebtoken'



const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//Route for user LOgin
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {

            return res.json({ success: false, message: "User Doesn't Exist" })

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id)
            return res.json({ success: true, token })
        }
        else {
            return res.json({ success: false, message: 'Invalid Credentials' })
        }

    } catch (error) {


        console.log(error);
        res.json({ success: false, message: error.message })

    }

}

//Route for Register uyser

const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        //cheecking user already exixst or not
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User Already Exist" })
        }

        //Validating email and format

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please Enter Valid Email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please Enter a strong Password" })
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({ success: true, token })


    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message })

    }

}

//Route For Admin Login 
const adminLogin = async (req, res) => {
     
    try {
         
        const {email,password} = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})
            
        }

        else{
            res.json({success:false , messsage:"Invalid CREDENTIALS"})
        }


    } catch (error) {
        
    }



}


export { loginUser, registerUser, adminLogin }

