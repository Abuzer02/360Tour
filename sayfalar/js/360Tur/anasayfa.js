$(document).ready(function(){

    $('#modal_tour').on('show.bs.modal', function(e) {
        
       var fotografUrl       = $(e.relatedTarget).data("foto-url");
       var fotoAd            =$(e.relatedTarget).data("foto-ad");        
       var fotoSehir         =$(e.relatedTarget).data("foto-sehir");        
       var fotoUlke          =$(e.relatedTarget).data("foto-ulke");        
       var fotoEklemeTarihi  =$(e.relatedTarget).data("foto-eklemeTarihi");
       var fotoAciklama      =$(e.relatedTarget).data("foto-aciklama");       
       
       $(e.currentTarget).find("h4[id='headerFotografAdYer']").html(fotoSehir+"/"+fotoUlke);
        $(e.currentTarget).find('object').attr("data",fotografUrl);
       $(e.currentTarget).find('param[name="movie"]').val(fotografUrl);
    });
});