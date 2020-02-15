const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
const hbs = require('hbs')
const path = require('path')
const publicPathDirectory = path.join(__dirname, '../public')
const viewsPathDirectory = path.join(__dirname, '../templates/views')
const partialsDirectory = path.join(__dirname, '../templates/partials')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


app.use(express.static(publicPathDirectory))
app.set('view engine', 'hbs')
app.set('views', viewsPathDirectory)

hbs.registerPartials(partialsDirectory)

app.get('', (req, res) => {
    res.render('index', { page: 'Home page', createdBy: 'Abdul' })
})
app.get('/help', (req, res) => {
    res.render('help', { page: 'Help page', createdBy: 'Abdul', helpText: 'This is some random help text' })
})
app.get('/about', (req, res) => {
    res.render('about', { page: 'About page', createdBy: 'Abdul' })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({ error: 'Please send some address' })

    }
    else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }

                return res.send({ location, forecastData })
            })
        })
    }
})
app.get('/help/*', (req, res) => {
    res.render('404', { error: 'Help article not Found' })
})
app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not Found'
    })
})
app.listen(port, () => {
    console.log('Server is up running @ 3000')
})