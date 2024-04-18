const express = require("express");
const router = express.Router({ mergeParams: true });

const review = require("../controllers/reviews");
const catchAsync = require("../utils/CatchAsync");

const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware");

router.post("/", isLoggedIn, validateReview, catchAsync(review.createReview));

router.delete(
  "/:revid",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(review.deleteReview)
);

module.exports = router;
