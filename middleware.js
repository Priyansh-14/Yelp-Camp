const ExpressErrors = require("./utils/ExpressErrors");
const { campgroundSchema, reviewsSchema } = require("./joiSchema");
const Campground = require("./models/campground");
const Review = require("./models/review");
module.exports.isLoggedIn = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You Must Be Signed In");
    return res.redirect("/login");
  }
  next();
};

module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

module.exports.validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((er) => er.message).join(",");
    throw new ExpressErrors(msg, 400);
  } else {
    next();
  }
};

module.exports.isCampgroundAuthor = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash("error", "Cannot find this Campground");
    return res.redirect("/campgrounds");
  }
  if (!campground.author.equals(req.user._id)) {
    req.flash("error", "You do not have Persmission to do that");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewsSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((er) => er.message).join(",");
    throw new ExpressErrors(msg, 400);
  } else {
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, revid } = req.params;
  const review = await Review.findById(revid);
  if (!review) {
    req.flash("error", "Cannot find this Review");
    return res.redirect(`/campgrounds/${id}`);
  }
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You do not have Persmission to do that");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};
