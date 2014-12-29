function yorumlarSayfasiGecis()
{
      $("#btnYorum").click(function(){
          $(".yonetici").css("display","none");
          $(".ayarlar").css("display","none");
          $(".reklam").css("display","none");
          $(".yorum").css("display","inline");
      });
}
$(document).ready(function(){

   yorumlarSayfasiGecis();
});