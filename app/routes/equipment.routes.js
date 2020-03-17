module.exports = function (app) {
    var equipment = require('../controllers/equipment.controller.js');
    app.post('/equipment', equipment.create);
    app.get('/equipment', equipment.findAll);
    app.get('/equipment/:equipId', equipment.findOne);
    app.put('/equipment/:equipId', equipment.update);
    app.delete('/equipment/:equipId', equipment.delete);
}