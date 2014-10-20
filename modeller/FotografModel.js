var mongoose = require('../app').mongoose;

var FotografSchema = new mongoose.Schema({
    ad: String,
    url:String,
    kategori: String,
    eklemeTarihi: String,
    tiklanmaSayisi: String,
    likeSayisi: String,
    dislikeSayisi: String,
    aciklama: String,
});

module.exports = mongoose.model('fotograflar', FotografSchema);
