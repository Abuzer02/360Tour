function wsPost(url, data, cb) {
    $.ajax({
        dataType: 'json',
        headers: {
            "Content-Type" :"application/json"
        },
        type:'POST',
        data: JSON.stringify(data),
        url: url,
        success: function(data)
        {
            cb(null, data);
        },
        error: function(data)
        {
            cb(data, null);
        }
    });
}
function wsGet(url, cb) {
    $.ajax({
        dataType: 'json',
        headers: {
            Accept :"application/json"
        },
        type:'GET',
        url: url,
        success: function(data)
        {
            cb(null, data);
        },
        error: function(data)
        {
            cb(data, null);
        }
    });
}
function tabloyaSatırEkle(data,tr)
{        
     for(var i=0;i<data.length;i++)      
     {
        var td=$("<td style='overflow:hidden;'>"+data[i]+'</td>'); 
        tr.append(td);
     }
}
function tabloyaButonEkle(fotografId,tr)
{
    var td=$("<td></td>");
    td.append(btnSil(fotografId));td.append("<span> </span>");td.append(btnGuncelle(fotografId));td.append("<span> </span>");td.append(btnMetaEkle(fotografId)); 
    tr.append(td); 
}
function fotoToArr(response) {
    var arr = [];   
    var a = "<a class='example-image-link' href='" + response.url + "' data-lightbox='example-set'>" +
                            "<img src='/img/icons/galery-icon.png' alt='' class='img-responsive img-thumbnail' style='max-width:40px;max-height:40px;'></img>"+
                        "</a>";
    var a360='<div class="overlay"><a class="preview_1 btn btn-danger"  data-toggle="modal" data-target="#modal_tour" data-foto-ad="'+response.ad+'" data-foto-sehir="'+response.sehir+'" data-foto-ulke="'+response.ulke+'" data-foto-url="'+response.url360Tour+'"><img src="/img/icons/galery-icon.png" alt="" class="img-responsive img-thumbnail" style="max-width:40px;max-height:40px;"></img></i></a>';
    
    arr.push(a);
    arr.push(a360);
    arr.push(response.frameSrc);
    arr.push(response.ad);
    arr.push(response.sehir);
    arr.push(response.ulke);
    arr.push(response.kategori);
    arr.push(response.eklemeTarihi);
    return arr;
}
function mesajToArr(data){

    var arr=[];
    arr.push(data.ad);
    arr.push(data.email);
    arr.push(data.mesaj);
    return arr;
    
}
function kullaniciToArr(data){
 
    var arr=[];
    arr.push(data.ad);
    arr.push(data.soyad);
    arr.push(data.sifre);
    return arr;
}
function reklamToArr(data){
 
    var arr=[];
    arr.push(data.eklemeYeri);
    arr.push(data.eklenenKaynak);
    return arr;
}
function metaToArr(data){
 
    var arr=[];
    arr.push(data.ad);
    arr.push(data.icerik);
    return arr;
}
function metaFotoToArr(data){
 
    var arr=[];
    arr.push(data.fotoAd);
    arr.push(data.ad);
    arr.push(data.icerik);
    return arr;
}
function tablodanFotografSil(tabloAdi,url){
    
    $("#"+tabloAdi).on("click",".sil",function(){
        
        var data={_id:this.id};
        wsPost(url,data,function(err,data){
           if(err)
           {
             console.log(JSON.stringify(err));
               return;
           }  
            console.log(JSON.stringify(data));
      }); 
        var tr=$("#"+tabloAdi).find("tbody").find("tr[id="+this.id+"]");
        var url1=tr.find("a").eq(0).attr("href");
        var url2=tr.find("a").eq(1).attr("data-foto-url");
        url1=url1.replace("/yuklemeler/","");
        url2=url2.replace("/yuklemeler/","");
        var fileArr=[];
        fileArr.push(url1);        
        fileArr.push(url2);
        dosyaSil(fileArr);
        tr.remove();
        alertify.success("Başarıyla Silindi");
  });  
}
function tablodanSil(tabloadi,url){
  
    $("#"+tabloadi).on("click",".sil",function(){
        var obj={ _id : this.id};
        console.log(this.id);
        var tr=$("#"+tabloadi).find("tbody").find("tr[id="+obj._id+"]");
        wsPost(url,obj,function(err,data){
            if(err){
                console.error(JSON.stringify(err));
                return;
            }
        });
            tr.remove();
        alertify.success("Başarıyla Silindi");
    });
}
function dosyaSil(fileArr)
{
    wsPost("/dosya/dosyasil",{fileList:fileArr},function(err,resp)
    {
       if(err)
       {
          console.log(JSON.stringify(err));
           return;
       }
        
    });
}
function modaldaGoster()
{

    $('#modal_tour').on('show.bs.modal', function(e) {
        
       var fotografUrl       = $(e.relatedTarget).data("foto-url");
       var fotoAd            =$(e.relatedTarget).data("foto-ad");        
       var fotoSehir         =$(e.relatedTarget).data("foto-sehir");        
       var fotoUlke          =$(e.relatedTarget).data("foto-ulke");        
       var fotoEklemeTarihi  =$(e.relatedTarget).data("foto-eklemeTarihi");
       var fotoAciklama      =$(e.relatedTarget).data("foto-aciklama");       
       
       $(e.currentTarget).find("h4").html(fotoSehir+"/"+fotoUlke);
        $(e.currentTarget).find('object').attr("data",fotografUrl);
       $(e.currentTarget).find('param[name="movie"]').val(fotografUrl);
    });
}
function btnGuncelle(fotografId){return $('<button id='+fotografId+' class="btn btn-small btn-primary guncelle" title="Duzenle" data-toggle="modal" data-target="#mdl_güncelle"><span class="glyphicon glyphicon-edit"></span></button>');}

function btnSil(fotografId){return $('<button id='+fotografId+' class="btn btn-small btn-danger sil" title="Sil"><span class="glyphicon glyphicon-trash"></span></button>');}

function btnMetaEkle(fotografId){return $('<button id='+fotografId+' class="btn btn-small btn-success metaEkle" title"Meta Ekle"><span class="glyphicon glyphicon-plus"></span></button>');}
