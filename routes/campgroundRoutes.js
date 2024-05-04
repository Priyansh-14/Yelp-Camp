const express = require("express");

const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const router = express.Router({ mergeParams: true });
const campground = require("../controllers/campgrounds");
const catchAsync = require("../utils/CatchAsync");
const {
  isLoggedIn,
  isCampgroundAuthor,
  validateCampground,
} = require("../middleware");

router
  .route("/")
  .get(catchAsync(campground.index))
  .post(
    isLoggedIn,
    upload.array("image", 12),
    validateCampground,
    catchAsync(campground.createCampground)
  );

router.get("/new", isLoggedIn, campground.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(campground.showCampground))
  .put(
    isLoggedIn,
    isCampgroundAuthor,
    upload.array("image", 12),
    validateCampground,
    catchAsync(campground.updateCampground)
  )
  .delete(
    isLoggedIn,
    isCampgroundAuthor,
    catchAsync(campground.deleteCampground)
  );

router.get(
  "/:id/edit",
  isLoggedIn,
  isCampgroundAuthor,
  catchAsync(campground.renderEditForm)
);

module.exports = router;
