const express = require('express')
const mongoose = require('mongoose')
const Movie = require('./models/Movie')
const path = require('path')

mongoose
    .connect(
        'mongodb://localhost/video',
        { useNewUrlParser: true }
    )
    .then(() => {
        console.log('connected to DB')
    })

const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/search', (req, res) => {
    res.render('form')
})

app.get('/movie', (req, res) => {
    const {
        title, rate, year,
    } = req.query

    const query = {
        $and: [
            title ? { title } : {},
            rate ? { rate } : {},
            year ? { year } : {},
        ],
    }

    console.log(query['$and'])

    Movie.find(query).then(movies => res.send(movies))
})

app.listen(3000)

process.on('SIGINT', () => {
    mongoose.connection.close().then(() => {
        console.log('CLOSED DB CONNECTION')
        process.exit(0)
    })
})
