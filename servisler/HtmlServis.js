
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
        admin: function(req,res) {
            res.render("admin.ejs", {layout:false});
        }
};
module.exports = self;
