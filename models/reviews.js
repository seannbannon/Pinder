const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [{
        reviewing: {
            user: Schema.Types.ObjectId,
            ref: "User"
        },
        title: String,
        body: String,
        rating: Number
    }]
})

const Reviews = mongoose.model("Reviews", reviewsSchema);

module.exports = Reviews;