const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const Playlist = require("../models/Playlist.js");

//this all is ran at the beggining of accesing the page to
//see if there are any playlists in the database
//wh7yisnt  this using the is Authenticated parameter?
// ALL PLAYLISTS FROM ALL USERS
router.get("/all", async (req, res) => {
  try {
    const allPlaylists = await Playlist.find();

    return res.status(200).json(allPlaylists);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

//GET PLAYLISTS FROM LOGGED IN USER
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const playlists = await Playlist.find({ owner: req.user._id });

    return res.status(200).json(playlists);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

//GET A SPECIFIC PLAYLIST
router.get("/:playlistId", async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.playlistId);

    return res.status(200).json(playlist);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.post("/", isAuthenticated, async (req, res) => {
  try {
    const playlistCreated = await Playlist.create({
      name: req.body.name,
      tracks: [],
      owner: req.user._id,
    });

    return res.status(201).json(playlistCreated);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.put("/:playlistId", isAuthenticated, async (req, res) => {
  const { playlistId } = req.params;
  try {
    let playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    console.log(req.body);
    playlist.tracks.push({ track: { ...req.body.track } });

    await playlist.save();

    return res.status(200).json(playlist);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.delete("/:playlistId", isAuthenticated, async (req, res) => {
  try {
    await Playlist.findByIdAndDelete(req.params.playlistId);
    return res.status(200).json({ message: "Playlist deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = router;
