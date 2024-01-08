import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: { type: String },
  note: { type: String },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.models.Note|| mongoose.model('Note', noteSchema);
