const mongoose = require("mongoose");
const KeyValueSchema = new mongoose.Schema({
    key: String,
    value: String,
  });
  
const KeyValue = mongoose.model('KeyValue', KeyValueSchema);
module.exports = {
    KeyValue
};