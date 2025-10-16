const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const todoRouter = require("./todo");

router.use("/api/auth", authRouter);
router.use("/api/todos", todoRouter);

module.exports = router;
