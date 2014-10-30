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
                    alert("Lütfen boş alanları doldurunuz");
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
      });
      
  });
}
function tablodaSatirGuncelle(tabloAdi)
{
  var fotografUrl="";
  var eklemetarihi="";
  $("#"+tabloAdi).on("click",".guncelle",function(){
      
      tr=$("#"+tabloAdi).find("tbody").find("tr[id="+this.id+"]");
      $("#h5GuncelleId").html(this.id);
      fotografUrl=tr.find("td").eq(0).find("a").attr("href");
      fotograf360Url=tr.find("td").eq(1).find("a").attr("href");
      $("#inpGuncelleAd").val(tr.find("td").eq(2).text()); 
      $("#inpGuncelleSehir").val(tr.find("td").eq(3).text());
      $("#inpGuncelleUlke").val(tr.find("td").eq(4).text());
      $("#slctGuncelleKategori").val(tr.find("td").eq(5).text());
      eklemetarihi=tr.find("td").eq(6).text();
      $("#txtGuncelleAciklama").val(tr.find("td").eq(7).text());
      
      
  });
  $("#btnGuncelle").bind("click",function(){
      
        var guncelFotografObj={
                                _id          :$("#h5GuncelleId").html(),
                                url          :fotografUrl,
                                url360Tour   :foto360Url,
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
             tr.find("td").remove();
             tabloyaSatırEkle(fotoToArr(guncelFotografObj),tr);
             tabloyaButonEkle(guncelFotografObj._id,tr);
         
         });
        
    });
}
function Yukle(divAdi){

}

$(document).ready(function(){
    
    $("#resimBilgileri #btnYukle").on("click",function(e){
       if(!$("#resimBilgileri #inpResimYukle").val())
       {
            e.preventDefault(); 
            return;   
       }
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
});







