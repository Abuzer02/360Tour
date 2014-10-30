var fs = require('fs');
var path = require('path');

var self = {
    dosyaSil : function(req,res){
        var localPath = __dirname + "/../sayfalar/yuklemeler/";
        var fileList = req.body.fileList; 
        if(fileList.length < 0)
            return;
        for(var i = 0;i < fileList.length;i++)
        {
            var filePath = localPath + fileList[i];
           /* if(fs.existsSync(filePath))
            {
                if(req.session.uploadedImages.length > 0 && req.body.type == "image")
                {
                    for(var k = 0;k < req.session.uploadedImages.length;k++)
                    {
                        if(req.session.uploadedImages[k].imageName == fileList[i])
                        {
                            req.session.uploadedImages.splice(k,1);
                        }
                    }
                }*/
                fs.unlink(filePath,function(err){
                    if(err)
                    {
                        res.send(JSON.stringify({
                            code : 31,
                            message : "Sorry, file can not remove !"
                        }));
                        return;
                    }
                    res.send(JSON.stringify({
                        code : 200,
                        message : "Yeah come on file is removed succesfully :)"
                    }));
                    
                });      
            }
            else
            {
                res.send(JSON.stringify({
                    code : 404,
                    message : "Sorry file can not found !"
                }));
                return; 
            }  
        }
    }
};

module.exports = self;