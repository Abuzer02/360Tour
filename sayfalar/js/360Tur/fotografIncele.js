var count=4;

function onayliYorumSayisi(){

   $(".yorumSayisi").text($(".yorum").children().length);
}

function YorumlarDahasi(){
    for(var i=count;i<count+4;i++){
         $(".yorum li").eq(i).show();
    }
    if($(".yorum li:last").index()<=count){
        $("#btnDahasi").css("background-color","#BC1616");
        $("#btnDahasi").text("Son");
    }else{
    count=count+4;
    }
    return count;
}
function yorumİlkDurum(){
    $(".yorum li").hide();
    for(var i=0;i<count;i++){
        $(".yorum li").eq(i).show();
    }
}
$(document).ready(function(){
    
    $("#frmYorum").ajaxForm(function(resp){
        $("input[type='text']").val("");
        $("textarea").val("");
        alertify.success("Yorumunuz incelendikten sonra yayınlanacaktır");
    });
    
    $(".paylasim").each(function(index,elem){
    var currentUrl=$(elem).attr("href");
    
    var url=window.location.href;
       
    var totalurl=currentUrl+url;
       
    $(elem).attr("href",totalurl);
    });
    
    onayliYorumSayisi(); 
    yorumİlkDurum();
    $("#btnDahasi").bind("click",function(){
    YorumlarDahasi();
    });
    
});