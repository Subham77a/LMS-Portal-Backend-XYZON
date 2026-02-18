const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "1234") {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
