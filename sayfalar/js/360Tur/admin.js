var fotoUrl="";
var foto360Url="";

function AdminFotograflariListele(tabloAdi)
{
 wsGet('/fotograf/tumfotograflarilistele',
          function(err,resp){
              if(err){
                  alertify.error(JSON.stringify(err));
                  return;
              }              
            for(var i=0;i < resp.length;i++){ 
            
            var tr=$("<tr id="+resp[i]._id+"></tr>");
            $("#"+tabloAdi).find("tbody").append(tr); 
            tabloyaSatırEkle(fotoToArr(resp[i]),tr); 
            tabloyaButonEkle(resp[i]._id,tr);
            }
              
          });   
}

function fotografEkle(){
    
  $("#btnEkle").click(function(){
      var date=new Date();
      var frame,frmSrc;
      if($("#inpEmbed").val()!="")
       {
           frame=$($("#inpEmbed").val());
           frmSrc=frame[0]["src"];
       }else{
       
           frmSrc="";
       }
      
      var fotografObj={
                          url          :  fotoUrl,
                          url360Tour   :  foto360Url,
                          ad           :  $("#inpAd").val(),
                          frameSrc     :  frmSrc,
                          sehir        :  $( "#slctSehir option:selected" ).val(),
                          ulke         :  $( "#slctUlke option:selected" ).val(),
                          kategori     :  $( "#slctKategori option:selected" ).val(),
                          eklemeTarihi :  date.getDate()+"."+date.getMonth()+"."+date.getFullYear(),
                          aciklama     :  $("#txtAciklama").val(),
                          aciklamaOzet:  $("#inpAciklamaOzet").val()
                      };     

        var requiredFieldValidator = true;
        $(".required").each(function(index,elem){
            if(!$(elem).val().trim())
                {
                    $(elem).css("border-color","red");
                    alertify.error("Lütfen boş alanları doldurunuz");
                    requiredFieldValidator=false;
                }
                else {
					$(elem).css("border-color","");
                }
        });
          if(requiredFieldValidator)
        {
          wsPost("/fotograf/ekle",fotografObj,
            function(err,data){
               if(err)
               {
                  //console.log(JSON.stringify(err));
                   return;
               }
                 var tr=$("<tr id="+data._id+"></tr>");
                 $("#tblFotoListeleAdmin").find("tbody").append(tr);
                 
                 tabloyaSatırEkle(fotoToArr(fotografObj),tr);
                 tabloyaButonEkle(data._id,tr);  
                 alertify.success("Bilgiler başarı ile eklendi.");
           });
             
            $("#divFotografEkle input[type='text'],input[type='file'],textarea").val(""); 
        }
    });
}
function kategoriSehirUlkeDoldur(slct,elem,url){
    
     $("#"+slct).children().remove();
    wsGet(url,function(err,data){
    
        if(err){
         
            console.log(JSON.stringify(err));
            return;
        }
        for(var i=0;i<data.length;i++)
        {
          $("#"+slct).append("<option id='"+data[i]._id+"' value='"+data[i][elem]+"'>"+data[i][elem]+"</option>");
        }
    });
}

function kategoriSehirUlkeEkle(btn,inp,slct,slctGuncelle,elem,url){

    $("#"+btn).click(function(){
        if($("#"+inp).val()=="")
        {
          alertify.error("lütfen "+elem+" adı giriniz!!!");
        }
        else{
            var data;
            if(elem=="kategori")data={kategori : $("#"+inp).val()};
            else if(elem=="ulke")data={ulke : $("#"+inp).val()};
            else data={sehir : $("#"+inp).val(), ulke:$( "#slctUlke option:selected" ).val()};
        wsPost(url,data,function(err,resp){
           
            if(err)            
            {
                console.log(JSON.stringify(err));
                return;
            }
            $("#"+slct).append("<option id='"+resp._id+"' value='"+data[elem]+"'>"+data[elem]+"</option>");
            $("#"+slctGuncelle).append("<option id='"+resp._id+"' value='"+data[elem]+"'>"+data[elem]+"</option>");
             alertify.success(elem+" başarı ile eklendi");
        });
        $("#"+inp).val("");
       }
    });
}

function kategoriSehirUlkeSil(btn,slct,elem,url)
{
  $("#"+btn).click(function(){
      var opId=$("#"+slct+" option:selected" ).attr("id");
      var data={_id : opId};
      wsPost(url,data,function(err,resp){
        if(err){
          console.log(JSON.stringify(err));
            return;
        }
          $( "#"+slct+" option:selected" ).remove();
           alertify.success(elem+" başarı ile silindi");
      });
     
  });
}

function tablodaSatirGuncelle(tabloAdi)
{
  var fotografUrl="";
  var eklemetarihi="";
  var fotograf360Url="";
  $("#"+tabloAdi).on("click",".guncelle",function(){
      var abc={search:{_id:this.id},
               output :"_id url url360Tour frameSrc ad sehir ulke kategori eklemeTarihi aciklama aciklamaOzet"
              };
      wsPost("/fotograf/arama",abc,function(err,data){
          
          if(err){
            alertify.error(JSON.stringify(err));
              return;
          }
          console.log(data);
      $("#h5GuncelleId").html(data[0]._id);
      fotografUrl=data[0].url;
      fotograf360Url=data[0].url360Tour;
      $("#inpGuncelleEmbed").val(data[0].frameSrc); 
      $("#inpGuncelleAd").val(data[0].ad); 
      $("#inpGuncelleSehir").val(data[0].sehir);
      $("#inpGuncelleUlke").val(data[0].ulke);
      $("#slctGuncelleKategori").val(data[0].kategori);
      eklemetarihi=data[0].eklemeTarihi;
      $("#inpGuncelleAciklamaOzet").val(data[0].aciklamaOzet);
      $("#txtGuncelleAciklama").val(data[0].aciklama);
          
      });
      
  });
    
  $("#btnGuncelle").bind("click",function(){
        var guncelFotografObj={
                                _id          :$("#h5GuncelleId").html(),
                                url          :fotografUrl,
                                url360Tour   :fotograf360Url,
                                frameSrc     :$("#inpGuncelleEmbed").val(),
                                ad           :$("#inpGuncelleAd").val(),
                                sehir        :$( "#slctGuncelleSehir option:selected" ).val(),
                                ulke         :$( "#slctGuncelleUlke option:selected" ).val(),
                                kategori     :$("#slctGuncelleKategori option:selected").val(),
                                eklemeTarihi :eklemetarihi,
                                aciklama     :$("#txtGuncelleAciklama").val(),
                                aciklamaOzet :$("#inpGuncelleAciklamaOzet").val()
                              };
         wsPost("/fotograf/guncelle",guncelFotografObj,function(err,data){
         
             if(err){
             
                 console.log(JSON.stringify(err));
                 return;
             }
             
             var tr=$("#"+tabloAdi).find("tbody").find("tr[id='"+guncelFotografObj._id+"']");
             tr.find("td").remove();
             tabloyaSatırEkle(fotoToArr(guncelFotografObj),tr);
             tabloyaButonEkle(guncelFotografObj._id,tr);
             alertify.success("Bilgiler başarı ile güncellendi.");
         });
        
    });
}

function tumMesajlariListele()
{

    wsGet("/iletisim/tummesajlarilistele",function(err,data){
    
        if(err){
             
                 console.log(JSON.stringify(err));
                 return;
             }
        for(var i=0;i < data.length;i++){ 
            
            var tr=$("<tr id="+data[i]._id+"></tr>");
            $("#tblMesajListeleAdmin").find("tbody").append(tr); 
             tabloyaSatırEkle(mesajToArr(data[i]),tr);
             var td=$("<td></td>");
             td.append(btnSil(data[i]._id));
             tr.append(td);
        }
    });
}

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
        console.log("ayarlar tıklandı");
          $(".yonetici").css("display","none");
          $(".ayarlar").css("display","inline");
      });
}

$(document).ready(function(){
    
    $("#resimBilgileri #btnYukle").on("click",function(e){
       if(!$("#resimBilgileri #inpResimYukle").val())
       {
            e.preventDefault(); 
            return;              
       }
        alertify.success("Yükleme başarılı");
    }); 
    
    $("#resimBilgileri #formResimYukle").ajaxForm(function(data) { 
        var resp=JSON.parse(data);        
        console.log("url is "+resp.url);
        fotoUrl=resp.url;      
    }); 
    
    $("#360TurResimBilgileri #btnYukle").on("click",function(e){
       if(!$("#360TurResimBilgileri #inpResimYukle").val())
       {
            e.preventDefault(); 
            return;
       }   
           alertify.success("Yükleme başarılı");
    }); 
    
    $("#360TurResimBilgileri #formResimYukle").ajaxForm(function(data) { 
        var resp=JSON.parse(data);        
        console.log("url is "+resp.url);
        foto360Url=resp.url;      
    }); 
        
    AdminFotograflariListele("tblFotoListeleAdmin");
    
    
    fotografEkle();
    tablodaSatirGuncelle("tblFotoListeleAdmin");
    tablodanSil("tblFotoListeleAdmin","/fotograf/sil");
    
    kategoriSehirUlkeEkle("btnKategoriEkle","inpKategoriEkle","slctKategori","slctGuncelleKategori","kategori","/kategori/ekle");
    kategoriSehirUlkeEkle("btnSehirEkle","inpSehirEkle","slctSehir","slctGuncelleSehir","sehir","/sehir/ekle");
    kategoriSehirUlkeEkle("btnUlkeEkle","inpUlkeEkle","slctUlke","slctGuncelleUlke","ulke","/ulke/ekle");
    kategoriSehirUlkeDoldur("slctKategori","kategori","/kategori/tumkategorilerilistele");
    kategoriSehirUlkeDoldur("slctGuncelleKategori","kategori","/kategori/tumkategorilerilistele");
    kategoriSehirUlkeDoldur("slctSehir","sehir","/sehir/tumsehirlerilistele");
    kategoriSehirUlkeDoldur("slctGuncelleSehir","sehir","/sehir/tumsehirlerilistele");
    kategoriSehirUlkeDoldur("slctUlke","ulke","/ulke/tumulkelerilistele");
    kategoriSehirUlkeDoldur("slctGuncelleUlke","ulke","/ulke/tumulkelerilistele");
    kategoriSehirUlkeSil("btnKategoriSil","slctKategori","kategori","/kategori/sil");
    kategoriSehirUlkeSil("btnSehirSil","slctSehir","sehir","/sehir/sil");
    kategoriSehirUlkeSil("btnUlkeSil","slctUlke","ulke","/ulke/sil");
    
    tumMesajlariListele();
    modaldaGoster();
    ayarlarSayfasiniDoldur();
    ayarlarSayfasiGecis();
    ayarlarSayfasıGuncelle();
});







