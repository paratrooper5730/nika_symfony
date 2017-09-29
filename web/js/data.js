$(document).ready(function() {
    updateSers($('select [name=depnum]')[0]);
});
function mailtolink(id){
	var rootURL = $("#homelink").attr('href');
	var url = rootURL + "data/mailtolink";
	url=(url+'?mode=ajaxform&id='+id);
	  //alert (url);
    $.ajax(url).done( function(data){
	  //alert (data);
	  window.location.href=data;
	});
}
