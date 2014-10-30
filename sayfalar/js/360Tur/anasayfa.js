function sayfayaFotografEkle(data)
{
    for(var i=0;i<data.length;i++){
   
        var htmlFotograf=$('<div class="col-xs-6 col-sm-4 col-md-4">'+
                           '<div class="well">'+
                            '<div class="wow bounceInUp" data-wow-delay="1s">'+
                                '<div class="team">'+
                                    '<div class="inner">'+
                                        '<h5 style="color:#fff;">'+data[i].ad+'</h5>'+
                                     '<p class="subtitle" style="color:#fff; font-weight:bold;">'+data[i].kategori+'</p>'+
                                    '<div class="avatar"><a href="" data-toggle="modal" data-target="#fotograf_incele" data-foto-url="'+data[i].url+'" data-foto-ad="'+data[i].ad+'" data-foto-yer="'+data[i].kategori+'"><img src="'+data[i].url+'" alt="" class="img-responsive img-thumbnail" style="width:200px; height:100px;"/></a></div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>');
        $(".3dFotograflar").append(htmlFotograf);        
    }
   
}

$(document).ready(function(){
    
    fotograflariListele("");
    
   $('#fotograf_incele').on('show.bs.modal', function(e) {
       
       var fotoAd   =$(e.relatedTarget).data("foto-ad");
       var fotoYer   =$(e.relatedTarget).data("foto-yer");
       var fotografUrl = $(e.relatedTarget).data("foto-url");
       
       $(e.currentTarget).find("h4[id='headerFotografAdYer']").html(fotoAd+"/"+fotoYer);
       $(e.currentTarget).find('param[name="movie"]').val(fotografUrl);
    });

});