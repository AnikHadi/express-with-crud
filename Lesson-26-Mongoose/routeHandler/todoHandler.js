const express = require("express");
const todoRouter = express.Router();
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

// GET all the TODOS
todoRouter.get("/", async (req, res) => {
  const filter = {};
  try {
    await Todo.find(filter)
      .select({ _id: 0, __v: 0, date: 0 })
      .limit(2)
      .exec((err, data) => {
        if (err) {
          res.status(500).json({
            error: "There was a server side error!",
          });
        } else {
          res.status(200).json({
            result: data,
            message: "Todo was inserted Successfully.",
          });
        }
      });

    //   OR

    // await Todo.find(filter)
    //   .then((data) => {
    //     if (data.length !== 0) {
    //       res.status(200).json({
    //         result: data,
    //         message: "Todo was find Successfully.",
    //       });
    //     } else {
    //       res.status(404).json({
    //         message: "Todo was not Found!",
    //       });
    //     }
    //   })
    //   .catch((err) =>
    //     res.status(500).send({
    //       message: "There was a server side error!",
    //       error: err,
    //     })
    //   );
  } catch (error) {
    return res.status(500).send({ message: error });
  }
});

//GET A TODO by ID
todoRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Todo.findById({ _id: id })
      .then((docs) => res.send(docs))
      .catch((err) =>
        res
          .status(500)
          .send({ message: "Can't find any user in this ID", error: err })
      );
  } catch (error) {
    return res.status(500).send({ message1: error });
  }
});

// POST TODO
todoRouter.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Todo was inserted Successfully.",
      });
    }
  });
});

// POST MULTIPLE TODO
todoRouter.post("/all", async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "There was a server side error!",
      });
    } else {
      res.status(200).json({
        message: "Todos ware inserted Successfully.",
      });
    }
  });
});

// PUT TODO
todoRouter.put("/:id", async (req, res) => {
  const id = { _id: req.params.id };
  const updateData = { $set: data };
  const option = { new: true, upsert: true, setDefaultsOnInsert: true };
  try {
    await Todo.findOneAndUpdate(id, updateData, option)
      .then((docs) => res.send(docs))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err1) {
    return res.status(500).send({ message1: err1 });
  }
});

// DELETE TODO
todoRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Todo.deleteOne({ _id: id }).exec((err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Todo was Delete Successfully.",
        });
      }
    });
  } catch (error) {
    return res.status(500).send({ message1: error });
  }
});

module.exports = todoRouter;
