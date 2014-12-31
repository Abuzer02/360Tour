var mongoose = require('../app').mongoose;

var MetaElemanlariSchema = new mongoose.Schema({
    metaElemani :String,
});

module.exports = mongoose.model('metaElemanlari', MetaElemanlariSchema);
