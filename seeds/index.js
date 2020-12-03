const express = require('express')
const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
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
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)} `,
            author: '5fc7f5db86dae8b894ff37ef',
            description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren.',
            price,
            images: [{
                url: 'https://res.cloudinary.com/dxgv3dajj/image/upload/v1607023646/YelpCamp/lnendx1a2dpyjwbdraa2.jpg',
                filename: 'YelpCamp/lnendx1a2dpyjwbdraa2'
            },
            {
                url: 'https://res.cloudinary.com/dxgv3dajj/image/upload/v1607023648/YelpCamp/fvehrm7edyod7p9k1025.jpg',
                filename: 'YelpCamp/fvehrm7edyod7p9k1025'
            }]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})