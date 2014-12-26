var mongoose = require('../app').mongoose;

var ReklamSchema = new mongoose.Schema({
    eklemeYeri:String,
    eklenenKaynak:String
});

module.exports = mongoose.model('reklamlar', ReklamSchema);
