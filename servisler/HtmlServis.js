var FotografModel=require("../modeller/FotografModel");
var KategoriModel=require("../modeller/KategoriModel");
var SehirModel=require("../modeller/SehirModel");
var UlkeModel=require("../modeller/UlkeModel");
var self = {
        anasayfa: function(req,res) {
            FotografModel.find({} , function(errFoto, fotoRes) {
                if(errFoto){
                    res.send("300 - listalllong - db error");
                    return;
                }
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
                    res.render("anasayfa.ejs", {layout:false,fotoList:fotoRes,kategoriList:kategoriRes,sehirList:sehirRes,ulkeList:ulkeRes});
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
            res.render("admin.ejs", {layout:false, session:req.session});
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
                res.render("fotografincele.ejs", {layout:false,fotograf:foto});
        });
        },
};
module.exports = self;
