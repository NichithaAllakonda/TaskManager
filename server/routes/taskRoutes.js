const router = require("express").Router();

const Task = require("../models/Task");

const auth = require("../middleware/authMiddleware");


// CREATE TASK
router.post("/", auth, async (req, res) => {

  try {

    const task = new Task({

      title: req.body.title,
      description: req.body.description,
      assignedTo: req.body.assignedTo,
      project: req.body.project

    });

    await task.save();

    res.json(task);

  } catch (err) {

    res.status(500).json(err);

  }

});


// GET ALL TASKS
router.get("/", auth, async (req, res) => {

  try {

    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("project", "title");

    res.json(tasks);

  } catch (err) {

    res.status(500).json(err);

  }

});


// GET SINGLE TASK
router.get("/:id", auth, async (req, res) => {

  try {

    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("project", "title");

    if (!task) {
      return res.status(404).json("Task Not Found");
    }

    res.json(task);

  } catch (err) {

    res.status(500).json(err);

  }

});


// UPDATE TASK STATUS
router.put("/:id", auth, async (req, res) => {

  try {

    const updatedTask = await Task.findByIdAndUpdate(

      req.params.id,

      {
        status: req.body.status
      },

      { new: true }

    );

    res.json(updatedTask);

  } catch (err) {

    res.status(500).json(err);

  }

});


// DELETE TASK
router.delete("/:id", auth, async (req, res) => {

  try {

    await Task.findByIdAndDelete(req.params.id);

    res.json("Task Deleted Successfully");

  } catch (err) {

    res.status(500).json(err);

  }

});

module.exports = router;