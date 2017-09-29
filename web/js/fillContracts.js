$(function(){
	fillContracts($("#clientsel option:selected").val());
	$( "#ydatum" ).bind( "change", function() {
      fillContracts($("#clientsel option:selected").val());
	  fillNumber();
	});
	$( "#mondatum" ).bind( "change", function() {
	  fillNumber();
	});
	$( "#daydatum" ).bind( "change", function() {
	  fillNumber();
	});
	$( "select[name=tip]" ).bind( "change", function() {
	  fillNumber();
	});
	$( "select[name=year]" ).bind( "change", function() {
        fillContracts($("#clientsel option:selected").val());
	});
});

function fillContracts(client_id){
	$("#contract_id").empty();
	// Создать URL для подключения
	var rootURL = $("#homelink").attr('href');
	var url = rootURL + "other/select_contracts.php";
	//var period = $("#periodselect option:selected").val()
	var year = $("#ydatum option:selected").val()

	url=(url+'?id='+client_id);
	url=(url+'&year='+year);
	//alert(url);
    $.getJSON( url, {}, function(data){
	  //alert ("populating options");
      var options = '';
      for (var i = 0; i < data.contracts.length; i++) {
        options += '<option data-periodity="'+data.contracts[i].optionPeriodity+'" data-maxnum="'+data.contracts[i].optionMaxnum+'" value="' + data.contracts[i].optionValue +'" data-emitter="' + data.contracts[i].optionEmitterAbb + '">' + data.contracts[i].optionDisplay + '</option>';
      }
      var pril_options = '';
      for (var i = 0; i < data.prils.length; i++) {
        pril_options += '<div ><input type=checkbox name=obraz'+data.prils[i].optionValue+'>' + data.prils[i].optionDisplay + '</div>';
      }
      $("select#contract_id").html(options);
      $("div#multiple_selector").html(pril_options);
      $("div#client_comment").html(data.comment);
	  predefinePeriod();
	  fillNumber();
	})
}

function predefinePeriod(){
	  var period = (new Date).getMonth();
	  var periodity=$("#contract_id option:selected").attr('data-periodity');
	  //alert("periodity "+periodity);
	  if(periodity == 1){
		//period will be current month
		period++;
	  }
	  if(periodity == 2){
		//period will be current quarter
		period = 12+1+Math.floor((period)/3);
		//alert(period);
	  }
	  $("#periodselect option[value="+period+"]").attr('selected','selected');

}

function fillNumber(){
	  var period_array = {
		1:'01',
		2:'02',
		3:'03',
		4:'04',
		5:'05',
		6:'06',
		7:'07',
		8:'08',
		9:'09',
		10:'10',
		11:'11',
		12:'12',
		13:'I',
		14:'II',
		15:'III',
		16:'IV'
	  };
	  var period=period_array[$("#periodselect option:selected").val()];
	  var year=$("#ydatum option:selected").val();
	  var mon=period_array[$("#mondatum option:selected").val()];
	  var day=$("#daydatum option:selected").val();
	  var tip = $('select[name=tip] option:selected').text();
	  var emitter=$("#contract_id option:selected").attr('data-emitter');
	  var recepient=$("#clientsel option:selected").attr('data-abb');
	  var maxnum=$("#contract_id option:selected").attr('data-maxnum');
		$("#nr").attr('value',emitter+'-'+recepient+'-'+year+'-'+mon+'-'+day+'-INV-'+tip+'-'+period+'-');
		$("#fakeid").attr('value',maxnum);
}
