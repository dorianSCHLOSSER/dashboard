const router = require('express').Router()
const User = require('../models/User')
const jwt = require ('jsonwebtoken')
const bcrypt = require('bcrypt')
const {validateRegister, validateLogin} = require('../validate')


router.post('/register', async(req, res) => {
    /* const {error} = validateRegister(req.body)
    
    if (error)
        return res.status(400).send(error.details[0].message)

 */
    const alreadyRegistered = await User.findOne({username: req.body.username})
    if (alreadyRegistered) return res.status(400).send("User already exists. If you are this user, try to login.")

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt)

    try {
        await User.create({
            username: req.body.username,
            password: hashed
        })
        res.status(200).send({Status: 'User created.'})
    }catch (e) {
        res.status(400).send(e)
    }
})

router.post('/login', async(req, res) => {
    const {err} = validateLogin(req.body)
    if (err)
        return res.status(400).send(err.details[0].message)

    const user = await User.findOne({username: req.body.username})
    if (!user)
        return res.status(400).send('This user doesnt exist, try to register a new user.')
    
    const validatePassword = await bcrypt.compare(req.body.password, user.password)
    if (!validatePassword)
        return res.status(401).send ('Invalid Password');
    
    const token = jwt.sign({_id: user._id}, process.env.TOKENSECRET)
    res.status(200).header('jwt_token', token).send({
        Status: "Success Loging In",
        Username: user.username,
        Token: token
    })
})

module.exports = router