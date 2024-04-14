const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/CatchAsync");
const Campground = require("../models/campground");
const Review = require("../models/review");
const ExpressErrors = require("../utils/ExpressErrors");
const { reviewsSchema } = require("../joiSchema");

const validateReview = (req, res, next) => {
  const { error } = reviewsSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((er) => er.message).join(",");
    throw new ExpressErrors(msg, 400);
  } else {
    next();
  }
};

router.post(
  "/",
  validateReview,
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete(
  "/:revid",
  catchAsync(async (req, res) => {
    const { id, revid } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: revid } });
    await Review.findByIdAndDelete(revid);
    res.redirect(`/campgrounds/${id}`);
  })
);

module.exports = router;
