const router = require("express").Router()
const isAuthenticated = require("../middleware/isAuthenticated");
const Playlist = require("../models/Playlist.js");
const Review = require("../models/Review.js");

router.post("/:playlistId",isAuthenticated, async (req, res) => {
    try {

        const {playlistId} = req.params

        
        // const playlist = await Playlist.findById(playlistId)

        const review = await Review.create({user: req.user._id, comment: req.body.comment, playlist: playlistId, rating: req.body.rating})


        return res.status(201).json(review)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})



//GETS ALL REVIEWS IN A PLAYLIST
router.get("/:playlistId", async (req, res) => {
    try {
        const {playlistId} = req.params


        const reviews = await Review.find({playlist: playlistId})


        return res.status(200).json(reviews)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error) 
    }
})
module.exports = router