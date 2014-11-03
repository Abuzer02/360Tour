var FotografModel=require("../modeller/FotografModel");
var KategoriModel=require("../modeller/KategoriModel");
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
                    res.render("anasayfa.ejs", {layout:false,fotoList:fotoRes,kategoriList:kategoriRes});
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
        bos: function(req,res) {
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
                    res.render("bos.ejs", {layout:false,fotoList:fotoRes,kategoriList:kategoriRes});
                });
            
            });   
        },
};
module.exports = self;
