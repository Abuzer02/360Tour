var FotografModel=require("../modeller/FotografModel");
var KategoriModel=require("../modeller/KategoriModel");
var SehirModel=require("../modeller/SehirModel");
var UlkeModel=require("../modeller/UlkeModel");
var IletisimModel=require("../modeller/IletisimModel");
var KullaniciModel=require("../modeller/KullaniciModel");
var ReklamModel =require("../modeller/ReklamModel");
var self = {
        anasayfa: function(req,res) {
            FotografModel.count({},function(err,fotoSayisi){
                FotografModel.find({},{},{limit : 12}, function(errFoto, fotoRes) {
                if(errFoto){
                    res.send("300 - listalllong - db error");
                    return;
                }
                console.error(fotoRes);
                KategoriModel.find({} , function(errKategori, kategoriRes) {
                    if(errKategori){
                        res.send("300 - listalllong - db error");
                        return;
                        }
                    SehirModel.find({} , function(errSehir,sehirRes) {
                        if(errSehir){
                        res.send("300 - listalllong - db error");
                        return;
                        }
                        UlkeModel.find({} , function(errUlke, ulkeRes) {
                        if(errUlke){
                        res.send("300 - listalllong - db error");
                        return;
                        }
                        ReklamModel.find({},function(errReklam,reklam){
                        if(errReklam){
                        res.send("300 - listalllong - db error");
                        return;
                        }
                        res.render("anasayfa.ejs", {layout:false,fotoList:fotoRes,fotoSayisi:fotoSayisi,reklamList:reklam,kategoriList:kategoriRes,sehirList:sehirRes,ulkeList:ulkeRes});
                    });    
                });
             });
          });  
      });   
    });
},            
        kullanicilar: function(req,res) {
            res.render("kullanicilar.ejs", {layout:false});
        },
        hakkinda: function(req,res) {
            res.render("hakkinda.ejs", {layout:false});
        },
        admin: function(req,res) {  
                FotografModel.find({},{},function(errFoto,fotoRes){
                
                    if(errFoto){
                      res.send("300 - listalllong - db error");
                        return;
                    }                   
                       IletisimModel.find({},{},{limit : 8 },function(errMsj,mesajlar){
                       
                           if(errMsj){
                           
                               res.send("300 - listalllong - db error");
                               return;
                           }
                           KullaniciModel.find({},{},function(errKullanici,kullanici){
                           
                               if(errKullanici){
                               
                                   res.send("300 - listall -db error");
                                   return;
                               }
                                 res.render("admin.ejs", {layout:false,fotoList:fotoRes,mesajList:mesajlar,kullanici:kullanici, session:req.session});
                           });
                       });
                   });                
        },
        login: function(req,res) {
            res.render("login.ejs", {layout:false, session:req.session});
        },
        fotografincele: function(req,res) {
            FotografModel.findOne({_id: req.params.id}, function(err, foto) {
                if(err){
                    res.send("300 - listalllong - db error");
                    return;
                }
                ReklamModel.find({},function(errReklam,reklam){
                    if(err){
                        res.send("300 - listalllong - db error");
                        return;
                    }
                    res.render("fotografincele.ejs", {layout:false,fotograf:foto,reklamList:reklam});
            });
         });
        },
};
module.exports = self;
