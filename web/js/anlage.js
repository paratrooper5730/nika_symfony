$(document).ready(function() {
	$('#mainform select[name=client_id]').change(function() {
		 	fillContracts(this.val());
		});
	$('#mainform select[name=contract_id]').change(function() {
		 	fillNumber();
		});
});

function fillContracts(client_id){
	//alert('called with arg '+client_id )
	$("#mainform select[name=contract_id]").empty();
	// Создать URL для подключения
	var rootURL = $("#homelink").attr('href');
	var url = rootURL + "other/select_contracts.php";
	url=(url+'?id='+client_id);
	//alert(url);
    $.getJSON( url, {}, function(data){
	  //alert ("populating options");
      var options = '';
      for (var i = 0; i < data.contracts.length; i++) {
        options += '<option data-periodity="'+data.contracts[i].optionPeriodity+'" data-maxnum="'+data.contracts[i].optionMaxnum+'" value="' + data.contracts[i].optionValue + '">' + data.contracts[i].optionDisplay + '</option>';
      }
      var pril_options = '';
      for (var i = 0; i < data.prils.length; i++) {
        pril_options += '<div ><input type=checkbox name=obraz'+data.prils[i].optionValue+'>' + data.prils[i].optionDisplay + '</div>';
      }
      $("#mainform select[name=contract_id]").html(options);
      //$("div#client_comment").html(data.comment);
	  fillNumber();
	})
}
function fillNumber(){
	var cname=$("select[name=contract_id] option:selected").text().split("(");
	$("input[name=nr]").attr('value',cname.shift());
}
