const express = require('express')
const mongoose = require('mongoose')
const Campground = require('../models/campground')
const User = require('../models/user')
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
    console.log("Database Wiped")
})

const seedDB = async () => {
    await Campground.deleteMany({});
    await User.deleteMany({});
}

seedDB().then(() => {
    mongoose.connection.close();
})