var fotoUrl="";
var foto360Url="";
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
                          url          :  fotoUrl,
                          url360Tour   :  foto360Url,
                          ad           :  $("#inpAd").val(),
                          sehir        :  $("#inpSehir").val(),
                          ulke         :  $("#inpUlke").val(),
                          kategori     :  $( "#slctKategori option:selected" ).val(),
                          eklemeTarihi :  date.getDate()+"."+date.getMonth()+"."+date.getFullYear(),
                          aciklama     :  $("#txtAciklama").val()
                      };     
      
        console.log(foto360Url+" "+fotoUrl);
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
                  console.log(JSON.stringify(err));
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
function kategoriDoldur(ddlKategori){
    
     $("#"+ddlKategori).children().remove();
    wsGet("/kategori/tumkategorilerilistele",function(err,data){
    
        if(err){
         
            console.log(JSON.stringify(err));
            return;
        }
        for(var i=0;i<data.length;i++)
        {
          $("#"+ddlKategori).append("<option id='"+data[i]._id+"' value='"+data[i].kategori+"'>"+data[i].kategori+"</option>");
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
            $("#slctKategori").append("<option id='"+resp._id+"' value='"+data.kategori+"'>"+data.kategori+"</option>");
             alertify.success("Kategori başarı ile eklendi");
        });
        $("#inpKategoriEkle").val("");
    });
}
function kategoriSil()
{
  $("#btnKategoriSil").click(function(){
      var opId=$("#slctKategori option:selected" ).attr("id");
      var data={_id : opId};
      wsPost("/kategori/sil",data,function(err,resp){
        if(err){
          console.log(JSON.stringify(err));
            return;
        }
          $( "#slctKategori option:selected" ).remove();
           alertify.success("Kategori başarı ile silindi");
      });
     
  });
}
function tablodaSatirGuncelle(tabloAdi)
{
  var fotografUrl="";
  var eklemetarihi="";
  var fotograf360Url="";
  $("#"+tabloAdi).on("click",".guncelle",function(){
      var abc={_id:this.id};
      wsPost("/fotograf/arama",abc,function(err,data){
          
          if(err){
            alertify.error(JSON.stringify(err));
              return;
          }
      $("#h5GuncelleId").html(data[0]._id);
      fotografUrl=data[0].url;
      fotograf360Url=data[0].url360Tour;
      $("#inpGuncelleAd").val(data[0].ad); 
      $("#inpGuncelleSehir").val(data[0].sehir);
      $("#inpGuncelleUlke").val(data[0].ulke);
      $("#slctGuncelleKategori").val(data[0].kategori);
      eklemetarihi=data[0].eklemeTarihi;
      $("#txtGuncelleAciklama").val(data[0].aciklama);
          
      });
      
  });
  $("#btnGuncelle").bind("click",function(){
      
        var guncelFotografObj={
                                _id          :$("#h5GuncelleId").html(),
                                url          :fotografUrl,
                                url360Tour   :fotograf360Url,
                                ad           :$("#inpGuncelleAd").val(),
                                sehir        :$("#inpGuncelleSehir").val(),
                                ulke         :$("#inpGuncelleUlke").val(),
                                kategori     :$("#slctGuncelleKategori option:selected").val(),
                                eklemeTarihi :eklemetarihi,
                                aciklama     :$("#txtGuncelleAciklama").val()                            
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
             console.log(guncelFotografObj);
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
    
    kategoriEkle();
    kategoriDoldur("slctKategori");
    kategoriDoldur("slctGuncelleKategori");
    kategoriSil();
    
    tumMesajlariListele();
    modaldaGoster();
});







