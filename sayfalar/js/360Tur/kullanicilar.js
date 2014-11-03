function KullanicilariListele(tabloAdi)
{
 wsGet('/kullanici/tumkullanicilarilistele',
          function(err,resp){
              if(err){
                  alert(err);
                  return;
              }              
            for(var i=0;i < resp.length;i++){ 
            
            var tr=$("<tr id="+resp[i]._id+"></tr>");
            $("#"+tabloAdi).find("tbody").append(tr); 
            tabloyaSatırEkle(kullaniciToArr(resp[i]),tr); 
            tabloyaButonEkle(resp[i]._id,tr);
            }
              
          });
}

function kullaniciEkle(tabloAdi)
{
     $("#btnEkle").click(function(){
         
        var kullanici = {
            ad       : $("#inpAd").val(),
            soyad    : $("#inpSoyad").val(),
            sifre    : $("#inpSifre").val(),
        };
         
        var requiredFieldValidator = true;
        $(".required").each(function(index,elem){
            if(!$(elem).val().trim())
                {
                    $(elem).css("border-color","red");
                    requiredFieldValidator=false;
                }
                else {
					$(elem).css("border-color","");
                }
        });
          if(requiredFieldValidator)
        { wsPost("/kullanici/ekle",fotografObj,
            function(err,data){
               
               if(err)
               {
                  console.log(JSON.stringify(err));
                   return;
               }
                 var tr=$("<tr id="+data._id+"></tr>");
                 $("#"+tabloAdi).find("tbody").append(tr);
                 
                 tabloyaSatırEkle(kullaniciToArr(fotografObj),tr);
                 tabloyaButonEkle(data._id,tr);               
           });
             
            $("input[type='text']").val(""); 
        }
        else{
           alert('Kirmizi ile isaretlenen alanlar doldurulmalidir.');
        }    
   });
}
function kullaniciSil(tabloAdi){
    
     $("#"+tabloAdi).on("click",".sil",function(){
       var kullanici = {
            _id : this.id
        };       
          wsPost("/kullanici/sil",kullanici,function(err,data){
           if(err)
           {
             console.log(JSON.stringify(err));
               return;
           }  
            $("#"+tabloAdi+" tr[id=" + kullanici._id + "]").remove();
      });
   }); 
}
function kullaniciGuncelle(){
      
        $("#kullanicilarTablosu").on("click",".guncelle",function(){
            
        $("#idGuncelle").html(this.id);
        
        $("#inpGuncelleAd").val($("#kullanicilarTablosu tr[id=" + this.id + "]").find("td").eq(0).text());
        $("#inpGuncelleSoyad").val($("#kullanicilarTablosu tr[id=" + this.id + "]").find("td").eq(1).text());
        $("#inpGuncelleSifre").val($("#kullanicilarTablosu tr[id=" + this.id + "]").find("td").eq(2).text());
     });
     $("#btnGuncelleEkle").click(function(){
         
     var guncelKullanici = {
            _id      : $("#idGuncelle").html(),
            ad       : $("#inpGuncelleAd").val(),
            soyad    : $("#inpGuncelleSoyad").val(),
            sifre    : $("#inpGuncelleSifre").val(),
        };
        $.ajax({
            dataType: 'json',
            headers: {
                "Content-Type" : "application/json"
            },
            url:'/kullanici/guncelle',
            type:'POST',
            data: JSON.stringify(guncelKullanici),
            success: function(data)
            {
                var id = guncelKullanici["_id"];
                var tid = 0;
                $("#kullanicilarTablosu tr[id=" + id + "]").find("td").eq(tid++).html(guncelKullanici["ad"]);
                $("#kullanicilarTablosu tr[id=" + id + "]").find("td").eq(tid++).html(guncelKullanici["soyad"]);
                $("#kullanicilarTablosu tr[id=" + id + "]").find("td").eq(tid++).html(guncelKullanici["sifre"]);
                

                $('#inpGuncelleAd').val("");
                $('#inpGuncelleSoyad').val("");
                $('#inpGuncelleSifre').val("");
            },
            error: function(data)
            {
            }
        });
       
});
}

$(document).ready(function(){
         
   KullanicilariListele("kullanicilarTablosu");
   kullaniciEkle();
   kullaniciSil(); 
   kullaniciGuncelle(); 
    
 


});
