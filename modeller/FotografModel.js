var mongoose = require('../app').mongoose;

var FotografSchema = new mongoose.Schema({
    url:String,
    url360Tour:String,
    frameSrc: String,
    ad: String,
    sehir :String,
    ulke :String,
    kategori: String,
    eklemeTarihi: String,
    aciklama: String,
    aciklamaOzet:String,
    tiklanmaSayisi:String
});

module.exports = mongoose.model('fotograflar', FotografSchema);
