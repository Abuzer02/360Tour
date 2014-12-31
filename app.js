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
var SehirServis            = require('./servisler/SehirServis')(mongoose);
var UlkeServis             = require('./servisler/UlkeServis')(mongoose);
var YuklemeServis          = require("./servisler/YuklemeServis");
var KullaniciHesapServis   = require("./servisler/KullaniciHesapServis")(mongoose);
var DosyaServis            = require("./servisler/DosyaServis");
var IletisimServis         = require("./servisler/IletisimServis")(mongoose);
var PagerServis            = require("./servisler/PagerServis")(mongoose);
var ReklamServis           = require("./servisler/ReklamServis")(mongoose);
var MetaElemanlariServis   = require("./servisler/MetaElemanlariServis")(mongoose);
var MetaServis             = require("./servisler/MetaServis")(mongoose);
//url den gönderilen http requestleri nasıl kullanıcağımızı belirlediğimiz bölüm
//örnek url den lcoalhost:3000 cağırılırsa yapılacaklar

//sayfalar

app.get("/"                        ,HtmlServis.anasayfa);
app.get("/admin"                   ,KullaniciHesapServis.sessionCheck,HtmlServis.admin);
app.get("/login"                   ,HtmlServis.login);
app.post("/login"                  ,KullaniciHesapServis.login);
app.post("/logout"                 ,KullaniciHesapServis.logout);
app.get("/kullanicilar"            ,HtmlServis.kullanicilar);
app.get("/hakkinda"                ,HtmlServis.hakkinda);
app.get("/fotografincele/:id/:ad"  ,HtmlServis.fotografincele);
//webservis kullanıcılar operasyonları
app.post("/fotograf/pager"                   ,PagerServis.sayfalistele);
app.post("/fotograf/fotosayisi"              ,PagerServis.fotosayisi);
app.get("/kullanici/tumkullanicilarilistele" ,KullanicilarServis.tumkullanicilarilistele);
app.post("/kullanici/arama"                  ,KullanicilarServis.arama);
app.post("/kullanici/ekle"                   ,KullanicilarServis.ekle);
app.get("/kullanici/hepsinisil"              ,KullanicilarServis.hepsinisil);
app.post("/kullanici/sil"                    ,KullanicilarServis.sil);
app.post("/kullanici/guncelle"               ,KullanicilarServis.guncelle);

//reklam 
app.get("/reklam/tumreklamlarilistele"     ,ReklamServis.tumreklamlarilistele);
app.post("/reklam/arama"                  ,ReklamServis.arama);
app.post("/reklam/ekle"                   ,ReklamServis.ekle);
app.get("/reklam/hepsinisil"              ,ReklamServis.hepsinisil);
app.post("/reklam/sil"                    ,ReklamServis.sil);
app.post("/reklam/guncelle"               ,ReklamServis.guncelle);

//webservis fotograflar operasyonları

app.get("/fotograf/tumfotograflarilistele" ,FotografServis.tumfotograflarilistele);
app.post("/fotograf/arama"                 ,FotografServis.arama);
app.post("/fotograf/ekle"                  ,FotografServis.ekle);
app.get("/fotograf/hepsinisil"             ,FotografServis.hepsinisil);
app.post("/fotograf/sil"                   ,FotografServis.sil);
app.post("/fotograf/guncelle"              ,FotografServis.guncelle);
app.post("/fotograf/tiklanmasayisiguncelle",FotografServis.tiklanmaSayisiGuncelle);
app.get("/fotograf/tiklanmasayisinagoresirala",FotografServis.tiklanmaSayisinaGoreSirala);
app.get("/fotograf/ensoneklenenlerilistele",FotografServis.enSonEklenenleriListele);
app.post("/fotograf/add/array"              , FotografServis.arrayObjectAdd);
app.post("/fotograf/remove/array"           , FotografServis.arrayObjectRemove);
app.post("/fotograf/guncelle/array"         , FotografServis.arrayObjectUpdate);
//webservis kategori operasyonlar

app.get("/kategori/tumkategorilerilistele" ,KategoriServis.tumkategorilerilistele);
app.post("/kategori/arama"                 ,KategoriServis.arama);
app.post("/kategori/ekle"                  ,KategoriServis.ekle);
app.get("/kategori/hepsinisil"             ,KategoriServis.hepsinisil);
app.post("/kategori/sil"                   ,KategoriServis.sil);
app.post("/kategori/guncelle"              ,KategoriServis.guncelle);

app.get("/metaelemanlari/listele"          ,MetaElemanlariServis.listele);
app.post("/metaelemanlari/arama"           ,MetaElemanlariServis.arama);
app.post("/metaelemanlari/ekle"            ,MetaElemanlariServis.ekle);
app.get("/metaelemanlari/hepsinisil"       ,MetaElemanlariServis.hepsinisil);
app.post("/metaelemanlari/sil"             ,MetaElemanlariServis.sil);
app.post("/metaelemanlari/guncelle"        ,MetaElemanlariServis.guncelle);

app.get("/meta/listele"                    ,MetaServis.listele);
app.post("/meta/arama"                     ,MetaServis.arama);
app.post("/meta/ekle"                      ,MetaServis.ekle);
app.get("/meta/hepsinisil"                 ,MetaServis.hepsinisil);
app.post("/meta/sil"                       ,MetaServis.sil);
app.post("/meta/guncelle"                  ,MetaServis.guncelle);

app.get("/sehir/tumsehirlerilistele"       ,SehirServis.tumsehirlerilistele);
app.post("/sehir/arama"                    ,SehirServis.arama);
app.post("/sehir/ekle"                     ,SehirServis.ekle);
app.get("/sehir/hepsinisil"                ,SehirServis.hepsinisil);
app.post("/sehir/sil"                      ,SehirServis.sil);
app.post("/sehir/guncelle"                 ,SehirServis.guncelle);

app.get("/ulke/tumulkelerilistele"         ,UlkeServis.tumulkelerilistele);
app.post("/ulke/arama"                     ,UlkeServis.arama);
app.post("/ulke/ekle"                      ,UlkeServis.ekle);
app.get("/ulke/hepsinisil"                 ,UlkeServis.hepsinisil);
app.post("/ulke/sil"                       ,UlkeServis.sil);
app.post("/ulke/guncelle"                  ,UlkeServis.guncelle);

app.get("/iletisim/tummesajlarilistele"     ,IletisimServis.tummesajlarilistele);
app.post("/iletisim/arama"                  ,IletisimServis.arama);
app.post("/iletisim/ekle"                   ,IletisimServis.ekle);
app.get("/iletisim/hepsinisil"              ,IletisimServis.hepsinisil);
app.post("/iletisim/sil"                    ,IletisimServis.sil);
app.post("/iletisim/guncelle"               ,IletisimServis.guncelle);
 

app.post("/yukle/resimyukle"               ,YuklemeServis.ResimYukle );
app.post("/dosya/dosyasil"                 ,DosyaServis.dosyaSil);

app.listen(3000);
console.log("360tour is started on port 3000");