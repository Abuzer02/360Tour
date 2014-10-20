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
function sayfayaFotografEkle(data)
{
    $("#content").html("");
     for(var i=0;i<data.length;i++)
            { 
             var img=$('<a class="fotograf" ><img src="'+data[i].url+'" alt="" class="img-responsive img-thumbnail" /></a>');                                      
             $("#content").append(img);
            }
}
function fotografIncele(id){
        var fotografId =id.split(" ")[0];
        var win = window.open('/projeincele/'+fotografId, '_blank');
        win.focus();        
    
    
}
function kullaniciTablosunaButonEkle(tr,rowId)
{
      var td=$("<td></td>");
      td.append(buttonSil(rowId));
      td.append("<span> </span>");
      td.append(buttonGuncelle(rowId));
      tr.append(td);
}
function tabloyaSatırEkle(tabloAdi, values) {
    var table=$("#"+tabloAdi);
    var tr=$("<tr id=\""+values[0] + "\"></tr>");
    table.find("tbody").last().append(tr);
    
    for(var i=1;i<values.length;i++)
    {
        var td=$("<td>"+values[i]-1+"</td>");
        tr.append(td);
    }
      var td=$("<td></td>");
      td.append(buttonSil(values[0]));
      td.append("<span> </span>");
      td.append(buttonGuncelle(values[0]));
      tr.append(td);
}
function convertToArr(veri) {
    var arr = [];
    arr.push(veri._id);
    arr.push(veri.ad);
    arr.push(veri.soyad);
    arr.push(veri.sifre);
    return arr;
}
function tabloDoldur(tabloAdi,url,cb)
{
    
    var table=$("#"+tabloAdi);
    table.find("tbody > tr").remove();
    wsGet(url,
         function(err,veriler)
          {
            if(err)
            {
              console.log("veritabanında hata oluştu!!");
              return;
            }
             for(var i=0;i<veriler.length;i++){
                tabloyaSatırEkle(tabloAdi,convertToArr(veriler[i]));                   
        
            }
             
          });
    
}

function buttonSil(veri_id){ return "<button id=\""+veri_id+"\" id='btnSil' class='sil'>Sil</button>";}
function buttonGuncelle(veri_id){ return "<button id=\""+veri_id+"\" class='guncelle'>Güncelle</button>";}