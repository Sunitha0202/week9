const mongoose = require('mongoose');

const sleeplogSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  hoursSlept: { type: Number, required: true },
  quality: { type: Number, required: true },
  comments: { type: String, required: true },
});

module.exports = mongoose.model('Sleeplog', sleeplogSchema);