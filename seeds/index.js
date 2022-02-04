const express = require('express')
const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors, image_urls, image_filenames } = require('./seedHelpers')
const Campground = require('../models/campground')
require('dotenv').config()
const dbUrl = process.env.DB_URL
const localURL = 'mongodb://localhost:27017/yelp-camp'

// seed the real database but keep local url as backup for testing
// const localURL = 'mongodb://localhost:27017/yelp-camp'
mongoose.connect(localURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 350; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const random9 = Math.floor(Math.random() * 9)
        const random9_ = Math.floor(Math.random() * 9)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)} `,
            author: '5fca7b1f5dfb50c4dcd2e8e9',
            description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.',
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [{
                url: image_urls[random9],
                filename: image_filenames[random9],
            },
            {
                url: image_urls[random9_],
                filename: image_filenames[random9_]
            }]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})