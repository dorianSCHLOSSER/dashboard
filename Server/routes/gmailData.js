const router = require('express').Router()
const verify = require ('../checkToken')
const axios = require('axios').default


router.get('/getMailList', verify, async(req, res) => {
    let request = JSON.parse(req.query.params)
    console.log(req.query.params)
    await axios.get("https://www.googleapis.com/gmail/v1/users/me/messages", {
        headers: {
            Authorization: req.headers.authorization
        },
        params: {
            maxResults: "3",
            q: request.q
        }
    }).then(r => {
        res.status(200).send(r.data)
    })
    .catch(e => {
        res.status(400).send(e)
    })
})

router.get('/getMailData', verify, async(req, res) => {
    let request = JSON.parse(req.query.params)
    let URL = 'https://www.googleapis.com/gmail/v1/users/me/messages/' + request.id
    await axios.get(URL, {
        headers: {
            Authorization: req.headers.authorization
        },
        params: {
            format: 'metadata'
        }
    }).then(r => {
        res.status(200).send(r.data)
    })
    .catch(e => {
        res.status(400).send(e)
    })
})

module.exports = router