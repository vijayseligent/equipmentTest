var Joi = require('joi')
exports.validatePOSTEquipment = function (req) {
    let error;
    error = validatePOSTEquipmentBODYPARAMS(req.body);
    if (error.error) {
        return error;
    }
    return error;
}

exports.validateGETEquipment = function (req) {
    let error;
    error = validatePUTEquipmentBODYPARAMS(req.body);
    if (error.error) {
        return error;
    }
    return error;
}

exports.validatePUTEquipment = function (req) {
    let error;
    error = validatePUTEquipmentBODYPARAMS(req.body);
    if (error.error) {
        return error;
    }
    return error;
}

function validatePUTEquipmentBODYPARAMS(body) {
    var schema = Joi.object().keys({
        equipId: Joi.string().alphanum().trim().length(24),
        enumber: Joi.string().alphanum().trim().length(10).required(),
        sdate: Joi.string().trim().regex(/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/[12]\d{3}/).required(),
        edate: Joi.string().trim().regex(/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/[12]\d{3}/).required(), //pass in a day month year value to search, only backend should do tim calculations, generate time when inserting
        address: Joi.string().regex(/^[a-zA-Z0-9.,_' -]{0,30}$/).allow(''),
        status: Joi.boolean().required()
    });
    return Joi.validate(body, schema);
}

function validatePOSTEquipmentBODYPARAMS(body) {
    var schema = Joi.object()
        .keys({
            enumber: Joi.string().alphanum().trim().length(10).required(),
            sdate: Joi.string().trim().regex(/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/[12]\d{3}/).required(),
            edate: Joi.string().trim().regex(/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/[12]\d{3}/).required(), //pass in a day month year value to search, only backend should do tim calculations, generate time when inserting
            address: Joi.string().regex(/^[a-zA-Z0-9.,_' -]{0,30}$/).allow(''),
            status: Joi.boolean().required()
        })
    return Joi.validate(body, schema);
}