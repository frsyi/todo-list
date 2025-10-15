const express = require("express");
const app = express();
const connectDB = require("./src/config/db");
const allRoutes = require("./src/routes");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
connectDB();

app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ToDoList API!" });
});

app.use(allRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
