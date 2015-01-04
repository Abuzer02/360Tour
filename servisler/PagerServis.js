var FotografModel = require('../modeller/FotografModel');
module.exports = function() {
    return {

        sayfalistele : function(req, res) {
            var searcCriteria={};
            if(req.body.ulke!=""){searcCriteria.ulke=req.body.ulke;}
            if(req.body.sehir!=""){searcCriteria.sehir=req.body.sehir;}
            if(req.body.kategori!=""){searcCriteria.kategori=req.body.kategori;}
            FotografModel.find(searcCriteria ,{},{limit : req.body.limit ,skip:req.body.skip},function(err, fotograf) {
                if(err)
                    res.send("300 - listalllong - db error");
                    
                res.setHeader('Content-Type', 'application/json');
                res.send({fotograf : fotograf});
            });
        },
        fotosayisi : function(req, res){
            var searcCriteria={};
            if(req.body.ulke!=""){searcCriteria.ulke=req.body.ulke;}
            if(req.body.sehir!=""){searcCriteria.sehir=req.body.sehir;}
            if(req.body.kategori!=""){searcCriteria.kategori=req.body.kategori;}
             FotografModel.count(searcCriteria,function(err, fotoCount) {
                if(err)
                    res.send("300 - listalllong - db error");
                    
                res.setHeader('Content-Type', 'application/json');
                res.send({fotografSayisi : fotoCount});
             });
        }        
    }
};
