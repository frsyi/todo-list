const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to ToDoList API!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
