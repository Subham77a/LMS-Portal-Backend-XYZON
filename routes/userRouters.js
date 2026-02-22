import express from "express";
import User from "./models/User.js";

const router = express.Router();

router.get("/:userId/my-courses", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .populate("enrolledCourses");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.enrolledCourses);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;