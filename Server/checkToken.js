const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    const token = req.header('auth-token')

    if (token == null) {
        return res.status(400).send({Status: 'Access Denied'})
    }

    try {
        req.user = jwt.verify(token, process.env.TOKENSECRET)
        next()
    } catch(e) {
        res.status(400).send('Invalid token value')
    }
}