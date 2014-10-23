function AdminFotograflariListele(tabloAdi)
{
 wsGet('/fotograf/tumfotograflarilistele',
          function(err,resp){
              if(err){
                  alert(err);
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
      
      var fotografObj={
                          url          :  $("inpFotografYukle").val(),
                          ad           :  $("#inpAd").val(),
                          sehir        :  $("#inpSehir").val(),
                          ulke         :  $("#inpUlke").val(),
                          kategori     :  $( "#slctKategori option:selected" ).text(),
                          eklemeTarihi :  date.getDate()+"."+date.getMonth()+"."+date.getFullYear(),
                          aciklama     :  $("#txtAciklama").val()
                      };
      wsPost("/fotograf/ekle",fotografObj,
            function(err,data){
               
               if(err)
               {
                  console.log(JSON.stringify(err));
                   return;
               }
                 var tr=$("<tr id="+data._id+"></tr>");
                 $("#tblFotoListeleAdmin").find("tbody").append(tr);
                 
                 tabloyaSatırEkle(fotoToArr(fotografObj),tr);
                 tabloyaButonEkle(data._id,tr);               
           });
             
            $(this).find('input[type=text], textarea').val('');
        });
}
function kategoriDoldur(ddlKategori){
     $("#"+ddlKategori).children().remove();
    wsGet("/kategori/tumkategorilerilistele",function(err,data){
    
        if(err){
         
            console.log(JSON.stringify(err));
            return;
        }
        for(var i=0;i<data.length;i++)
        {
          $("#"+ddlKategori).append("<option id="+data[i]._id+">"+data[i].kategori+"</option>");
        }
    });
}
function kategoriEkle(){

    $("#btnKategoriEkle").click(function(){
        
        var data={ kategori : $("#inpKategoriEkle").val()};
        wsPost("/kategori/ekle",data,function(err,resp){
           
            if(err)            
            {
                console.log(JSON.stringify(err));
                return;
            }
            $("#slctKategori").append("<option id="+resp._id+">"+data.kategori+"</option>");
            
        });
        $("#inpKategoriEkle").val("");
    });
}
function kategoriSil()
{
  $("#btnKategoriSil").click(function(){
      var opId=$("#slctKategori option:selected" ).attr("id");
      var data={_id : opId};
      console.log(opId);
      wsPost("/kategori/sil",data,function(err,resp){
        if(err){
          console.log(JSON.stringify(err));
            return;
        }
          $( "#slctKategori option:selected" ).remove();
      });
      
  });
}
function tablodaSatirGuncelle(tabloAdi)
{
  $("#"+tabloAdi).on("click",".guncelle",function(){
      tr=$("#"+tabloAdi).find("tbody").find("tr[id="+this.id+"]");
      console.log(tr);
      $("lblGuncelleId").html(this.id);
      $("#inpGuncelleUrl").val(tr.eq(0).text());
      $("#inpGuncelleAd").val(tr.eq(1).text()); 
      $("#inpGuncelleSehir").val(tr.eq(2).text());
      $("#inpGuncelleUlke").val(tr.eq(3).text());
      $("#slctGuncelleKategori option:selected").text(tr.eq(4).text());
      $("#txtGuncelleAciklama").val(tr.eq(6).text());
  });
}

$(document).ready(function(){
    
    AdminFotograflariListele("tblFotoListeleAdmin");
    tablodanSil("tblFotoListeleAdmin","/fotograf/sil");
    fotografEkle();
    tablodaSatirGuncelle("tblFotoListeleAdmin");
    kategoriEkle();
    kategoriDoldur("slctKategori");
    kategoriDoldur("slctUpdateKategori");
    kategoriSil();
});







