var mongoose = require('../app').mongoose;

var MetaSchema = new mongoose.Schema({
    sayfa :String,
    metaElemani:String,
    icerik:String
});

module.exports = mongoose.model('metalar', MetaSchema);
