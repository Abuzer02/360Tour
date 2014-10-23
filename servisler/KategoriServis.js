var KategoriModel = require('../modeller/KategoriModel');

module.exports = function() {
    return {

        tumkategorilerilistele : function(req, res) {
            KategoriModel.find({} , function(err, kategori) {
                if(err)
                    res.send("300 - listalllong - db error");
                    
                res.setHeader('Content-Type', 'application/json');
                res.send(kategori);
            });
        },
        arama: function(req, res) {
            KategoriModel.find(req.body.search, req.body.output, function(err, kategori) {
                if(err)
                    res.send("300 - search - db error");

                res.setHeader('Content-Type', 'application/json');
                res.send(kategori);
            });
        },

        ekle: function(req, res) {
            new KategoriModel(req.body).save(function (e, kategori) {
                if(!e)
                    res.end(JSON.stringify({_id : kategori._id}));
                else
                    res.end('{"error" : "Database Error", "status" : 300}');
            });
        },

        hepsinisil: function(req, res) {
            KategoriModel.remove({}, function() {
                res.send('200 - removeall - all removed');
            });
        },

        sil: function(req, res) {
            KategoriModel.remove({_id : req.body._id}, function() {
                res.end('{"success" : "Removed Successfully", "status" : 200}');
            });
        },
          guncelle: function(req, res) {
            KategoriModel.findById(req.body._id, function(err, kategori) {
                if(kategori == null) {
                    res.send(JSON.stringify({
                        code : 404,
                        message : req.body._id + " : Kisi sistemde kayitli bulunmadi"
                    }));
                    return;
                }
                kategori.update(req.body, function(e) {
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
