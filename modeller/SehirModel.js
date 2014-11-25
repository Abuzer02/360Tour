var mongoose = require('../app').mongoose;

var SehirSchema = new mongoose.Schema({
    sehir :String,
     ulke :String,
});

module.exports = mongoose.model('sehirler', SehirSchema);
