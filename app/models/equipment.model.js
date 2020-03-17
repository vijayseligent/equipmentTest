var mongoose = require('mongoose');

var EquipmentSchema = mongoose.Schema({
    enumber: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    address: String,
    sdate: {
        type: String,
        required: true
    },
    edate: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Equipment', EquipmentSchema);