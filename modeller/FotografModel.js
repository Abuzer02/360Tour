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
    tiklanmaSayisi:Number,
    yorumlar:[{ad:String, soyad:String, cinsiyet:String ,yorum:String,onay:Boolean,yorumEklemeTarihi:String}],
    metalar :[{ad:String, icerik:String}]
});

module.exports = mongoose.model('fotograflar', FotografSchema);
