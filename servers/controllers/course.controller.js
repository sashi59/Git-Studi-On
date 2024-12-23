import { instance } from "../index.js";
import { tryCatch } from "../middlewares/tryCatch.js";
import Course from "../models/course.model.js";
import Lecture from "../models/lecture.model.js";
import { Payment } from "../models/payment.model.js";
import User from "../models/user.model.js";
import crypto from "crypto"

export const getAllCourse = tryCatch(async (req, res) => {

    const allCourse = await Course.find({});
    return res.status(200).json({
        allCourse
    })

})

export const getSingleCourse = tryCatch(async (req, res) => {

    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({
        message: "Course not found"
    })
    return res.status(200).json({
        course
    })

})

export const fetchCourseLecture = tryCatch(async (req, res) => {

    const allLecture = await Lecture.find({ course: req.params.id })
    // console.log("req.user",req.user)
    const user = await User.findById(req.user._id);

    if (user.role === "admin") {
        return res.status(200).json({
            allLecture
        })
    }

    if (!user.subscription?.includes(req.params.id)) {
        return res.status(403).json({
            message: "You haven't subscribed to this course!"
        })
    }

    return res.status(200).json({
        allLecture
    })


})

export const fetchSingleLecture = tryCatch(async (req, res) => {
    const lecture = await Lecture.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (user.role === "admin") {
        return res.status(200).json({
            lecture
        })
    }

    if (!user.subscription?.includes(lecture.course)) {
        return res.status(403).json({
            message: "You haven't subscribed to this course!"
        })
    }

    return res.status(200).json({
        lecture
    })


})

export const getMyCourses = tryCatch(async (req, res) => {
    const myCourses = await Course.find({ _id: req.user?.subscription })

    return res.status(200).json({
        myCourses
    })
})

export const checkout = tryCatch(async (req, res) => {
    const course = await Course.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (!course) {
        return res.status(404).json({
            message: "Course not found",
        });
    }

    if (!course.price || isNaN(course.price)) {
        return res.status(400).json({
            message: "Invalid course price",
        });
    }

    if (user?.subscription?.includes(course._id)) {
        return res.status(400).json({
            message: "You have already subscribed to this course!",
        });
    }

    const options = {
        amount: Number(course.price) * 100, // Amount in subunits
        currency: "INR",
        receipt: `STUDI_ON_LMS_${req.params.id}`,
      };
      
      const order = await instance.orders.create(options);
      
      return res.status(200).json({
        order,
        amount: options.amount, // Return amount to frontend
      });
      
});


export const paymentVerification = tryCatch(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const verifyHashSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body)
        .digest("hex");

    const isAuthentic = razorpay_signature === verifyHashSignature;

    if (isAuthentic) {
        // Create a payment entry
        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });

        const user = await User.findById(req.user._id);
        const course = await Course.findById(req.params.id);

        if (!user || !course) {
            return res.status(404).json({
                message: "User or Course not found",
            });
        }

        // Ensure the subscription array exists
        if (!Array.isArray(user.subscription)) {
            user.subscription = [];
        }

        // Add course to user's subscriptions
        if (!user.subscription.includes(course._id)) {
            user.subscription.push(course._id);
        }

        // Save the updated user document
        await user.save();

        return res.status(200).json({
            message: "Course Purchased successfully",
            user,
            course,
        });
    } else {
        return res.status(401).json({
            message: "Payment verification failed",
        });
    }
});
