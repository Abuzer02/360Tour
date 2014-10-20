
var self = {
        anasayfa: function(req,res) {
            res.render("anasayfa.ejs", {layout:false});
        },
        kullanicilar: function(req,res) {
            res.render("kullanicilar.ejs", {layout:false});
        },
        tarihi: function(req,res) {
            res.render("tarihi.ejs", {layout:false});
        },
        doga: function(req,res) {
            res.render("doga.ejs", {layout:false});
        },
        hakkinda: function(req,res) {
            res.render("hakkinda.ejs", {layout:false});
        },
        fotografincele: function(req,res) {
            var FotografModel=require("../model/FotografModel");
            FotografModel.findOne({_id:req.params.id},function(err, fotograf){
                res.render("fotografincele.ejs", {layout:false, fotograf:fotograf});
            });
            
        }
};
module.exports = self;
