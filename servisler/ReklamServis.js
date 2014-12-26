var ReklamModel = require('../modeller/ReklamModel');

module.exports = function() {
    return {

        tumreklamlarilistele : function(req, res) {
            ReklamModel.find({} , function(err, reklam) {
                if(err)
                    res.send("300 - listalllong - db error");
                    
                res.setHeader('Content-Type', 'application/json');
                res.send(reklam);
            });
        },
        arama: function(req, res) {
            ReklamModel.find(req.body.search, req.body.output, function(err, reklam) {
                if(err)
                    res.send("300 - search - db error");

                res.setHeader('Content-Type', 'application/json');
                res.send(reklam);
            });
        },

        ekle: function(req, res) {
            new ReklamModel(req.body).save(function (e, reklam) {
                if(!e)
                    res.end(JSON.stringify({_id : reklam._id}));
                else
                    res.end('{"error" : "Database Error", "status" : 300}');
            });
        },

        hepsinisil: function(req, res) {
            ReklamModel.remove({}, function() {
                res.send('200 - removeall - all removed');
            });
        },

        sil: function(req, res) {
            ReklamModel.remove({_id : req.body._id}, function() {
                res.end('{"success" : "Removed Successfully", "status" : 200}');
            });
        },

          guncelle: function(req, res) {
            ReklamModel.findById(req.body._id, function(err, reklam) {
                if(reklam == null) {
                    res.send(JSON.stringify({
                        code : 404,
                        message : req.body._id + " : reklam sistemde kayitli bulunmadi"
                    }));
                    return;
                }
                reklam.update(req.body, function(e) {
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
