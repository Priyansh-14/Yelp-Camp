const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "662040a9c87da69251154599",
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city},${cities[random1000].state}`,
      images: [
        {
          url: "https://res.cloudinary.com/dh9li6ili/image/upload/v1714617035/YelpCamp/ijrf9zxogz7nikpanobv.jpg",
          filename: "YelpCamp/ijrf9zxogz7nikpanobv",
        },
        {
          url: "https://res.cloudinary.com/dh9li6ili/image/upload/v1714617035/YelpCamp/rqaaz269kvfvfpiyqphh.jpg",
          filename: "YelpCamp/rqaaz269kvfvfpiyqphh",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
