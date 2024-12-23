import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    title:{
        type: 'string',
        required: true,
    },
    description:{
        type: 'string',
        required: true,
    },
    video:{
        type: 'string',
        required: true,
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
},{
    timestamps: true,
})

const Lecture = mongoose.model("Lecture", lectureSchema);

export default Lecture;