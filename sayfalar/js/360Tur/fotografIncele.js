
$(document).ready(function(){
    $(".paylasim").each(function(index,elem){
    var currentUrl=$(elem).attr("href");
    
    var url=window.location.href;
       
    var totalurl=currentUrl+url;
       
    $(elem).attr("href",totalurl);
    });
    
    $("#zoomIn").click(function(){
      $("#object").width($("#object").width()+100);
      $("#object").height($("#object").height()+100);
  });
     $("#zoomOut").click(function(){
         if($("#object").width()>1100 && $("#object").height()>600){
              $("#object").width($("#object").width()-100);
              $("#object").height($("#object").height()-100);
         }
     });
   
    $("#btnFullScreen").click(function(){
       
        $("#divObj").css({
            position: 'absolute',
            width: $(window).width(),
            height: $(window).height()
        });
    });
});