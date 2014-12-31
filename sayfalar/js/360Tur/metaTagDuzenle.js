function metaTagSayfasiGecis()
{
      $("#btnMeta").click(function(){
          $(".yonetici").css("display","none");
          $(".ayarlar").css("display","none");
          $(".reklam").css("display","none");
          $(".yorum").css("display","none");
          $(".meta").css("display","inline");
          
      });
}
function metaElemaniSil(){
    $("#btnMetaElemaniSil").click(function(){
        var obj={_id:$("#slctMetaElemanlari option:selected").attr("id")};
        wsPost("/metaelemanlari/sil",obj,function(err,data){
            if(err){
                console.error(err);
                return;
            }
            $("#slctMetaElemanlari option:selected").remove();
        });
    });
}
function metaEkle(){
    $("#btnMetaEkle").click(function(){
        if($("#slctSayfa option:selected").val()=="Anasayfa"){
            var metaObj={
                ad:$("#slctMetaElemani option:selected").val(),
                icerik:$("#txtIcerik").val()
             };
            wsPost("/meta/ekle",metaObj,function(err,data){
                if(err){
                    console.error(JSON.stringify(err));
                    return;
                }
                
            });
        }else{
            var id=$("#slctFotograf option:selected").attr("id");
            var metaArray={
                metalar:[{
                    ad:$("#slctMetaElemanlari option:selected").val(),
                    icerik:$("#txtIcerik").val()
                }]
            };
            wsPost("/fotograf/ekle/metaekle",{_id:id,metaArray:metaArray},function(err,data){
                 if(!err){
                    console.error(JSON.stringify(err));
                    return;
                }
            });
            $("textarea").val("");
            $("select option:contains('Seçiniz')").prop("selected",true);
        }
    });
}
$(document).ready(function(){
  
    $("#frmMeta").ajaxForm(function(resp){
        $("input[type='text']").val("");
        location.reload();
    
    });
    $("#slctSayfa").on("change",function(){
        if($("#slctSayfa option:selected").val()=="Anasayfa"){
        $("#slctFotograf").attr("disabled","disabled");
    }else{
        $("#slctFotograf").removeAttr("disabled");
    }
    });
    metaTagSayfasiGecis();
    metaElemaniSil();
    metaEkle();
});