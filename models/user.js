var mongo = require('mongoose');


var contactModel = new mongo.Schema({
    name: {type: String},
    officeContact: {type: String},
    personalContact: {type: String},
    address: {type: String}
});


var model = module.exports = mongo.model('myContact',contactModel);