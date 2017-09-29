$(function(){ 
		$("input:checkbox").click(function(){
				$("#delete_link").css('display','none');
				$("#multiple_edit_list").attr("value","");
				$("input.check").each(function(){ 
					if(this.checked && this.id!="checkall" && this.id!="checkall_top"){ 
					var trid = this.name.replace(/\D/g,''); /// stripping non-numeric part off the input name
					$("#multiple_edit_list").attr("value",$("#multiple_edit_list").attr("value")+','+trid);
					}
				});
				if ($("#multiple_edit_list").attr("value")) {
					$("#delete_link").css('display','inline');
				} 
		});

		$("#delete_link").click(function(event){ 
			$("#delete_input").attr("value","delete");
			if (confirm("вы действительно хотите удалить эти записи?")){
			$.get($('#index_link').attr('href')+'/delete_paragraphs', {line_list: $("#multiple_edit_list").attr("value")},function(data) { 
				//alert(data); 
				location.reload();  
				});
			}
		}); 
}); 
