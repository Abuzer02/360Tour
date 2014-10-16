var express    = require('express');
var app        = express();
var mongoose   = require('mongoose');

mongoose.connect("mongodb://localhost/myapp");

module.exports = {
    app      : app,
    mongoose : mongoose
};

//var HesapServisi = require('relative path verilmeli - ./klasör adı/dosya adı -, - ./servisler/servis1.js - ')(mongoose)//db parametresi;


//url den gönderilen http requestleri nasıl kullanıcağımızı belirlediğimiz bölüm
//örnek url den lcoalhost:3000 cağırılırsa yapılacaklar

//sayfalar
app.get("/" ,function(req,res){
   res.send("hello node"); 
});

//webservis operasyonları
//app.get("/kullanici/tumVerileriGetir","KullanıcıSerivis.tumumuGetir");
app.listen(3000);
console.log("360tour is started on port 3000");