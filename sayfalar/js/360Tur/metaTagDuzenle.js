function metaTagSayfasiGecis()
{
      $("#btnMeta").click(function(){
          $(".yonetici").css("display","none");
          $(".ayarlar").css("display","none");
          $(".reklam").css("display","none");
          $(".yorum").css("display","none");
          $(".meta").css("display","inline");
          
      });
}

$(document).ready(function(){

    metaTagSayfasiGecis();
    
});