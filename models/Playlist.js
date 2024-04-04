const { model, Schema } = require("mongoose");

const playlistSchema = new Schema(
  {
    name: String,
    owner: { type: Schema.Types.ObjectId, ref: "user" },
    tracks: [
      {
        track: {
          name: String,
          artist: String,
          id: String,
          duration_ms: Number,
          image: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Playlist", playlistSchema);
