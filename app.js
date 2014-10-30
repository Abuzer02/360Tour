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

var HtmlServis             = require('./servisler/HtmlServis');
var KullanicilarServis     = require('./servisler/KullanicilarServis')(mongoose);
var FotografServis         = require('./servisler/FotografServis')(mongoose);
var KategoriServis         = require('./servisler/KategoriServis')(mongoose);
var YuklemeServis          = require("./servisler/YuklemeServis");
var KullaniciHesapServis   = require("./servisler/KullaniciHesapServis")(mongoose);
var DosyaServis            = require("./servisler/DosyaServis");
//url den gönderilen http requestleri nasıl kullanıcağımızı belirlediğimiz bölüm
//örnek url den lcoalhost:3000 cağırılırsa yapılacaklar

//sayfalar

app.get("/"                  ,HtmlServis.anasayfa);
app.get("/admin"             ,KullaniciHesapServis.sessionCheck,HtmlServis.admin);
app.get("/login"             ,HtmlServis.login);
app.post("/login"            ,KullaniciHesapServis.login);
app.post("/logout"           ,KullaniciHesapServis.logout);
app.get("/kullanicilar"      ,HtmlServis.kullanicilar);
app.get("/hakkinda"          ,HtmlServis.hakkinda);

//webservis kullanıcılar operasyonları

app.get("/kullanici/tumkullanicilarilistele" ,KullanicilarServis.tumkullanicilarilistele);
app.post("/kullanici/arama"                  ,KullanicilarServis.arama);
app.post("/kullanici/ekle"                   ,KullanicilarServis.ekle);
app.get("/kullanici/hepsinisil"              ,KullanicilarServis.hepsinisil);
app.post("/kullanici/sil"                    ,KullanicilarServis.sil);
app.post("/kullanici/guncelle"               ,KullanicilarServis.guncelle);

//webservis fotograflar operasyonları

app.get("/fotograf/tumfotograflarilistele" ,FotografServis.tumfotograflarilistele);
app.post("/fotograf/arama"                 ,FotografServis.arama);
app.post("/fotograf/ekle"                  ,FotografServis.ekle);
app.get("/fotograf/hepsinisil"             ,FotografServis.hepsinisil);
app.post("/fotograf/sil"                   ,FotografServis.sil);
app.post("/fotograf/guncelle"              ,FotografServis.guncelle);

//webservis kategori operasyonları

app.get("/kategori/tumkategorilerilistele" ,KategoriServis.tumkategorilerilistele);
app.post("/kategori/arama"                 ,KategoriServis.arama);
app.post("/kategori/ekle"                  ,KategoriServis.ekle);
app.get("/kategori/hepsinisil"             ,KategoriServis.hepsinisil);
app.post("/kategori/sil"                   ,KategoriServis.sil);
app.post("/kategori/guncelle"              ,KategoriServis.guncelle);

app.post("/yukle/resimyukle"               ,YuklemeServis.ResimYukle );
app.post("/dosya/dosyasil"                 ,DosyaServis.dosyaSil);

app.listen(3000);
console.log("360tour is started on port 3000");