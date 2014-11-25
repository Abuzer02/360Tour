var mongoose = require('../app').mongoose;

var UlkeSchema = new mongoose.Schema({
    ulke :String,
});

module.exports = mongoose.model('ulkeler', UlkeSchema);
