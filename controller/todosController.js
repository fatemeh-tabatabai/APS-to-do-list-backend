const Todo = require("../model/Todo");

// @desc - all todos
// @route - GET '/todos'
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    if (!todos) return res.status(204).json({ message: "No todo have found." });
    res.json(todos);
  } catch (err) {
    console.log(err);
  }
};

// @desc - create a todo
// @route - POST '/todos'
const createTodo = async (req, res) => {
  const { title } = req?.body;

  if (!title) return res.status(400).json({ message: `Title is required.` });

  try {
    await Todo.create({ title: req.body.title });

    const todos = await Todo.find();
    if (!todos) return res.status(204).json({ message: "No todo have found." });
    res.status(201).json(todos);
    
  } catch (err) {
    console.log(err);
  }
};

// @desc - update a todo
// @route - PUT '/todos'
const updateTodo = async (req, res) => {
  const { title, id } = req?.body;

  if (!id) return res.status(400).json({ message: "Id is required" });

  try {
    const todo = await Todo.findOne({ _id: id });
    if (!todo)
      return res
        .status(204)
        .json({ message: `no todo matches with ID: ${id}` });

    if (req.body?.title) todo.title = title;

    await todo.save();
    
    const todos = await Todo.find();
    if (!todos) return res.status(204).json({ message: "No todo have found." });

    res.json(todos);
  } catch (err) {
    console.log(err);
  }
};

// @desc - delete a todo
// @route - DELETE '/todos'
const deleteTodo = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: `todo Id is required.` });
  try {
    const todo = await Todo.findOne({ _id: req.body.id });
    console.log(todo);
    if (!todo) 
      return res
        .status(204)
        .json({ message: `No matches todo with this Id.`});
    
      const result = await todo.deleteOne();

      const todos = await Todo.find();
      if (!todos) return res.status(204).json({ message: "No todo have found." });

      res.json(todos);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
