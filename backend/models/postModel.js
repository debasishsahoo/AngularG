const mongoose = require("mongoose");

let PostSchema = mongoose.Schema(
  {
    id: { type: String },
    title: { type: String, required: true },
    body: { type: String, required: true },
    image: { type: String, required: true },
    // tag: [String],
    createrid: { type: String },
    creatername: { type: String },
    createdAt: { type: Date, default: Date.now },
    like: { type: [String], default: [] },
    isActive: { type: Boolean },
  },
  { timestamp: true }
);

module.exports = mongoose.model("posts", PostSchema);
