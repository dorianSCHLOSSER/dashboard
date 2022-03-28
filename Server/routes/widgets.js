const router = require('express').Router()
const Widget = require('../models/Widget')
const verify = require('../checkToken')

router.post('/create', verify, async (req, res) => {

   try {
        const widget = await Widget.create({
            user: req.user,
            serviceName: req.body.serviceName,
            position: req.body.position,
            widgetData: {
                name: req.body.widgetData.name,
                params: req.body.widgetData.params
            }

        })
       console.log(widget)
        res.status(200).send(widget)
   }catch(e) {
        res.status(400).send(e)
   }
})

router.get('/get', verify, async(req, res) => {
    const widgets = await Widget.find({user: req.user})
    if (!widgets) return res.status(201).send({Status: "No widget found"})

    try {
        res.status(200).send(widgets)
    }catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/deleteWidget', verify, async(req, res) => {
    const widget = await Widget.findById(req.query.id)
    if (!widget) return res.status(400).send({Status: 'No widget found'})

    await widget.remove(() => {
        res.status(200).send({Status: 'Widget removed'})
    })
})

module.exports = router