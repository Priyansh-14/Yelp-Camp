const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDNINARY_CLOUD_NAME,
  api_key: process.env.CLOUDNINARY_KEY,
  api_secret: process.env.CLOUDNINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "YelpCamp",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

module.exports = { cloudinary, storage };
