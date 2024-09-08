const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  values: [{ type: String }]
});
const CategoryCollection = mongoose.model('Category', CategorySchema);

module.exports={
  CategoryCollection,
}
