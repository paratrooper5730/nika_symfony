$(document).ready(function() {
	$('#multiedit').click(function() {
        //alert('multiedit called');
        multiForm($('#id_list').val(),'contact');
    });
	$('#add_to_list').click(function() {
        var URL = $("#homelink").attr('href')+'mail_list/additems?id='+$("select[name=mail_list_id]").val();
        //alert(URL);
        $.post(URL, {contact_list: $("#id_list").attr("value"), modelname:$('#modelname').attr('value')},function(data) {
            datarray = data.split('!');
            if(datarray[0]=="ERROR"){
                //alert(data);
            }else{
                $("input.check").attr("checked",false);
                if(confirm("Адресаты добавлены. Перейти к списку? Recepients added. Go to mail list?")){
                    window.location = $("#homelink").attr('href')+'mail_list/detail?id='+$("select[name=mail_list_id]").val();
                }
            }
        });
    });
});
