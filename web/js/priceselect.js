
function service(id,dn,ord,so,pri,unn,allow,local_currency){ 
	var o = new Object();
	o.id=id;
	o.depnum=dn;
	o.ordnung=ord;
	o.sokr=so;
	o.price=pri;
	o.per_unit=unn;
	o.allow_input=allow;
	o.local_currency=local_currency;
	return o;
} 
// array sers with service objects as elements will be created when data::writeprice() is called

function updateSers(selector){ 
	if(!($("div.submitblock").length) && !($("form.vyb[action='"+$("#homelink").attr('href')+"data/']").length)){ /// if the form has not loaded yet, and we are not on journal page
		setTimeout(function(){ updateSers(selector);  },100);  /// timeout is needed for all teh values to load
		return 0;
	} 
	if(!selector){ 
		var dep = $('select#depnum').val();
		if(!dep){ 
			var dep = $('select[name=depnum]').val();
		} 
	} else{
		var dep = selector.value;
	}
	//alert('depnum = '+dep);
	var supsel = document.getElementById('supnum');
	var subsel = document.getElementById('subnum');
	subsel.options.length=0;
	supsel.options.length=0;
	subsel.options[0]=new Option('...','');
	supsel.options[0]=new Option('...','');
	var supcount=0;
	var subcount=0;
	for(i=0;i<sers.length;i++){ 
		if (sers[i].depnum!=dep) continue;
		//alert(sers[i]);
		if (sers[i].ordnung==1) {
			subcount++;
			subsel.options[subcount]=new Option(sers[i].sokr,sers[i].id);
		}
		else { 
			supcount++;
			supsel.options[supcount]=new Option(sers[i].sokr,sers[i].id);
            supsel.options[supcount].setAttribute( "class", "allow_"+sers[i].allow_input  );
		} 
	} 
	$("#supnum [value='"+$("#supnum_to_copy_id").val()+"']").attr("selected", "selected");
	$("#subnum [value='"+$("#subnum_to_copy_id").val()+"']").attr("selected", "selected");
	Fill();
} 


function Fill(){
	$("#supnum option:first-child").attr('value',0);
    $("#subnum option:first-child").attr('value',0);
    var num = $("#subnum option:selected").attr('value');
	if (num<1) { 
		num = $("#supnum option:selected").attr('value');
	    if (num<1){ 
			$("#supnum option:selected").attr('value','');
			$("#subnum option:selected").attr('value','');
			//alert('no number');
			$("#price").attr('value','0,0');
			$("#per_unit_selector [value='0']").attr("selected", "selected");
			return;
			}
	}
	//alert(num);
	var inum;
	for(i=0;i<sers.length;i++){ 
		if (sers[i].id==num) inum=i;
    }
    //alert(sers[inum].local_currency);
    if(sers[inum].local_currency != 1){
        $("input[name=price_local]").attr('name','price'); /// fucken rename it
        $("#label_price span").remove();
        $("#label_price").append(" <span>EUR</span>");
        if($("#price_to_copy").attr('value')){ 
            $("input[name=price]").attr('value',$("#price_to_copy").attr('value')); 
        }else{ 
            $("input[name=price]").attr('value',sers[inum].price); 
        } 
    }else{
        $("input[name=price]").attr('name','price_local'); // fucken rename it back
        $("input[name=price_local]").attr('value',sers[inum].price);  /// no copying of price here (not yet at least)
        $("#label_price span").remove();
        $("#label_price").append(" <span style='color:red;'>LOCAL</span>");
    }
	if($("#amount_to_copy").attr('value')){ 
		$("input[name=amount]").attr('value',$("#amount_to_copy").attr('value')); 
	}else{ 
		$("input[name=amount]").attr('value',1); 
	} 
	
	//alert(sers[inum].per_unit);
	//alert("SETTING UNIT");
	if($("#unit_to_copy").attr('value')){ 
		//alert($("#unit_to_copy").attr('value'));
		$("#per_unit_selector").val($("#unit_to_copy").attr('value'));
	}else{
		$("#per_unit_selector").val(sers[inum].per_unit);
	}
	if (sers[inum].per_unit=='2') {
		$('#minutes').css({'display':'block'});
	}else{ 
		$('#minutes').css({'display':'none'});
		$('#minutes select').prop('selectedIndex','0');
	} 
}
function copyComment(){ 
	$('textarea[name=visible_comment]').val($('textarea[name=comment]').attr("value"));
} 
