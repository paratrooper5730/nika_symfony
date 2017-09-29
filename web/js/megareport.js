$(function(){
    // This button will increment the value
    $("#maindiv").on("change",'select',function(e){
	var rootURL = $("#homelink").attr('href');
	var modelname = $(this).val();
	//alert(modelname);
	var request=rootURL+'megareport/fieldlist?model='+modelname;
	request+='&mode=ajaxform';
        // Get its current value
        var div=$(this).parent().parent().parent().parent().next("div"); /// long way to get out of the table
		//alert(request);
		div.load(request,function(responseTxt,statusTxt,xhr){
			//alert(responseTxt);
		  }).css('display','block'); 
        });
    });
