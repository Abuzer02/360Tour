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
    
    var aramaObjesi=kriterObjesi("ulkeListesi","sehirListesi","kategoriListesi");
    
    aramaObjesi.limit=limit;
    aramaObjesi.skip=skip*limit;
    
    wsPost("/fotograf/pager",aramaObjesi,function(err,data){
        if(err){
            console.error(err);
            return;
        }
       fotograflariSayfalaIcerik(data.fotograf);
    });
    $("#pagerLinks a").css("background","#289BE8");
    $("#f"+skip).css("background","black");
    safyaLinklerigosterimi("pagerLinks",skip);
    
    if(skip!=0){
        var offset = -100; //Offset of 20px
        $('html, body').animate({
            scrollTop: $("#services").offset().top + offset
        }, 500);
    }
    
}

function kritereGoreSayfala(){
    
    var searchCriteria=kriterObjesi("ulkeListesi","sehirListesi","kategoriListesi");
    wsPost("/fotograf/fotosayisi",searchCriteria,function(err,data){
    
        if(err){
        
            console.log(err);
            return;
        }
        
        $("#pagerLinks").empty(); 
        fotograflariSayfala(0);
        sayfaNoEkle(data.fotografSayisi);
        safyaLinklerigosterimi("pagerLinks",0);
    });
    
}

function sayfaNoEkle(data){
    
    var anchorArr=[];
    for(var i=0;i<data/limit;i++){
            
           anchorArr[i]=$('<a id="f'+i+'" onclick="fotograflariSayfala('+i+')" href="javascript: void(0)" class="btn btn-primary btn-lg" style=" width:28px;padding:4px 4px;"><font size=4;>'+(i+1)+'</font></a><span> </span>');
           $("#pagerLinks").append(anchorArr[i]);
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
    
    $("#frmMesaj").ajaxForm(function(resp){
        
       $("input[type='text']").val("");
       $("textarea").val("");
       alertify.success("Mesajınız alınmıştır");
    
    });
     
     kritereGoreSayfala();

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