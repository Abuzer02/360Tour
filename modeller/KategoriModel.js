var mongoose = require('../app').mongoose;

var KategoriSchema = new mongoose.Schema({
    kategori :String,
});

module.exports = mongoose.model('kategoriler', KategoriSchema);
