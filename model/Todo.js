const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    maxLength: [50, "Maximum length is 50 characters"],
    required: [true, 'Field "title" is required'],
  },
  completed: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
