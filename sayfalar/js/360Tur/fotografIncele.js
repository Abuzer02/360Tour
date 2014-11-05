$(document).ready(function(){
    $(".paylasim").each(function(index,elem){
    var currentUrl=$(elem).attr("href");
        console.log("cr  : "+currentUrl);
    var url=window.location.href;//window.location.href;
        console.log("url  : "+url);
    var totalurl=currentUrl+url;
        console.log("tr  : "+totalurl);
    $(elem).attr("href",totalurl);
    });
});