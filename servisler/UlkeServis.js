var UlkeModel = require('../modeller/UlkeModel');

module.exports = function() {
    return {

        tumulkelerilistele : function(req, res) {
            UlkeModel.find({} , function(err, ulke) {
                if(err)
                    res.send("300 - listalllong - db error");
                    
                res.setHeader('Content-Type', 'application/json');
                res.send(ulke);
            });
        },
        arama: function(req, res) {
            UlkeModel.find(req.body.search, req.body.output, function(err, ulke) {
                if(err)
                    res.send("300 - search - db error");

                res.setHeader('Content-Type', 'application/json');
                res.send(ulke);
            });
        },

        ekle: function(req, res) {
            new UlkeModel(req.body).save(function (e, ulke) {
                if(!e)
                    res.end(JSON.stringify({_id : ulke._id}));
                else
                    res.end('{"error" : "Database Error", "status" : 300}');
            });
        },

        hepsinisil: function(req, res) {
            UlkeModel.remove({}, function() {
                res.send('200 - removeall - all removed');
            });
        },

        sil: function(req, res) {
            UlkeModel.remove({_id : req.body._id}, function() {
                res.end('{"success" : "Removed Successfully", "status" : 200}');
            });
        },
          guncelle: function(req, res) {
            UlkeModel.findById(req.body._id, function(err, ulke) {
                if(ulke == null) {
                    res.send(JSON.stringify({
                        code : 404,
                        message : req.body._id + " : Kisi sistemde kayitli bulunmadi"
                    }));
                    return;
                }
                ulke.update(req.body, function(e) {
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
