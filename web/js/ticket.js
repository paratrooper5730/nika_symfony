$(function(){ 
	$("td img.workbutton").click(function(){ 
		//alert('clicked!'+this.id);
		begin_work(this.id);
	} );
	$("select[name=client_id]").change(function(){ 
		//alert('now we will load contacts for '+$("select[name=client_id]").val());
        var rootURL = $("#homelink").attr('href');
        var url = rootURL+"ticket/getpeople?id="+$("select[name=client_id]").val();
        $.post(url, function( data ) { 
            alert(data);
        });

	} );
}
);
function begin_work(id){ 
	var rootURL = $("#homelink").attr('href');
	var url = rootURL+"ticket/begin_work?id="+id;
	$.post(url, function( data ) { 
		  $("#tr"+id).after(data).remove();
	});
} 
