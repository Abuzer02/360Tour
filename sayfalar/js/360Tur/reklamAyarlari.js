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
$(document).ready(function(){

    sayfaGecisleri("btnReklam","reklam");
    reklamEkle();
    tablodanSil("tblReklam","/reklam/sil");
});