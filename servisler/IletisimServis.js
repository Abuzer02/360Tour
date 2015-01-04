var IletisimModel = require('../modeller/IletisimModel');

module.exports = function() {
    return {

        tummesajlarilistele : function(req, res) {
            IletisimModel.find({} , function(err, mesaj) {
                if(err)
                    res.send("300 - listalllong - db error");
                    
                res.setHeader('Content-Type', 'application/json');
                res.send(mesaj);
            });
        },
        arama: function(req, res) {
            IletisimModel.find(req.body.search, req.body.output, function(err, mesaj) {
                if(err)
                    res.send("300 - search - db error");

                res.setHeader('Content-Type', 'application/json');
                res.send(mesaj);
            });
        },

        ekle: function(req, res) {
            var mesajObj={ad:req.body.ad,email:req.body.email,mesaj:req.body.message};
            
            new IletisimModel(mesajObj).save(function (e, mesaj) {
                if(!e)
                    res.end();
                else
                    res.end('{"error" : "Database Error", "status" : 300}');
            });
        },

        hepsinisil: function(req, res) {
            IletisimModel.remove({}, function() {
                res.send('200 - removeall - all removed');
            });
        },

        sil: function(req, res) {
            IletisimModel.remove({_id : req.body._id}, function() {
                res.end('{"success" : "Removed Successfully", "status" : 200}');
            });
        },

          guncelle: function(req, res) {
            IletisimModel.findById(req.body._id, function(err, mesaj) {
                if(mesaj == null) {
                    res.send(JSON.stringify({
                        code : 404,
                        message : req.body._id + " : mesaj sistemde kayitli bulunmadi"
                    }));
                    return;
                }
                mesaj.update(req.body, function(e) {
                    if(err) {
                        res.send(JSON.stringify({
                            code : 300,
                            message : req.body._id + " : Ozur dileriz, veritabaninda bir sorun olustu, tekrar deneyiniz"
                        }));
                        return;
                    }
                   
                    res.send(JSON.stringify({
                        code : 200,
                        message : req.body._id + " : mesaj basari ile update edildi"
                    }));
                });
            });
        }
    }
};
