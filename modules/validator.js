const joi = require('joi')

const validate = ((req, res, next) => {
    const schemaValidate = joi.object({
        name: joi.string().required(),
        email: joi.string().required().email(),
        password: joi.string().min(8).required()
    })
    let data = schemaValidate.validate(req.body)
    if (data.error) {
        res.send("Data not valid please try again")
    }
    else {
        next();
    }
});

const valiUpdate = ((req, res, next) => {
    const UpdatedValid = joi.object({
        name: joi.string(),
        email: joi.string().email(),
        password: joi.string().min(8)
    })
    let data = UpdatedValid.validate(req.body)
    if (data.error) {
        res.send("data not valid, try again")
    }
    else {
        next()
    }
});

module.exports = { validate, valiUpdate }