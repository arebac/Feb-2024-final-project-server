const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    playlist: { type: Schema.Types.ObjectId, ref: "Playlist" },
    comment: { type: String, maxLength: 360 },
    rating: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);

module.exports = model("Review", reviewSchema);
