$(function(){ 
	$("td a.btn").click(function(){ 
		//alert('clicked!'+this.id);
		//callServer(this.id);
		var rootURL = $("#homelink").attr('href');
		var url = rootURL + "papermail/report?id=" + escape(this.id);
		var objectId = this.id
		//$("#tr"+this.id).load(url,function(responseTxt,statusTxt,xhr){
			//alert("report written");
		//});
		$.get(url,function(data){ 
			//alert("#tr"+objectId);
			$("#tr"+objectId).after(data).remove();
		}); 
	});
});


