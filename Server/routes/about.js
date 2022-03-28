const router = require('express').Router()
const Service = require('../models/Service')

router.get('/', async(req, res) => {
    const services = await Service.find()

    res.status(200).json({
        client: {
            host: req.header('x-forwarded-for') || req.socket.remoteAddress
        },
        server: {
            current_time: Date.now(),
            services: services
        }
    })
})

module.exports = router