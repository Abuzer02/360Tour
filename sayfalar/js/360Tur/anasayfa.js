function mesajAl(){
 $("#btnMesajGonder").click(function(){
  var mesajObj={
                 ad     :$("#inpAd").val(),
                 email  :$("#inpEmail").val(),
                 mesaj  :$("#txtMesaj").val()
  };  
  wsPost("/iletisim/ekle",mesajObj,function(err,data){
  
      if(err){
      
          alertify.error(JSON.stringify(err));
          return;
      }
      alertify.success("Mesajınız iletildi");
      $("#divIletisim input,textarea").val("");
  });
});
}
$(document).ready(function(){

        modaldaGoster();
        mesajAl();
});