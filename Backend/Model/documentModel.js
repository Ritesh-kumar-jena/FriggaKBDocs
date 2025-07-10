const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String,required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  visibility: { type: String, enum: ["public", "private"], default: "private" },
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }]
}, { timestamps: true });

const documents = mongoose.model("document", documentSchema);

module.exports = { documents };