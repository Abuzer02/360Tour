var MetaElemanlariModel = require('../modeller/MetaElemanlariModel');

module.exports = function() {
    return {

        listele : function(req, res) {
            MetaElemanlariModel.find({} , function(err,metaElemani) {
                if(err)
                    res.send("300 - listalllong - db error");
                    
                res.setHeader('Content-Type', 'application/json');
                res.send(metaElemani);
            });
        },
        arama: function(req, res) {
            MetaElemanlariModel.find(req.body.search, req.body.output, function(err, metaElemani) {
                if(err)
                    res.send("300 - search - db error");

                res.setHeader('Content-Type', 'application/json');
                res.send(metaElemani);
            });
        },

        ekle: function(req, res) {
            var objMetaElemani={metaElemani:req.body.metaElemani};
            new MetaElemanlariModel(objMetaElemani).save(function (e, metaElemani) {
                if(!e)
                    res.end(JSON.stringify({_id : metaElemani._id}));
                else
                    res.end('{"error" : "Database Error", "status" : 300}');
            });
        },

        hepsinisil: function(req, res) {
            MetaElemanlariModel.remove({}, function() {
                res.send('200 - removeall - all removed');
            });
        },

        sil: function(req, res) {
            MetaElemanlariModel.remove({_id : req.body._id}, function() {
                res.end('{"success" : "Removed Successfully", "status" : 200}');
            });
        },
          guncelle: function(req, res) {
            MetaElemanlariModel.findById(req.body._id, function(err, metaElemani) {
                if(metaElemani == null) {
                    res.send(JSON.stringify({
                        code : 404,
                        message : req.body._id + " :  sistemde kayitli bulunmadi"
                    }));
                    return;
                }
                metaElemani.update(req.body, function(e) {
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
