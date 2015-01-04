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
function kriterObjesi(ulke,sehir,kategori){
    
    var kriter={ulke:"",sehir:"",kategori:""};
    
    if($("#"+ulke).val()!="seciniz"){kriter.ulke=$("#"+ulke).val();}
    if($("#"+sehir).val()!="seciniz"){kriter.sehir=$("#"+sehir).val();}
    if($("#"+kategori).val()!="seciniz"){kriter.kategori=$("#"+kategori).val();}
    return kriter;
}
function safyaLinklerigosterimi(divAdi,skip){

    $("#"+divAdi+" a").hide();
   if(skip-5<0 && $("#"+divAdi+" a").length < skip+5){
        ileri=$("#"+divAdi+" a").length;
        geri=0;
   }else if((skip-5)>0 && $("#"+divAdi+" a").length>(skip+5)){
       ileri=skip+5;
       geri=skip-5;
   }
   else if(skip-5 <= 0 && $("#"+divAdi+" a").length > skip+5){
       ileri=10;
       geri=0;
   }else if(skip-5 > 0 && $("#"+divAdi+" a").length <= skip+5){
       ileri=$("#"+divAdi+" a").length;
       geri=ileri-11;
   }
    
    for(var i=geri;i<=ileri;i++){
        
       $("#"+divAdi+" a:eq("+i+")").show();
        
    }
}