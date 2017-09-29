function fillPeople(client_id,default_value){ 
	$("#contract_id").empty();
	// Создать URL для подключения
	var rootURL = $("#homelink").attr('href');
	var url = rootURL + "contact";
	url=(url+'?mode=json&client_id='+client_id);
	//alert(url);
    $.getJSON( url, {}, function(data){
	  //alert ("populating options");
	  //alert(data.length);
      var options = '';
      for (var i = 0; i < data.length; i++) {
        options += '<option ';
        if (data[i].id == default_value) options += ' selected ';
		options += ' value="' + data[i].id + '">' + data[i].first_name + ' ' + data[i].family_name + '</option>';
      }
	//alert(options);
      $("[name=client_signer_id]").html(options);
	  fillNumber();
	})
} 

function fillNumber(){ 
	  var tip_array = new Array('','SER','SER','PRIL','SS','JUR','OFF','DEP','TRA');
	  var emitter_array = { 
		IBAU:'AU',
		IBIT:'IT',
		IBCO:'IBC',
		IBCE:'BC',
		IBLO:'LO',
		IBKI:'KI',
		IBSP:'IBSP'
	  } ;
	  var mon2digit = $('#mondatum').attr('value');
	  if (mon2digit<10)mon2digit='0'+mon2digit;
	  //alert('searching for emitter');
	  var emitter=$("#contract_id option:selected").text().split("(").pop().substr(0,4);
      $("#nr").attr('value',emitter_array[emitter]+'-0000-'+mon2digit+'-'+tip_array[$('#tip').attr('value')]+'-'+$('#clientsel option:selected').text());
} 
