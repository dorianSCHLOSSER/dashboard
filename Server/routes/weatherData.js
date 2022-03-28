const router = require('express').Router()
const verify = require ('../checkToken')
const axios = require('axios').default



router.get('/currentWeather', verify, async(req, res) => {
    let request = JSON.parse(req.query.params)
    await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
            q: request.q,
            appid: process.env.APIKEY_WEATHER,
            units: 'metric'
        }
    }).then(r => {
        res.status(200).send(r.data)
    })
    .catch(e => {
        res.status(400).send(e)
    })
})

router.get('/forecastWeather', verify, async(req, res) => {
    let request = JSON.parse(req.query.params)
    await axios.get("http://api.weatherapi.com/v1/forecast.json", {
        params: {
            q: request.q,
            key: process.env.APIKEY_WEATHER2,
            days: request.days,
        }
    }).then (r => {
        res.status(200).send(r.data)
    })
    .catch(e => {
        res.status(400).send(e)
    })
})

module.exports = router