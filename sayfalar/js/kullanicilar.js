function kullanicilarTablosuDoldur()
{
   $.ajax({
        dataType: 'json',
        headers: {
            Accept:"application/json"
        },
        type:'GET',
        url:'/kullanici/tumkullanicilarilistele',
        success: function(data)
        {
            $("#kullanicilarTablosu").find("tr:gt(0)").remove();

            for(var i=0;i<data.length;i++)
            {
                var table=$("#kullanicilarTablosu");
                var tr=$("<tr id=\""+data[i]._id+"\"></tr>");
                table.find("tbody").last().append(tr);
                console.log(data[i]._id);
                var td1=$("<td>"+data[i].ad+"</td>");
                tr.append(td1);

                var td2=$("<td>"+data[i].soyad+"</td>");
                tr.append(td2);
                
                var td3=$("<td>"+data[i].sifre+"</td>");
                tr.append(td3);

                var btnSil=$("<button id=\""+data[i]._id+"\" id='btnSil' class='sil'>Sil</button>");

                var btnGuncelle=$("<button id=\""+data[i]._id+"\" class='guncelle'>Güncelle</button>");

                  var td4=$("<td></td>");
                  td4.append(btnSil);td4.append("<span> </span>");td4.append(btnGuncelle);
                  tr.append(td4);
            }
        },
        error: function(data)
        {
        }
    });
     
}
function kullaniciEkle()
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
        {
            $.ajax({
            dataType: 'json',
            headers: {
                "Content-Type" : "application/json"
            },
            url:'/kullanici/ekle',
            type:'POST',
            data: JSON.stringify(kullanici),
            success: function(data)
            {
                var table=$("#kullanicilarTablosu");
                var tr=$("<tr id=\""+kullanici._id+"\"></tr>");
                console.log(kullanici._id);
                table.find("tbody").last().append(tr);

                var td1=$("<td>"+kullanici.ad+"</td>");
                tr.append(td1);

                var td2=$("<td>"+kullanici.soyad+"</td>");
                tr.append(td2);
                
                var td3=$("<td>"+kullanici.sifre+"</td>");
                tr.append(td3);

                 var btnSil=$("<button id=\""+kullanici._id+"\" id='btnSil' class='sil'>Sil</button>");

                 var btnGuncelle=$("<button id=\""+kullanici._id+"\" class='guncelle'>Güncelle</button>");

                  var td4=$("<td></td>");
                  td4.append(btnSil);td4.append("<span> </span>");td4.append(btnGuncelle);
                  tr.append(td4);

                $('#inpAd').val("");
                $('#inpSoyad').val("");
                $('#inpSifre').val("");
            },
            error: function(data)
            {
            }
        });
            
        }
        else{
           alert('Kirmizi ile isaretlenen alanlar doldurulmalidir.');
        }

       
});
}
function kullaniciSil(){
    
     $("#kullanicilarTablosu").on("click",".sil",function(){
       var kullanici = {
            _id : this.id
        };       
        $.ajax({
            dataType: 'json',
            headers: {
                "Content-Type" : "application/json"
            },
            url:'/kullanici/sil',
            type:'POST',
            data: JSON.stringify(kullanici),
            success: function(data)
            {
                $("#kullanicilarTablosu tr[id=" + kullanici._id + "]").remove();
            },
            error: function(data)
            {
              
            }
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
         
   kullanicilarTablosuDoldur();
   kullaniciEkle();
   kullaniciSil(); 
   kullaniciGuncelle(); 
    
 


});
