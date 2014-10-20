var mongoose = require('../app').mongoose;

var KullaniciSchema = new mongoose.Schema({
    ad: String,
    soyad: String,
    sifre: String,
});

module.exports = mongoose.model('kullanicilar', KullaniciSchema);
