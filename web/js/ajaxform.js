function showForm(id,modelname,viewname,args){
	if (!viewname)viewname='new';
	var rootURL = $("#homelink").attr('href');
	var request=rootURL+modelname+'/'+viewname+'?id='+id
	if($(window).height()<500){ window.location.href=request; }
	request+='&mode=ajaxform';
	if(args) request+='&'+args;
	//alert(request);
	$("#form_div").load(request,function(responseTxt,statusTxt,xhr){
		//alert(responseTxt);
	  }).css('display','block');
	setTimeout(function(){ $("#fog_div").css('z-index','10');  },250);
	setTimeout(function(){ $("#fog_div").css('display','block');  },250);
    /// we update the services without touching the prices /// timeout is needed for all teh values to load
	setTimeout(function(){ updateSers();  },1100);
}
function multiForm(idList,modelname){
	var rootURL = $("#homelink").attr('href');
	var request=rootURL+modelname+'/multiedit?idList='+idList
	if($(window).height()<500){ window.location.href=request; }
	request+='&mode=ajaxform';
	//alert(request);
	$("#form_div").load(request,function(responseTxt,statusTxt,xhr){
		//alert(responseTxt);
	  }).css('display','block');
	setTimeout(function(){ $("#fog_div").css('z-index','10');  },250);
	setTimeout(function(){ $("#fog_div").css('display','block');  },250);
}

function closeform(){
		$("#form_div").css('display','none');
		$("#fog_div").css('z-index','-5');
		$("#fog_div").css('display','none');
}

function sendajax(){
	if (typeof(myCheckForm) === "function") {
		    // safe to use the function
			if (!myCheckForm()){
				alert('check error');
				return;
			}
	}
	$('#mainform').append("<input type=hidden name=mode value=ajaxdata>").ajaxForm(function(responseText) {
        //alert(responseText);
		closeform();
        //alert($("#form_div input[name=id]").attr("value"));
		if($("#form_div input[name=id]").attr("value")=='null' || $("#form_div input[name=id]").attr("value")<1){
            //alert('inserting new record');
			if($("#prototype_id").attr("value")>1){
				$("#tr"+$("#prototype_id").attr("value")).after(responseText);
				if(responseText.indexOf('input type=checkbox')){
					$("#tr"+$("#prototype_id").attr("value")).next().bind( "click", function() {
						checkOne(this);
					});
				}
			}
			else {
				//alert("."+$('input[name=model_to_store]').val()+"_table tbody tr:first-child");
				$("."+$('input[name=model_to_store]').val()+"_table tbody tr:first-child").before(responseText);
				if(responseText.indexOf('input type=checkbox')){
					$( "#maintable tbody tr:first-child" ).bind( "click", function() {
						checkOne(this);
					});
				}
			}
		}
		else {
            // modifiying existing record
            //alert(responseText);
			$("#tr"+$("#form_div input[name=id]").attr("value")).after(responseText).remove();
			$("#tr"+$("#form_div input[name=id]").attr("value")).css("background-color","#cfc"); // Now we are selecting the new, just inserted row
		}
	}).submit();
}


