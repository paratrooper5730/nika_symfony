function updateSers(){ 
	$("#supnum").empty();
	// Создать URL для подключения
	var rootURL = $("#homelink").attr('href');
	var url = rootURL + "dep/getpositions?id=" + $("select[name=depnum]").val();
    $.getJSON( url, {}, function(data){
	  //alert ("populating options "+url);
      var options = '';
      for (var i = 0; i < data.priceitems.length; i++) {
          if(data.priceitems[i].id == $('#supnum_to_copy_id').val()){
              selected = 'selected';
          }else{
              selected = '';
          }
        options += '<option '+ selected +' value="' + data.priceitems[i].id +'" >' + data.priceitems[i].runame + '</option>';
      }
      $("#supnum").html(options);
	})
} 
