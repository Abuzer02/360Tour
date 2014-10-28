var HtmlServis = require('./HtmlServis');
var KullaniciModel = require('../modeller/KullaniciModel');

module.exports = function() {
    return {
        login : function(req, res) {
            console.log("login çalıştı");
            KullaniciModel.findOne({ad : req.body.ad, soyad: req.body.soyad}, function(e, kullanici) {
                if(req.body.ad!= "" && req.body.soyad != "" && kullanici) {
                    console.log("admine yönlendir");
                    if (req.body.password != "" && req.body.password == kullanici.sifre) {
                        req.session.login = true;
                        req.session.kullanici  = kullanici;
                        console.log("basarıyla login olundu");
                        res.redirect("/admin");
                    }
                }
                else {
                    req.session.message = "Kullanici bulunamadi, adinizi ve soyadinizi kontrol ediniz";
                    req.session.login = false;
                    res.redirect("/login");
                }
            });

        }, // login

        logout : function(req, res) {
            // session store based destroy
            req.session.destroy();

            // cookie based session destroy
            req.session = null

            HtmlService.login(req, res);
        },
        logout : function(req, res) {
            // session store based destroy
            req.session.destroy();

            // cookie based session destroy
            req.session = null

            HtmlServis.login(req, res);
        },

        sessionCheck : function(req, res, next) {
            if(req.session.login && req.session.login == true) {
                var kullanici = req.session.kullanici;
                var requestedPage = req.path.toLowerCase();
                next();
            }
            else {
                HtmlServis.login(req, res);
            }
        },
    }
};
