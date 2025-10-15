const User = require("../models/User");

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ message: "Name, email, and password are required" });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User with this email already exists" });
      }

      const newUser = new User({ name, email, password });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error registering user", error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      res.status(200).json({ message: "User logged in successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error logging in user", error: error.message });
    }
  },
};
