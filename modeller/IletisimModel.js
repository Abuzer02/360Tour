var mongoose = require('../app').mongoose;

var IletisimSchema = new mongoose.Schema({
    ad :String,
    email:String,
    mesaj:String
});

module.exports = mongoose.model('iletişim', IletisimSchema);
