import express from "express";
import Course from "../models/Course.js";
import User from "../models/user.js";

const router = express.Router();

// Create Course
router.post("/create-course", async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.json({ message: "Course created" });
  } catch (error) {
    console.log(error);   // 👈 VERY IMPORTANT
    res.status(500).json({ message: error.message });
  }
});
// GET all courses
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST join course
router.post("/join-course", async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // prevent duplicate joining
    if (user.enrolledCourses.includes(courseId)) {
      return res.json({ message: "Already joined" });
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    res.json({ message: "Course joined successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;
