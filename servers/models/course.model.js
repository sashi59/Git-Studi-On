import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title:{
        type: 'string',
        required: true,
    },
    description:{
        type: 'string',
        required: true,
    },
    image:{
        type: 'string',
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    duration:{
        type: Number,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    createdBy:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
},{
    timestamps: true,
})

const Course = mongoose.model("Course", courseSchema);

export default Course;