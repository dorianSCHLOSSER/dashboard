const Joi = require('joi')


const validateRegister = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .max(32)
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    })
    return schema.validate(data)
}

const validateLogin = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .max(32)
            .required(),
        password: Joi.string()
            .min(7)
            .max(32)
            .required()
    })
    return schema.validate(data)
}
module.exports.validateRegister = validateRegister
module.exports.validateLogin = validateLogin