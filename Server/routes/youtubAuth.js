const axios = require('axios').default
const querystring = require('querystring')
const verify = require("../checkToken");
const router = require('express').Router()


function getGoogleAuthURL() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
        redirect_uri: `http://localhost:3000/callback`,
        client_id: '12478802560-7gqv0qc4kavennqtgere78p267lns1s1.apps.googleusercontent.com',
        access_type: "offline",
        response_type: "code",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/youtubepartner-channel-audit",
            "https://www.googleapis.com/auth/gmail.readonly",
            "https://www.googleapis.com/auth/youtube"
        ].join(" "),
    };

    return `${rootUrl}?${querystring.stringify(options)}`;
}

// Getting login URL
router.get("/authorize", verify, (req, res) => {
    res.send(getGoogleAuthURL());
})

router.post('/getToken', verify, async (req, res) => {
    await axios.post('https://oauth2.googleapis.com/token', {
            code: req.body.code,
            client_id: '12478802560-7gqv0qc4kavennqtgere78p267lns1s1.apps.googleusercontent.com',
            client_secret: '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',
            redirect_uri: 'http://localhost:3000/callback',
            grant_type: 'authorization_code'
    }).then(r =>
        res.status(200).send(r.data)
    ).catch(e => res.status(400).send(e))
})

module.exports = router

