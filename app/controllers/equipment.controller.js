const connectToDatabase = require('../db.js');
var Equipment = require('../models/equipment.model.js');
var validate = require('../validator/equipment_validation.js')
var moment = require('moment');

exports.create = function (req, res) {
    if (!req.body.enumber) {
        res.status(400).send({
            message: "Equipment number can not be empty"
        });
    }
    connectToDatabase()
        .then(() => {
            var equip = new Equipment({
                enumber: req.body.enumber,
                sdate: moment(req.body.sdate).format('L') || moment().format('L'),
                edate: moment(req.body.edate).format('L') || moment().format('L'),
                status: req.body.status || false,
                address: req.body.address || ""
            });
            equip.save(function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(500).send({
                        message: "Some error occurred while creating the equipment."
                    });
                } else {
                    res.send(data);
                }
            });
        });
};

exports.findAll = function (req, res) {
    const num_results = (req.query.limit) ? parseInt(req.query.limit) : 100;
    connectToDatabase()
        .then(() => {
            Equipment.find(function (err, data) {
                if (err) {
                    res.status(500).send({
                        message: "Some error occurred while retrieving equipments)."
                    });
                } else {
                    res.send(data);
                }
            }).limit(num_results);
        })
        .catch(error => {
            console.log(error);
        });;
};

exports.findOne = function (req, res) {
    let {
        error
    } = validate.validatePOSTEquipment(req);
    if (error) {
        // 400 Bad Request
        console.log("Bad request");
        res.status(400).send({
            message: error.details[0].message
        });
        return;
    }

    connectToDatabase()
        .then(() => {
            Equipment.findById(req.params.equipId, function (err, data) {
                if (err) {
                    res.status(500).send({
                        message: "Could not retrieve equipment with id " + req.params.equipId
                    });
                } else {
                    if (data === null) {
                        res.status(400).send({
                            message: "No data found for this Id"
                        });
                    } else {
                        res.send(data);
                    }
                }
            });
        });
};

exports.update = function (req, res) {
    let {
        error
    } = validate.validatePUTEquipment(req);
    if (error) {
        // 400 Bad Request
        console.log("Bad request");
        res.status(400).send(error.details[0].message);
        return;
    }

    connectToDatabase()
        .then(() => {
            Equipment.findById(req.params.equipId, function (err, equip) {
                if (err) {
                    res.status(500).send({
                        message: "Could not find equipment with id " + req.params.equipId
                    });
                }
                equip._id = req.params.equipId;
                equip.enumber = req.body.enumber;
                equip.address = req.body.address;
                equip.sdate = moment(req.body.sdate).format('L') || moment().format('L');
                equip.edate = moment(req.body.edate).format('L') || moment().format('L');
                equip.status = req.body.status;

                equip.save(function (err, data) {
                    if (err) {
                        res.status(500).send({
                            message: "Could not update equipment with id " + req.params.equipId
                        });
                    } else {
                        res.send(data);
                    }
                });
            });
        });
};

exports.delete = function (req, res) {
    connectToDatabase()
        .then(() => {
            Equipment.remove({
                _id: req.params.equipId
            }, function (err, data) {
                if (err) {
                    res.status(500).send({
                        message: "Could not delete equipment with id " + req.params.equipId
                    });
                } else {
                    res.send({
                        message: "Equipment deleted successfully!"
                    })
                }
            });
        });
};