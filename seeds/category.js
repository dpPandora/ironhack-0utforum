require('dotenv').config();
const mongoose = require('mongoose');

const mongoURL = process.env.MONGODB_URL
const Category = require('../models/Category.model');

const categories = [
    {
        topic: "Technology!",
        categoryName: "programming"
    },
    {
        topic: "Technology!",
        categoryName: "techTalk"
    },
    {
        topic: "Technology!",
        categoryName: "cryptoCoinClowns"
    },
    {
        topic: "Tv Shows",
        categoryName: "recommendations"
    },
    {
        topic: "Tv Shows",
        categoryName: "general"
    },
    {
        topic: "Tv Shows",
        categoryName: "speculation"
    }
]

mongoose
    .connect(mongoURL)
    .then(x => {
        console.log('Connected to database', x.connections[0].name);

        Category
            .create(categories)
            .then(created => {
                console.log(created);
            })
            .catch(err => {
                console.log(err);
            });
    })
    .catch(err => console.log(err));