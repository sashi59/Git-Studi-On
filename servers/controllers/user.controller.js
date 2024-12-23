import User from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcrypt"
import { sendMail } from "../middlewares/sendMail.js";
import { tryCatch } from "../middlewares/tryCatch.js";

export const signupUser = tryCatch(async (req, res) => {

    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return res.json({
        message: "User already Register"
    })

    const hashPassword = await bcrypt.hash(password, 10);

    user = {
        name,
        email,
        password: hashPassword,
    }

    const otp = Math.floor(Math.random() * 1000000);

    const accessToken = jsonwebtoken.sign({
        user, otp
    }, process.env.ACCESS_TOKEN, {
        expiresIn: "5m"
    });

    const data = {
        user, otp
    }

    await sendMail(data, "Studi-ON LMS", email);

    return res.status(200).json({
        message: "OTP send successfully",
        accessToken,
    })
})

export const verifyOtp = tryCatch(async (req, res) => {

    const { otp, accessToken} = req.body;

    const decodeOtp = jsonwebtoken.verify(accessToken, process.env.ACCESS_TOKEN)

    if(!decodeOtp) return res.status(404).json({
        message: "OTP expired"
    })

    if(decodeOtp.otp!= otp) return res.status(400).json({
        message: "Invalid OTP"
    })

    const user = await User.create({
        name: decodeOtp.user.name,
        email: decodeOtp.user.email,
        password: decodeOtp.user.password,
        role: decodeOtp.user.role,
        subscription: decodeOtp.user.subscription,
    })

    return res.status(200).json({
        message: "User created successfully",
        user,
    })

})

export const signinUser = tryCatch(async (req, res)=>{
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(!user) return res.status(404).json({
        message: "User not found"
    })

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) return res.status(400).json({
        message: "Invalid Password"
    })

    const token = jsonwebtoken.sign({_id: user._id}, process.env.JWT_SECRET,{
        expiresIn: "1d"
    })

    return res.status(200).json({
        message: `Welcome back ${user.name}`,
        token,
        user
    })
})

export const getMe = tryCatch(async (req, res)=>{
    const user = await User.findById(req.user._id)
    if(!user) return res.status(404).json({
        message: "User not found"
    })
    return res.status(200).json({
        user
    })
})