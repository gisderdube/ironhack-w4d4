const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: String,
    year: String,
    director: String,
    duration: String,
    genre: [
        String,
    ],
    rate: String,
})

module.exports = mongoose.model('Movie', movieSchema)
