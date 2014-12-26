function ayarlarSayfasiniDoldur(){
 
    wsGet("/kullanici/tumkullanicilarilistele",function(err,data){
    
        if(err){
        
            alertify.error("veritabanında hata oluştu!!!");
            return;
        }
        $("#h5").html(data[0]._id);
        $("#inpKullaniciAd").val(data[0].ad);
        $("#inpKullaniciSoyad").val(data[0].soyad);
        $("#inpKullaniciSifre").val(data[0].sifre);
    });

}
function ayarlarSayfasıGuncelle(){
    $("#btnAyarlarGuncelle").click(function(){
         var kullanici={
                          _id   : $("#h5").html(),
                          ad    : $("#inpKullaniciAd").val(),
                          soyad : $("#inpKullaniciSoyad").val(),
                          sifre : $("#inpKullaniciSifre").val()
         };
        wsPost("/kullanici/guncelle",kullanici,function(err,data){

             if(err){

                aletify.error("veritabanı hatası oluştu!!!");
                return;
            }
             alertify.success("Bilgileriniz başarı ile güncellenmiştir.");

        });
    });
}
function ayarlarSayfasiGecis()
{
      $("#btnAyarlar").click(function(){
          $(".yonetici").css("display","none");
          $(".ayarlar").css("display","inline");
      });
}
$(document).ready(function(){

    ayarlarSayfasiniDoldur();
    ayarlarSayfasiGecis();
    ayarlarSayfasıGuncelle();
});