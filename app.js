var express    = require('express');
var path       = require('path');
var app        = express();
var mongoose   = require('mongoose');

app.configure(function () {

    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/sayfalar');

    app.use(express.favicon());
    app.use(express.logger('dev'));

    app.use(express.bodyParser());
    app.use(express.cookieParser('360tour'));

    app.use(express.session({
        // now cancel db session
        // store: new MongoStore({
        //     db: Config.dbName,
        //     host: Config.host,
        //     port: Config.port 
        // }),
        secret: '360tourlkajdflkjeadf234ojsdfslkasd'
    }));

    app.use(express.static(path.join(__dirname, 'sayfalar')));
});

mongoose.connect("mongodb://localhost/myapp");

module.exports = {
    app      : app,
    mongoose : mongoose
};

//var HesapServisi = require('relative path verilmeli - ./klasör adı/dosya adı -, - ./servisler/servis1.js - ')(mongoose)//db parametresi;
var HtmlServis = require('./servisler/HtmlServis');

//url den gönderilen http requestleri nasıl kullanıcağımızı belirlediğimiz bölüm
//örnek url den lcoalhost:3000 cağırılırsa yapılacaklar

//sayfalar
app.get("/" ,HtmlServis.anasayfa);

//webservis operasyonları
//app.get("/kullanici/tumVerileriGetir","KullanıcıSerivis.tumumuGetir");
app.listen(3000);
console.log("360tour is started on port 3000");