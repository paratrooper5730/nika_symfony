$(function(){ 
	$( "#emitter_id" ).bind( "change", function() { 
	  fill_contract_options();
	});
	$( "select" ).bind( "change", function() { 
	  fillNumber();
	});
	$( "input[name=new_abb]" ).bind( "change", function() { fillNumber(); });
	$( "input[name=new_abb2]" ).bind( "change", function() { fillNumber(); });
});

function fill_contract_options(){ 
	//////alert('filling contract options');
	var emitter_id = $("#emitter_id option:selected").val();
	if(!emitter_id){ 
		return;
	} 
	$("#contract_id").empty();
	// Создать URL для подключения
	var rootURL = $("#homelink").attr('href');
	var url = rootURL + "other/select_contracts.php";
	url=(url+'?emitter='+emitter_id);
	var options = "";
	//alert(url);
    $.getJSON(url+"&jsoncallback=?", {}, function(data){
      for (var i = 0; i < data.contracts.length; i++) {
        options += '<option data-periodity="'+data.contracts[i].optionPeriodity
					+'" data-maxnum="'+data.contracts[i].optionMaxnum
					+'" data-abb="'+data.contracts[i].optionAbb
					+'" data-emitter="'+data.contracts[i].optionEmitterAbb
					+'" value="' + data.contracts[i].optionValue + '">' 
					+ data.contracts[i].optionDisplayRapidInvoice + '</option>';
      }
      $("#mainform select#contract_id").html(options);
	  predefinePeriod();
	  fillNumber();
	});
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
	  var tip = $('select[name=tip] option:selected').html();
	  var emitter=$("#contract_id option:selected").attr('data-emitter');
	  var recepient=$("input[name=new_abb]").val();
	  if(!recepient){ 
		  recepient = 'XXXX';
	  }else{ 
			if($("input[name=new_abb2]").val()){ 
				recepient += '-'+$("input[name=new_abb2]").val();
			} 
	  } 
	  var maxnum=$("#contract_id option:selected").attr('data-maxnum');
	  $("input[name=nr]").attr('value',emitter+'-'+recepient+'-'+year+'-'+mon+'-'+day+'-INV-'+tip+'-'+period+'-');
	  $("input[name=fakeid]").attr('value',maxnum);
} 
