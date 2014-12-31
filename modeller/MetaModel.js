var mongoose = require('../app').mongoose;

var MetaSchema = new mongoose.Schema({
    ad:String,
    icerik:String
});

module.exports = mongoose.model('metalar', MetaSchema);
