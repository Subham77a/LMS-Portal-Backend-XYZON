import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  instructor: {
    type: String,
    required: true
  },

  image: {
    type: String   // stores image path (uploads/course.jpg)
  }

}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);

export default Course;
