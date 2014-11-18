
$(document).ready(function(){
    $(".paylasim").each(function(index,elem){
    var currentUrl=$(elem).attr("href");
    
    var url=window.location.href;
       
    var totalurl=currentUrl+url;
       
    $(elem).attr("href",totalurl);
    });
});