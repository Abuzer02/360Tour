function yorumOnayla(){
    $("#tblYorum").on("click",".onayla",function(){
        var obj={yorumId:$(this).attr("id")};
        wsPost("/fotograf/guncelle/array",obj,function(err,data){
            if(err){
                console.error(err);
                return;
            }
            alertify.success("Yorum Başarı ile onaylandı");
        });
        $(this).closest("tr").remove();
        $("#btnYorum").css("background-color","white");
    });
}

function yorumSil(){
    $("#tblYorum").on("click",".sil",function(){
        var tr=$(this).closest("tr");
        var idFoto=tr.find("td").eq(0).attr("id");
        var obj={_id:idFoto,yorumId:$(this).attr("id")};
        wsPost("/fotograf/remove/array",obj,function(err,data){
            if(err){
                console.error(err);
                return;
            }
            alertify.error("Yorum Başarı ile silindi");
        });
         tr.remove();
    });
}
function onayDurumunaGoreListele(durum){
        $("#tblYorum>tbody>tr").hide();
        $("#tblYorum>tbody>tr").each(function(){
            if($(this).attr("data")==durum){
                $(this).show();
                if($(this).attr("data")=="false"){
                    $("#btnYorum").css("background-color","red");
                }
                
            }
        });
}
$(document).ready(function(){
    
    sayfaGecisleri("btnYorum","yorum");
    yorumOnayla();
    yorumSil();
    $("#btnOnaylananlar").click(function(){
        onayDurumunaGoreListele("true");
        sayfalama("tblYorum","yorumSayfalama");
    });
       onayDurumunaGoreListele("false");
    $("#btnYorum").click(function(){
        onayDurumunaGoreListele("false");
        $("#yorumSayfalama").empty();
    });
});