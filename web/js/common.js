$(document).ready(function(){ /// align of dialogbox && menu width
	//align element in the middle of the screen
	$.fn.alignCenter = function() {
	 //get  left
	 var Left = Math.max(40, parseInt($(window).width()/2 - $(this).width()/2)) + 'px';
	 //get  top
	 var Top = Math.max(40, parseInt($(window).height()/2 - $(this).height()/2)) + 'px';
	 //return updated element
	 return $(this).css({'left':Left, 'top':Top});
	};

	while($('#mymenu').height() > 60){
        $('#more ul').prepend(
            $("#mymenu li:nth-last-child(2)").detach()
        ).promise().then(function(){
                if($('#more ul li').length  < 1 ){
                    $('#more').remove();
                }
            }
        );
	}
    if($('#more ul li').length  < 1 ){
        $('#more').remove();
    }
    $('#mainheader').css({'margin-top':$('#mainnavbar').height()+10});
    var mw = $('#maindiv').width();
	var ww = $(window).width();
	if(mw>1170){
		if(mw>ww){
			$('#maindiv').css({'margin-left':(1170-ww)/2,'width':mw});
		} else{
			$('#maindiv').css({'margin-left':(1170-mw)/2,'width':mw});
		}
	}
});
//
//
// INCREMENT?DECREMENT BUTTONS
$(function(){
    // This button will increment the value
    $("#form_div, #mainform").on("click",'.qtyplus',function(e){
        // Stop acting like a button
        e.preventDefault();


        // Get the field name
        //fieldName = $(this).attr('field');
        // Get its current value
        var txt=$($(this).next("input[type=text]"));
        var currentVal = parseInt(txt.val());
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment
          txt.val(currentVal + 1);
        } else {
            // Otherwise put a 0 there
            txt.val(0);
        }
    });
    // This button will decrement the value till 0
    $("#form_div, #mainform").on("click",".qtyminus",function(e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        //fieldName = $(this).attr('field');
	   //var ind=$(this).index();
        var txt=$($(this).nextAll("input[type=text]"));
            // Get its current value
        var currentVal = parseInt(txt.val());
        // If it isn't undefined or its greater than 0
        if (!isNaN(currentVal) && currentVal > 0) {
            // Decrement one
            txt.val(currentVal - 1);
        } else {
            // Otherwise put a 0 there
           txt.val(0);
        }
    });
});

