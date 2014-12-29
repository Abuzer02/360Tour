function reklamSayfasiGecis()
{
      $("#btnReklam").click(function(){
          $(".yonetici").css("display","none");
          $(".ayarlar").css("display","none");
          $(".yorum").css("display","none");
          $(".reklam").css("display","inline");
      });
}
function reklamEkle()
{
    $("#btnReklamSrcEkle").click(function(){
        var objReklam={
                eklemeYeri    : $("#slctReklamYeri option:selected").val(),
                eklenenKaynak : $("#txtReklamSrc").val()
        };
        wsPost("/reklam/ekle",objReklam,function(err,data){
            if(err){
                console.error(err);
                return;
            }
            var tr=$("<tr id="+data._id+"></tr>");
            $("#tblReklam").find("tbody").append(tr);
            tabloyaSatırEkle(reklamToArr(objReklam),tr);
            $("textarea").val("");
            tr.append(btnSil(data._id));
            alertify.success("Başarı ile Eklendi");
        });
    });
}
function reklamlariListele(){

    wsGet("/reklam/tumreklamlarilistele",function(err,data){
        if(err){
            console.error(JSON.stringify(err));
            return;
        }
        for(var i=0;i<data.length;i++){
            var tr=$("<tr id="+data[i]._id+"></tr>");
            tabloyaSatırEkle(reklamToArr(data[i]),tr);
            tr.append(btnSil(data[i]._id));
            $("#tblReklam").find("tbody").append(tr);
        }
    });
}
$(document).ready(function(){

    reklamSayfasiGecis();
    reklamlariListele();
    reklamEkle();
    tablodanSil("tblReklam","/reklam/sil");
});