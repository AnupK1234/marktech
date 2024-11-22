const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    media: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
