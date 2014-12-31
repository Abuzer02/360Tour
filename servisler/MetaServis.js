var MetaModel = require('../modeller/MetaModel');

module.exports = function() {
    return {

        listele : function(req, res) {
            MetaModel.find({} , function(err,meta) {
                if(err)
                    res.send("300 - listalllong - db error");
                    
                res.setHeader('Content-Type', 'application/json');
                res.send(meta);
            });
        },
        arama: function(req, res) {
            MetaModel.find(req.body.search, req.body.output, function(err, meta) {
                if(err)
                    res.send("300 - search - db error");

                res.setHeader('Content-Type', 'application/json');
                res.send(meta);
            });
        },

        ekle: function(req, res) {
            new MetaModel(req.body).save(function (e, meta) {
                if(!e)
                    res.end(JSON.stringify({_id : meta._id}));
                else
                    res.end('{"error" : "Database Error", "status" : 300}');
            });
        },

        hepsinisil: function(req, res) {
            MetaModel.remove({}, function() {
                res.send('200 - removeall - all removed');
            });
        },

        sil: function(req, res) {
            MetaModel.remove({_id : req.body._id}, function() {
                res.end('{"success" : "Removed Successfully", "status" : 200}');
            });
        },
          guncelle: function(req, res) {
            MetaModel.findById(req.body._id, function(err, meta) {
                if(meta == null) {
                    res.send(JSON.stringify({
                        code : 404,
                        message : req.body._id + " :  sistemde kayitli bulunmadi"
                    }));
                    return;
                }
                meta.update(req.body, function(e) {
                    if(err) {
                        res.send(JSON.stringify({
                            code : 300,
                            message : req.body._id + " : Ozur dileriz, veritabaninda bir sorun olustu, tekrar deneyiniz"
                        }));
                        return;
                    }
                   
                    res.send(JSON.stringify({
                        code : 200,
                        message : req.body._id + " : basari ile güncellendi"
                    }));
                });
            });
        }
    }
};
