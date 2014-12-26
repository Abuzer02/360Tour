function mesajAl(){
 $("#btnMesajGonder").click(function(){
  var mesajObj={
                 ad     :$("#inpAd").val(),
                 email  :$("#inpEmail").val(),
                 mesaj  :$("#txtMesaj").val()
  };  
  wsPost("/iletisim/ekle",mesajObj,function(err,data){
  
      if(err){
      
          alertify.error(JSON.stringify(err));
          return;
      }
      alertify.success("Mesajınız iletildi");
      $("#divIletisim input,textarea").val("");
  });
});
}

function fotograflariSayfalaIcerik(data){
    
        $("#fotografListesi").empty();
        for(var i=0;i<data.length;i++){
            
            var fotoLi=$('<li class="portfolio-item col-md-4"><a onclick="fotoTiklanmaSayisi(this.href);" href="fotografincele/'+data[i]._id+"/"+data[i].ad+'" target="_blank" data='+data[i].tiklanmaSayisi+' tarih='+data[i].eklemeTarihi+'><div class="item-inner"><div class="portfolio-image"><img id="fotolar" src="'+data[i].url+'" alt="" style="height:200px;"></div><h5>'+data[i].ad+'</h5></div></a></li>');
            
            fotoLi.hide();
            
            $("#fotografListesi").append(fotoLi);
            $("#fotografListesi :last-child").fadeIn(300);
        }
    
}

function fotograflariSayfala(skip){
    
    var searchCriteria={ulke:"",sehir:"",kategori:""};
    
    if($("#ulkeListesi").val()!="seciniz"){searchCriteria.ulke=$("#ulkeListesi").val();}
    if($("#sehirListesi").val()!="seciniz"){searchCriteria.sehir=$("#sehirListesi").val();}
    if($("#kategoriListesi").val()!="seciniz"){searchCriteria.kategori=$("#kategoriListesi").val();}
    searchCriteria.limit=limit;
    searchCriteria.skip=skip*limit;
    
    wsPost("/fotograf/pager",searchCriteria,function(err,data){
        
       fotograflariSayfalaIcerik(data.fotograf);
    });
    $("#pagerLinks a").css("background","#289BE8");
    $("#f"+skip).css("background","black");
    ileriLinki(skip);
    
    if(skip!=0){
        var offset = -100; //Offset of 20px
        $('html, body').animate({
            scrollTop: $("#services").offset().top + offset
        }, 500);
    }
    
}

function sehirleriDoldur(slctSehir,ulke){
    
    $("#"+slctSehir).empty();
    
    var seciniz=$('<option value="seciniz">Şehir Seçiniz</option>');
    
    $("#"+slctSehir).append(seciniz);
    
    wsPost("/sehir/arama",
           {
              search : 
              {
                ulke : ulke,             
              },
                 output : "sehir"
          },function(err,data){
           
             if(err){
             
                 console.log(err);
                 return;
             }
               for(var i=0;i<data.length;i++){
               
                   var sehirElem=$("<option value='"+data[i].sehir+"'>"+data[i].sehir+"</option>");
                   $("#"+slctSehir).append(sehirElem);
               }
           }
          );
}
function kritereGoreSayfala(){
    
    var searchCriteria={ulke:"",sehir:"",kategori:""};
    if($("#ulkeListesi").val()!="seciniz"){searchCriteria.ulke=$("#ulkeListesi").val();}
    if($("#sehirListesi").val()!="seciniz"){searchCriteria.sehir=$("#sehirListesi").val();}
    if($("#kategoriListesi").val()!="seciniz"){searchCriteria.kategori=$("#kategoriListesi").val();}
    searchCriteria.limit=limit;
    
    wsPost("/fotograf/fotosayisi",searchCriteria,function(err,data){
    
        if(err){
        
            console.log(err);
            return;
        }
        
        $("#pagerLinks").empty();
        fotograflariSayfala(0);   
        ileriLinki(0,data.fotografSayisi);
    });
    
}
function sayfaNoEkle(data){
    
    var anchorArr=[];
    for(var i=0;i<data/limit;i++){
            
           anchorArr[i]=$('<a id="f'+i+'" onclick="fotograflariSayfala('+i+')" href="javascript: void(0)" class="btn btn-primary btn-lg" style=" width:28px;padding:4px 4px;"><font size=4;>'+(i+1)+'</font></a><span> </span>');
           $("#pagerLinks").append(anchorArr[i]);
         }
}

function ileriLinki(skip,data){
    
    sayfaNoEkle(data);
    var ileri,geri;
    $("#pagerLinks a").hide();
   if(skip-5<0 && $("#pagerLinks a").length < skip+5){
        ileri=$("#pagerLinks a").length;
        geri=0;
   }else if((skip-5)>0 && $("#pagerLinks a").length>(skip+5)){
       ileri=skip+5;
       geri=skip-5;
   }
   else if(skip-5 <= 0 && $("#pagerLinks a").length > skip+5){
       ileri=8;
       geri=0;
   }else if(skip-5 > 0 && $("#pagerLinks a").length <= skip+5){
       ileri=$("#pagerLinks a").length;
       geri=ileri-9;
   }
    
    for(var i=geri;i<=ileri;i++){
        
       $("#pagerLinks a:eq("+i+")").show();
        
    }
} 
  function fotoTiklanmaSayisi(href)
 {
    
   var str=href.split("/");
   var count=0;
         var searchCriteria=
            {
              search:{_id:str[4]},
                output:"tiklanmaSayisi"
            };
     
      var guncelObj={_id:str[4]};
     
        wsPost("/fotograf/tiklanmasayisiguncelle",guncelObj,function(err,data){
        
            if(err){
            
                console.log(err);
                return;
            }
        });

 }
function enCokTiklananlar(){

    wsGet("/fotograf/tiklanmasayisinagoresirala",function(err,data){
    
        if(err){
            console.log(err);
            return;
        }
        fotograflariSayfalaIcerik(data.fotograf);
        $("#pagerLinks").empty();
    });
    
}
function enSoEklenenler(){

    wsGet("/fotograf/ensoneklenenlerilistele",function(err,data){
    
        if(err){
            console.log(err);
            return;
        }
        fotograflariSayfalaIcerik(data.fotograf);
        $("#pagerLinks").empty();
    });
}
var limit=12;

$(document).ready(function(){
     
     sehirleriDoldur("sehirListele",$("#ulkeListele").val());
    
     kritereGoreSayfala();
    
     mesajAl();
    
     $("#ulkeListesi").on("change",function(){
         sehirleriDoldur("sehirListesi",$("#ulkeListesi").val());
         kritereGoreSayfala();
     });
    
    $("#sehirListesi").on("change",function(){
        kritereGoreSayfala();
     });
    
    $("#kategoriListesi").on("change",function(){
        kritereGoreSayfala();
     });
});