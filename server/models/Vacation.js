const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

// Create Schema

const VacationSchema = new Schema({
  info: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  follows: {
    type: Number,
    default: 0,
  },

  followers: {
    type: Array,
    default: [],
  },

  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => new moment().add(3, "hours"),
  },
});

module.exports = Vacation = mongoose.model("vacation", VacationSchema);
