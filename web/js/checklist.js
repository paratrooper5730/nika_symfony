function checkAll(){
			 $("input.check:not(#checkall)").attr("checked",false);
			 $("input.check").attr("checked",$("#checkall").attr("checked"));
}
function checkAllTop(){
			 $("input.check:not(#checkall_top)").attr("checked",false);
			 $("input.check").attr("checked",$("#checkall_top").attr("checked"));
}
function checkOne(element){
            $("#tablebottom").css('display','none');
			$("#tablebottom div#link").html("");
			$("#id_list").attr("value","");
			$("input.check").each(function(){
				if(this.checked && this.id!="checkall" && this.id!="checkall_top"){
				var trid = this.name.replace(/[^\d.,]+/,'');
				//alert (trid+" checked");
				$("#tablebottom").css('display','block');
				$("#id_list").attr("value",$("#id_list").attr("value")+','+trid);
			 	}
			});
			$("#id_list").attr("value",$("#id_list").attr("value").substring(1));
}
function post_bottom_form(formid){
	$(formid).attr("method","POST");
}

$(function(){
    if($("#maintable").length !== 0){
		$("#checkall_top").click(function(){
			checkAllTop();
			 });
		$("#checkall").click(function(){
			checkAll();
			 });
		$("input:checkbox").click(function(){
			checkOne(this);
		});
		$("#delete_link").click(function(event){
			if (confirm("вы действительно хотите удалить эти записи?")){
				var URL = $("#homelink").attr('href')+'other/delete.php';
				$.get(URL, {id: $("#id_list").attr("value"), modelname:$('#modelname').attr('value')},function(data) {
					//alert(data);
					datarray = data.split(';');
					//alert (datarray[1]);
					$("input.check").each(function(){
						if(this.checked && this.id!="checkall" && this.id!="checkall_top"){
                            this.parentNode.parentNode.remove();
						}
					});
					//location.reload();
				});
			/////alert ('deleting');
			}
		});
        if (typeof multiForm === "function"){
            $("#multiedit").click(function(event){
                multiForm($("#id_list").attr("value"),$('#modelname').attr('value'));
            });
        }else{
            $("#multiedit").addClass('invisible');
        }

    }
});
