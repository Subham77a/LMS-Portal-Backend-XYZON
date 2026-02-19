import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./models/user.js";

dotenv.config();
const app = express();
const PORT = process.env.port;

app.use(cors({
  origin: "http://localhost:5173"
}))
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully! 🎉'))
  .catch(err => console.error('MongoDB connection error:', err));


app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.status(200).json({ message: "yes" });
    

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Create new user object
    const newUser = new User({
      name,
      username,
      email,
      password
    });

    // Save to database
    await newUser.save();

    res.status(201).json({ message: "User saved successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving user" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
