const mongoose = require("mongoose");
const todoRouter = require("../routeHandler/todoHandler");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// instance methods
todoSchema.methods = {
  findActive: function () {
    return mongoose.model("Todo").find({ status: "active" });
  },
  findActiveCallback: (cb) => {
    return mongoose.model("Todo").find({ status: "active" }, cb);
  },
};

// static methods    (do not use arrow function on static bcz not work arrow function)
// Do not declare statics using ES6 arrow functions (=>). Arrow functions explicitly prevent binding this, so the above examples will not work because of the value of this.
todoSchema.statics = {
  findByName: function (name) {
    return this.find({ title: new RegExp(name, "i") }); // new RegExp(name, "i")  or /js/i
  },
};

// query helpers
todoSchema.query = {
  byLanguage: function (language) {
    return this.find({ title: new RegExp(language, "i") });
  },
};

module.exports = todoSchema;
