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
function fotoToArr(data) {
    var arr = [];
    arr.push(data.url);
    arr.push(data.ad);
    arr.push(data.sehir);
    arr.push(data.ulke);
    arr.push(data.kategori);
    arr.push(data.eklemeTarihi);
    arr.push(data.aciklama);
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
        
      }); 
        $("#"+tabloAdi).find("tbody").find("tr[id="+this.id+"]").remove();
  });  
}

function btnGuncelle(fotografId){return $('<button id='+fotografId+' class="btn btn-small btn-primary guncelle"  data-toggle="modal" data-target="#mdl_güncelle"><span class="glyphicon glyphicon-repeat"></span></button>');}

function btnSil(fotografId){return $('<button id='+fotografId+' class="btn btn-small btn-danger sil"><span class="glyphicon glyphicon-trash"></span></button>');}
