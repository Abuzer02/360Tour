var KullaniciModel = require('../modeller/KullaniciModel');

module.exports = function() {
    return {
        adminEkle :function(req,res){
        var admin={ad:"metin",soyad:"ozturk",sifre:"admin"};
        new KullaniciModel(admin).save(function(err,msg){
            if(!err){
                res.end("basariyla eklendi");
            }else{
                res.end("hata!!! "+err);
            }
          });
        },
        tumkullanicilarilistele : function(req, res) {
            KullaniciModel.find({} , function(err, kullanici) {
                if(err)
                    res.send("300 - listalllong - db error");
                    
                res.setHeader('Content-Type', 'application/json');
                res.send(kullanici);
            });
        },
        arama: function(req, res) {
            KullaniciModel.find(req.body.search, req.body.output, function(err, kullanici) {
                if(err)
                    res.send("300 - search - db error");

                res.setHeader('Content-Type', 'application/json');
                res.send(kullanici);
            });
        },

        ekle: function(req, res) {
            new KullaniciModel(req.body).save(function (e, kullanici) {
                if(!e)
                    res.end(JSON.stringify({_id : kullanici._id}));
                else
                    res.end('{"error" : "Database Error", "status" : 300}');
            });
        },

        hepsinisil: function(req, res) {
            KullaniciModel.remove({}, function() {
                res.send('200 - removeall - all removed');
            });
        },

        sil: function(req, res) {
            KullaniciModel.remove({_id : req.body._id}, function() {
                res.end('{"success" : "Removed Successfully", "status" : 200}');
            });
        },

          guncelle: function(req, res) {
            KullaniciModel.findById(req.body._id, function(err, kullanici) {
                if(kullanici == null) {
                    res.send(JSON.stringify({
                        code : 404,
                        message : req.body._id + " : Kisi sistemde kayitli bulunmadi"
                    }));
                    return;
                }
                kullanici.update(req.body, function(e) {
                    if(err) {
                        res.send(JSON.stringify({
                            code : 300,
                            message : req.body._id + " : Ozur dileriz, veritabaninda bir sorun olustu, tekrar deneyiniz"
                        }));
                        return;
                    }
                   
                    res.send(JSON.stringify({
                        code : 200,
                        message : req.body._id + " : Kisi basari ile update edildi"
                    }));
                });
            });
        }
    }
};
