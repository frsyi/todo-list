const Todo = require("../models/Todo");

module.exports = {
  createTodo: async (req, res) => {
    try {
      const { title, description, completed } = req.body;
      if (!title) {
        return res.status(400).json({ message: "Title is required" });
      }

      const todo = new Todo({
        title,
        description,
        completed,
        userId: req.user._id,
      });
      await todo.save();

      res.status(201).json({ message: "Todo created successfully", todo });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Error creating todo", error: error.message });
    }
  },
  getAllTodos: async (req, res) => {
    try {
      const todos = await Todo.find({ userId: req.user._id }).sort({
        createdAt: -1,
      });

      res.status(200).json({ message: "Todos retrieved successfully", todos });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch todos", error: error.message });
    }
  },
  getTodoById: async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await Todo.findOne({ _id: id, userId: req.user._id });

      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      res.status(200).json({ message: "Todo retrieved successfully", todo });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch todos", error: error.message });
    }
  },
  updateTodo: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, completed } = req.body;

      const todo = await Todo.findOneAndUpdate(
        { _id: id, userId: req.user._id },
        { title, description, completed },
        { new: true, runValidators: true }
      );

      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      res.status(200).json({ message: "Todo updated successfully", todo });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to update todo", error: error.message });
    }
  },
  deleteTodo: async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await Todo.findOneAndDelete({
        _id: id,
        userId: req.user._id,
      });

      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      res.status(200).json({ message: "Todo deleted successfully", todo });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to delete todo", error: error.message });
    }
  },
  deleteAllTodos: async (req, res) => {
    try {
      const result = await Todo.deleteMany({ userId: req.user._id });
      res.status(200).json({
        message: "All todos deleted successfully",
        deletedCount: result.deletedCount,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to delete all todos", error: error.message });
    }
  },
};
