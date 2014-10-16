var self = {
        anasayfa: function(req,res) {
            res.render("anasayfa.ejs", {layout:false});
        }
};
module.exports = self;
