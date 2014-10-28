var fs = require('fs');
var crypto = require('crypto');
var path = require('path');
// var im = require('imagemagick');
// var gm = require('gm');

var self = {
    ResimYukle: function(req,res) {
        fs.readFile(req.files.image.path, function(err, data) {
            // content based hash
            /*var hash = crypto.createHash('sha1');
            hash.setEncoding('hex');
            hash.write(data);
            hash.end();*/
            var actualName = req.files.image.name;
            var ext = path.extname(actualName).substring(1);
           // var sha1sum = hash.read();
            var imageName = actualName; 

            var newPath = __dirname + "/../sayfalar/yuklemeler/" + imageName;
            var url =  "yuklemeler/" + imageName;
            fs.writeFile(newPath, data, function (err) {
                if(err) {
                    res.send(JSON.stringify({
                        code : 404,
                        message : "Ozur dileriz, " + req.files.image.name + " eklenemedi. !!!"
                    }));
                    return;
                }

              /*  // thumbnail olustur
                req.session.uploadedImages.push({
                    actualName: actualName,
                    imageName: imageName,
                });*/

                res.send(JSON.stringify({
                    code : 200,
                    actualName : actualName,
                    message : req.files.image.name + " basari ile yuklendi",
                    url:"http://localhost:3000/yuklemeler/"+imageName
                }));
            });
        });
    }
};

module.exports = self;
