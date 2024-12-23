import { tryCatch } from "../middlewares/tryCatch.js";
import Course from "../models/course.model.js";
import Lecture from "../models/lecture.model.js";
import User from "../models/user.model.js";

import {rm} from "fs"

export const createNewCourse = tryCatch(async (req, res) => {
    // console.log("Req File for image", req.file); // Debugging: Check if file is being uploaded
    const { title, description, price, duration, category, createdBy } = req.body;

    const image = req.file;

    if (!image) {
        return res.status(400).json({ message: "Image file is required" });
    }

    const course = await Course.create({
        title,
        description,
        price,
        duration,
        category,
        createdBy,
        image: image.path,
    });

    res.status(201).json({
        message: "Course created successfully",
        course,
    });
});


export const addLecturesToCourse = tryCatch(async (req, res) => {

    const course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({
        message: "Course not found"
    })

    const { title, description } = req.body;
    const video = req.file;

    const lecture = await Lecture.create({
        title,
        description,
        video: video?.path,
        course: course._id,
    })

    return res.status(200).json({
        message: "Lecture added successfully",
        lecture,
    })


})

export const deleteLecture = tryCatch(async(req, res)=>{

    const lecture = await Lecture.findById(req.params.id)

    rm(lecture.video, ()=>{
        console.log("video deleted");
    })

    await lecture.deleteOne();

    return res.status(200).json({
        message: "Lecture deleted successfully",
    })

})

export const deleteCourse = tryCatch(async(req, res)=>{

    const course = await Course.findById(req.params.id);

    const lectures = await Lecture.find({ course: course._id });
    lectures.forEach(async (lecture) => {
        rm(lecture.video, ()=>{
            console.log("video deleted");
        })
        await lecture.deleteOne();
    })

    rm(course.image, ()=>{
        console.log("image deleted");
    })

    await Lecture.find({course: course._id}).deleteMany();

    await course.deleteOne();

    await User.updateMany({}, {$pull: {subscription: req.params.id}})

    return res.status(200).json({
        message: "Course deleted successfully",
    })  


})

export const getAllStats= tryCatch(async (req, res)=>{

    const users = (await User.find({})).length;
    const courses = (await Course.find({})).length;
    const lectures = (await Lecture.find({})).length;

    const stats = {
        users,
        courses,
        lectures,
    }

    return res.status(200).json({
        stats,
    })


})

export const getAllUsers = tryCatch(async (req, res)=>{
    const users = await User.find({_id: {$ne: req.user._id}}).select("-password");

    return res.status(200).json({
        users,
    })

})

export const updateRole = tryCatch(async (req, res)=>{
    const user = await User.findById(req.params.id);

    if(user.role === 'admin'){
        user.role = "user";
        await user.save();
    }else if(user.role === "user"){
        user.role = "admin";
        await user.save();
    }else{
        return res.status(400).json({
            message: "Invalid role",
        })
    }

    return res.status(200).json({
        message: "Role updated successfully",
        user,
    })
})