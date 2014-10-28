
var self = {
        anasayfa: function(req,res) {
            res.render("anasayfa.ejs", {layout:false});
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
        }
};
module.exports = self;
