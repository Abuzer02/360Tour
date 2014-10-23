var mongoose = require('../app').mongoose;

var FotografSchema = new mongoose.Schema({
    url:String,
    ad: String,
    sehir :String,
    ulke :String,
    kategori: String,
    eklemeTarihi: String,
    aciklama: String,
});

module.exports = mongoose.model('fotograflar', FotografSchema);
