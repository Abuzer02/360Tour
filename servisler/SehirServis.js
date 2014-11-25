var SehirModel = require('../modeller/SehirModel');

module.exports = function() {
    return {

        tumsehirlerilistele : function(req, res) {
            SehirModel.find({} , function(err, sehir) {
                if(err)
                    res.send("300 - listalllong - db error");
                    
                res.setHeader('Content-Type', 'application/json');
                res.send(sehir);
            });
        },
        arama: function(req, res) {
            SehirModel.find(req.body.search, req.body.output, function(err, sehir) {
                if(err)
                    res.send("300 - search - db error");

                res.setHeader('Content-Type', 'application/json');
                res.send(sehir);
            });
        },

        ekle: function(req, res) {
            new SehirModel(req.body).save(function (e, sehir) {
                if(!e)
                    res.end(JSON.stringify({_id : sehir._id}));
                else
                    res.end('{"error" : "Database Error", "status" : 300}');
            });
        },

        hepsinisil: function(req, res) {
            SehirModel.remove({}, function() {
                res.send('200 - removeall - all removed');
            });
        },

        sil: function(req, res) {
            SehirModel.remove({_id : req.body._id}, function() {
                res.end('{"success" : "Removed Successfully", "status" : 200}');
            });
        },
          guncelle: function(req, res) {
            SehirModel.findById(req.body._id, function(err, sehir) {
                if(sehir == null) {
                    res.send(JSON.stringify({
                        code : 404,
                        message : req.body._id + " : Kisi sistemde kayitli bulunmadi"
                    }));
                    return;
                }
                sehir.update(req.body, function(e) {
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
