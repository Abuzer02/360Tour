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
            var trAnasayfa=$("<tr></tr>");
            var tbodyAnasayfa=$("#tblMetaAnasayfa").find("tbody");
            var metaObj={
                ad:$("#slctMetaElemanlari option:selected").val(),
                icerik:$("#txtIcerik").val()
             };
            wsPost("/meta/ekle",metaObj,function(err,data){
                if(err){
                    console.error(JSON.stringify(err));
                    return;
                }
                tabloyaSatırEkle(metaToArr(metaObj),trAnasayfa);
                var td=$("<td></td>");
                trAnasayfa.attr("id",data._id);
                td.append(btnSil(data._id));
                trAnasayfa.append(td);
                tbodyAnasayfa.append(trAnasayfa);
            });
        }else{
            var tbodyFoto=$("#tblMetaFotografIncele").find("tbody");
            var id=$("#slctFotograf option:selected").attr("id");
            var trFoto=$("<tr id="+id+"></tr>");
            var fotoMeta={
                    fotoAd:$("#slctFotograf option:selected").val(),
                    ad:$("#slctMetaElemanlari option:selected").val(),
                    icerik:$("#txtIcerik").val()
                };
            var metaArray={
                metalar:[{
                    ad:$("#slctMetaElemanlari option:selected").val(),
                    icerik:$("#txtIcerik").val()
                }]
            };
            wsPost("/fotograf/ekle/metaekle",{_id:id,metaArray:metaArray},function(err,data){
                 if(err){
                    console.error(JSON.stringify(err));
                    return;
                }
                var last=data.metalar.length-1; 
                var metaId=data.metalar[last]._id;
                tabloyaSatırEkle(metaFotoToArr(fotoMeta),trFoto);
                var tdFoto=$("<td></td>");
                tdFoto.append(btnSil(metaId));
                trFoto.append(tdFoto);
                tbodyFoto.append(trFoto);
            });
        }
    });
     $("textarea").val("");
     $("select option:contains('Seçiniz')").prop("selected",true);
}
function fotoMetaSil(){
    $("#tblMetaFotografIncele").on("click",".sil",function(){
        var tr=$(this).closest("tr");
        var idFoto=tr.attr("id");
        var obj={_id:idFoto,metaId:$(this).attr("id")};
        wsPost("/fotograf/sil/metasil",obj,function(err,data){
            if(err){
                console.error(err);
                return;
            }
            alertify.error("Meta Başarı ile silindi");
        });
         tr.remove();
    });
}

function fotoyaGoreSayfala(){
    
    $("#tblMetaFotografIncele tbody tr").hide();
     $("#slctFotograf").on("change",function(){
       $("#tblMetaFotografIncele tbody tr").hide();
       var tableLength=$("#tblMetaFotografIncele tbody tr").length;
         for(var i=0;i<tableLength;i++){
           if($("#slctFotograf option:selected").val() == $("#tblMetaFotografIncele tbody tr").eq(i).find("td").eq(0).text()){
                $("#tblMetaFotografIncele tbody tr").eq(i).show();
           }
        } 
    });        
}

$(document).ready(function(){
  
    $("#frmMeta").ajaxForm(function(resp){
        var parsedResponse=JSON.parse(resp);
        var inpMetaElemani=$("#inpMetalElemani").val();
        var option=$("<option id="+parsedResponse._id+" value="+inpMetaElemani+">"+inpMetaElemani+"</option>");
        $("#slctMetaElemanlari").append(option);
        $("input[type='text']").val("");
    
    });
    $("#slctSayfa").on("change",function(){
        if($("#slctSayfa option:selected").val()=="Anasayfa"){
        $("#slctFotograf").attr("disabled","disabled");
    }else{
        $("#slctFotograf").removeAttr("disabled");
    }
    });
    
    $("#btnListele").click(function(){
         $("#tblMetaFotografIncele tbody tr").show();                       
    });
    
    fotoyaGoreSayfala();
    metaTagSayfasiGecis();
    metaElemaniSil();
    metaEkle();
    tablodanSil("tblMetaAnasayfa","/meta/sil");
    fotoMetaSil();
});