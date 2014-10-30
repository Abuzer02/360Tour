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
     for(var i=0;i < data.length;i++)      
     {
        var td=$("<td>"+data[i]+"</td>"); 
       tr.append(td);
     }
}
function tabloyaButonEkle(fotografId,tr)
{
    var td=$("<td></td>");
    td.append(btnGuncelle(fotografId));td.append("<span> </span>");td.append(btnSil(fotografId)); 
    tr.append(td); 
}
function fotoToArr(response) {
    var arr = [];   
    var a = "<a class='example-image-link' href='" + response.url + "' data-lightbox='example-set'>" +
                            "<img src='/img/icons/galery-icon.png' alt='' class='img-responsive img-thumbnail' style='width:40px;height:40px;'></img>"+
                        "</a>";
    var a360 ="<a class='example-image-link' href='" + response.url360Tour + "' data-lightbox='example-set'>" +
                            "<img src='/img/icons/galery-icon.png' alt='' class='img-responsive img-thumbnail' style='width:40px;height:40px;'></img>"+
                        "</a>";
    arr.push(a);
    arr.push(a360);
    arr.push(response.ad);
    arr.push(response.sehir);
    arr.push(response.ulke);
    arr.push(response.kategori);
    arr.push(response.eklemeTarihi);
    arr.push(response.aciklama);
    return arr;
}
function tablodanSil(tabloAdi,url){
    
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
        var url2=tr.find("a").eq(1).attr("href");
        url1=url1.replace("/yuklemeler/","");
        url2=url2.replace("/yuklemeler/","");
        var fileArr=[];
        fileArr.push(url1);        
        fileArr.push(url2);
        console.log(tr.html());
        dosyaSil(fileArr);
        tr.remove();
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

function btnGuncelle(fotografId){return $('<button id='+fotografId+' class="btn btn-small btn-primary guncelle"  data-toggle="modal" data-target="#mdl_güncelle"><span class="glyphicon glyphicon-repeat"></span></button>');}

function btnSil(fotografId){return $('<button id='+fotografId+' class="btn btn-small btn-danger sil"><span class="glyphicon glyphicon-trash"></span></button>');}
