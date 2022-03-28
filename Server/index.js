const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')

const authRoute = require ('./routes/authentication')
const aboutRoute = require('./routes/about')
const weatherRoute = require('./routes/weatherData')
const widgetRoute = require('./routes/widgets')
const oauthRoute = require('./routes/youtubAuth')
const youtubeRoute = require('./routes/youtubeData')
const gmailRoute = require('./routes/gmailData')

const Service = require('./models/Service')


mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true },
    () => console.log('Connected to DB !')
);

const initWeather = require('./json/initWeather.json')
const initYoutube = require('./json/initYoutube.json')
const initGMail = require('./json/initGMail.json')

app.use(cors())
app.use(express.json())

app.use('/api/user', authRoute)
app.use('/about', aboutRoute)
app.use('/api/weather', weatherRoute)
app.use('/api/widgets', widgetRoute)
app.use('/api/auth', oauthRoute)
app.use('/api/gmail', gmailRoute)
app.use('/api/youtube', youtubeRoute)

app.listen(process.env.PORT, async() => {
    let weather = await Service.findOne({name: initWeather.name})
    let youtube = await Service.findOne({name: initYoutube.name})
    let gmail = await Service.findOne({name: initGMail.name})

    if (!weather) {
        await Service.create(initWeather)
    }
    if (!youtube) {
        await Service.create(initYoutube)
    }
    if (!gmail) {
        await Service.create(initGMail)
    }
    console.log('Back running!')
})

