const mongoose = require("mongoose");
const Review = require("./review");
const { string } = require("joi");
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  title: {
    type: String,
  },
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

CampgroundSchema.post("findOneAndDelete", async function (campground) {
  if (campground.reviews.length) {
    await Review.deleteMany({ _id: { $in: campground.reviews } });
  }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
