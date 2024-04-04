const {Schema, model} = require("mongoose")



const reviewSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref:"user"},
    playlist: {type:Schema.Types.ObjectId, ref: "playlist"},
    comment: {type: String, maxLength: 360},
    rating: {type: Number, min: 1, max:5}
})


module.exports = model("Review", reviewSchema)