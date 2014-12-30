var FotografModel = require('../modeller/FotografModel');

module.exports = function() {
    return {

        tumfotograflarilistele : function(req, res) {
            FotografModel.find({} , function(err, fotograf) {
                if(err)
                    res.send("300 - listalllong - db error");
                    
                res.setHeader('Content-Type', 'application/json');
                res.send(fotograf);
            });
        },
        arama: function(req, res) {
            FotografModel.find(req.body.search, req.body.output, function(err, fotograf) {
                if(err)
                    res.send("300 - search - db error");

                res.setHeader('Content-Type', 'application/json');
                res.send(fotograf);
            });
        },

        ekle: function(req, res) {
            new FotografModel(req.body).save(function (e, fotograf) {
                if(!e)
                    res.end(JSON.stringify({_id : fotograf._id}));
                else
                    res.end('{"error" : "Database Error", "status" : 300}');
            });
        },

        hepsinisil: function(req, res) {
            FotografModel.remove({}, function() {
                res.send('200 - removeall - all removed');
            });
        },

        sil: function(req, res) {
            FotografModel.remove({_id : req.body._id}, function() {
                res.end('{"success" : "Removed Successfully", "status" : 200}');
            });
        },

          guncelle: function(req, res) {
            FotografModel.findById(req.body._id, function(err, fotograf) {
                if(fotograf == null) {
                    res.send(JSON.stringify({
                        code : 404,
                        message : req.body._id + " : Kisi sistemde kayitli bulunmadi"
                    }));
                    return;
                }
                fotograf.update(req.body, function(e) {
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
        },
        tiklanmaSayisiGuncelle:function(req,res){
            FotografModel.findById(req.body._id,function(err,fotograf){
                if(fotograf==null){
                    res.send(JSON.stringify({
                        code : 404,
                        message : req.body._id+" : Fotograf sistemde kayıtlı değil"
                    }));
                    return;
                }
               fotograf.tiklanmaSayisi=parseFloat(fotograf.tiklanmaSayisi)+1;
                   fotograf.save(function(err,fotograf){
                     if(fotograf==null){
                        res.send(JSON.stringify({
                        code : 404,
                        message : req.body._id+" : Fotograf sistemde kayıtlı değil"
                     }));  
                      return;
                   }
                        res.send(JSON.stringify({
                        code : 200,
                        message : req.body._id+" :tıklanma sayısı başarı ile güncellendi"
                     }));    
                 });
                
            });
        },
        tiklanmaSayisinaGoreSirala:function(req,res){
            FotografModel.find({tiklanmaSayisi : {$gt : 0}},{},{sort : {tiklanmaSayisi : -1},limit:12},function(err,fotograf){
                if(fotograf==null){
                    res.send(JSON.stringify({
                        code : 404,
                        message :"fotograf bulunamadı"
                    }));
                    return;
                }
               // console.log(JSON.stringify({fotograf:fotograf}));
                res.send(JSON.stringify({fotograf:fotograf}));
            });
        },
        enSonEklenenleriListele:function(req,res){
            FotografModel.find({},{},{sort : {eklemeTarihi : -1},limit : 12},function(err,fotograf){
                if(fotograf==null){
                    res.send(JSON.stringify({
                        code : 404,
                        message :"fotograf bulunamadı"
                    }));
                    return;
                }
                res.send(JSON.stringify({fotograf : fotograf}));
            });
        },
        arrayObjectAdd: function(req, res) {
            
            var cinsiyet="";
            var date=new Date();
            if(req.body.rdErkek && req.body.rdErkek=="on")
            {
                cinsiyet="Erkek";
            }else if(req.body.rdBayan && req.body.rdBayan=="on"){
                cinsiyet="Bayan"
            }
            var array={"yorumlar":[{ad:req.body.ad,soyad:req.body.soyad,cinsiyet:cinsiyet,yorum:req.body.txtYorum,onay:false,yorumEklemeTarihi: date.getDate()+"."+date.getMonth()+"."+date.getFullYear()+"   ( "+date.getHours()+" : "+date.getMinutes()+" )"}]};
            console.log("yorumlar : "+JSON.stringify(array));
            FotografModel.update({_id: req.body._id},{$pushAll : array},function(err, data){
                if(err){
                        res.send(JSON.stringify({
                        code : 404,
                        message :"fotograf bulunamadı"
                    }));
                   return;
                }else{
                    FotografModel.findById(req.body._id, req.body.output, function(err, foto) {
                        res.send("Yorum Basarı ile eklendi");
                    });
                }
            });
         },
        arrayObjectUpdate : function(req, res) {
            console.log("girdi");
            FotografModel.update({'yorumlar._id': req.body.yorumId}, {'$set': {'yorumlar.$.onay': true}},function(err, data) {
                if(err) {
                    res.send(JSON.stringify({
                        code : 400,
                        message : req.body.search + " : Ozur dileriz, veritabaninda bir sorun olustu, tekrar deneyiniz"
                    }));
                    return;
                }
                res.send(JSON.stringify({
                    code : 200,
                    message : req.body.search+ " : yorumlar basari ile update edildi"
                }));
            });
        },
        arrayObjectRemove : function(req, res) {
            FotografModel.findById(req.body._id, function(err, foto) {
                if(err) {
                    res.send(JSON.stringify({
                        code : 400,
                        message : req.body._id + " : Ozur dileriz, veritabaninda bir sorun olustu, tekrar deneyiniz",
                        err : err
                    }));
                    return;
                }
                
                if(foto)
                {
                    for(var i = 0; i < foto.yorumlar.length; i++)
                    {
                        if(req.body.yorumId == foto.yorumlar[i]._id)
                        {
                            foto.yorumlar.splice(i,1);
                        }
                    }
                    foto.save();
                }
                res.send(JSON.stringify({
                    code : 200,
                    message : "Yorum Basari ile silindi."
                }));
            });
        }
    }
};
