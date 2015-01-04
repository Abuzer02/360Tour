var fotoUrl="";
var foto360Url="";

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
                          tiklanmaSayisi: 0,
                          yorumlar     :[],
                          metalar      :[]
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

function kategoriSehirUlkeSil(btn,slct,slctGuncelle,elem,url)
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
          $( "#"+slctGuncelle+" option:selected" ).remove();
           alertify.success(elem+" başarı ile silindi");
      });
     
  });
}

function tablodaSatirGuncelle(tabloAdi)
{

  $("#"+tabloAdi).on("click",".guncelle",function(){
      var abc={search:{_id:this.id},
               output :"_id frameSrc ad sehir ulke kategori aciklama"
              };
      wsPost("/fotograf/arama",abc,function(err,data){
          
          if(err){
            alertify.error(JSON.stringify(err));
              return;
          }
      sehirleriDoldur("slctGuncelleSehir",data[0].ulke);
      $("#h5GuncelleId").html(data[0]._id);
      $("#inpGuncelleEmbed").val(data[0].frameSrc); 
      $("#inpGuncelleAd").val(data[0].ad);
      $("#slctGuncelleUlke").val(data[0].ulke);
      $("#slctGuncelleSehir").val(data[0].sehir);
      $("#slctGuncelleKategori").val(data[0].kategori);
      $("#txtGuncelleAciklama").val(data[0].aciklama);
      });
      
  });
    
  $("#btnGuncelle").bind("click",function(){
        var guncelFotografObj={
                                _id          :$("#h5GuncelleId").html(),
                                frameSrc     :$("#inpGuncelleEmbed").val(),
                                ad           :$("#inpGuncelleAd").val(),
                                sehir        :$("#slctGuncelleSehir option:selected" ).val(),
                                ulke         :$("#slctGuncelleUlke option:selected" ).val(),
                                kategori     :$("#slctGuncelleKategori option:selected").val(),
                                aciklama     :$("#txtGuncelleAciklama").val(),
                              };
      
       var tr=$("#"+tabloAdi).find("tbody").find("tr[id='"+guncelFotografObj._id+"']");
      
         wsPost("/fotograf/guncelle",guncelFotografObj,function(err,data){
         
             if(err){
             
                 console.log(JSON.stringify(err));
                 return;
             }             
             tr.find("td").eq(2).html(guncelFotografObj.frameSrc);
             tr.find("td").eq(3).html(guncelFotografObj.ad);
             tr.find("td").eq(4).html(guncelFotografObj.sehir);
             tr.find("td").eq(5).html(guncelFotografObj.ulke);
             tr.find("td").eq(6).html(guncelFotografObj.kategori);
            
             alertify.success("Bilgiler başarı ile güncellendi.");
         });
        
    });
}

function sayfalama(tabloAdi,divAdi){

    var toplam=$("#"+tabloAdi+" tbody tr").size();
    var veriSayisi=12;
    $("#"+tabloAdi+" tbody tr:gt("+(veriSayisi-1)+")").hide();
    var sayfaSayisi=Math.ceil(toplam/veriSayisi);
    
    for (var i = 1; i <= sayfaSayisi; i++)
    {
        var anchors=$('<a href="javascript:void(0)" class="btn btn-primary btn-lg" style="width:28px;padding:3px 4px;margin-right:5px;"><font size=3;>' + i + '</font></a>');
        
          $("#"+divAdi).append(anchors);
    }
    
    $("#"+divAdi+" a:first").css("background","black");
    $("#"+divAdi+" a").on("click", function(){
        
    $("#"+divAdi+" a").css("background","#289BE8"); 
        
    var indis = $(this).index() + 1;
    var gt = veriSayisi * indis;
        
    $(this).css("background","black");   
    $("#"+tabloAdi+" tbody tr").hide();
   safyaLinklerigosterimi(divAdi,indis-1);
   for (i = gt - veriSayisi; i < gt; i++)
   {
      $("#"+tabloAdi+" tbody tr:eq(" + i + ")").show();
   }
    });
}
function ulkeyeGoreSehirDoldur(slctUlke,slctSehir){

    $("#"+slctUlke).on("change",function(){
         sehirleriDoldur(slctSehir,$("#"+slctUlke).val());
     });
}
function sayfaGecisleri(btnAdi,sayfaAdi){
    $("#"+btnAdi).click(function(){
        $(".admin").css("display","none");
        $("."+sayfaAdi).css("display","inline");
        
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
        foto360Url=resp.url;      
    });     
     
    fotografEkle();
    tablodaSatirGuncelle("tblFotoListeleAdmin");
    tablodanFotografSil("tblFotoListeleAdmin","/fotograf/sil");
    
    kategoriSehirUlkeEkle("btnKategoriEkle","inpKategoriEkle","slctKategori","slctGuncelleKategori","kategori","/kategori/ekle");
    kategoriSehirUlkeEkle("btnSehirEkle","inpSehirEkle","slctSehir","slctGuncelleSehir","sehir","/sehir/ekle");
    kategoriSehirUlkeEkle("btnUlkeEkle","inpUlkeEkle","slctUlke","slctGuncelleUlke","ulke","/ulke/ekle");
    kategoriSehirUlkeSil("btnKategoriSil","slctKategori","slctGuncelleKategori","kategori","/kategori/sil");
    kategoriSehirUlkeSil("btnSehirSil","slctSehir","slctGuncelleSehir","sehir","/sehir/sil");
    kategoriSehirUlkeSil("btnUlkeSil","slctUlke","slctGuncelleUlke","ulke","/ulke/sil");
    
    ulkeyeGoreSehirDoldur("slctUlke","slctSehir");
    ulkeyeGoreSehirDoldur("slctGuncelleUlke","slctGuncelleSehir");
    
    modaldaGoster();
    
    sayfalama("tblFotoListeleAdmin","sayfalama");
    safyaLinklerigosterimi("sayfalama",0);
});







