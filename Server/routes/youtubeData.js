const router = require('express').Router()
const verify = require('../checkToken')
const axios = require('axios').default

router.get('/getChannelData', verify, async(req, res) => {
    let request = JSON.parse(req.query.params)
    console.log(req.headers.authorization)
    await axios.get("https://www.googleapis.com/youtube/v3/channels", {
        headers: {
            Authorization: req.headers.authorization
        },
        params: {
            part: 'statistics',
            forUsername: request.forUsername,
        }
    }).then(r => {
        console.log(r.data)
        res.status(200).send(r.data)
    })
    .catch(e => {
        res.status(400).send(e)
    })
})

router.get('/getVideoData', verify, async(req, res) => {
    let request = JSON.parse(req.query.params)

    await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        headers: {
            Authorization: req.headers.authorization
        },
        params: {
            part: "statistics,snippet",
            id: request.id
        }
    }).then(r => {
        res.status(200).send(r.data)
    }).catch(e => {
        res.status(400).send(e)
    })
})

module.exports = router