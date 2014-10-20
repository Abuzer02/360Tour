function fotograflariListele(kategoriAdi)
{
    var kategori={kategori :kategoriAdi};
    if(kategoriAdi=="")
    {
     kategori={};
    }
    var data={
        search :kategori,
        output :"ad url"
    };
    wsPost('/fotograf/arama',data,
          function(err,resp){
              if(err){
                  alert(err);
                  return;
              }
              sayfayaFotografEkle(resp);
          });   
}
$(document).ready(function(){
    
    fotograflariListele("");
    
    $(".kategori").bind("click",function(){
        fotograflariListele(this.innerHTML);
        
    });
    
    $(".fotograf").bind("click",function(){
         console.log(this.id);
        //fotografIncele(this.id);
    });
});