$(function(){ 
		$("img.matugalnik").click(function(){ 
			showMailForm(this.id);
		} );
} );
function showMailForm(listId){ 
	//alert(listId);
	$("div#mailform").css('display','block');
	$("div#mailform input#listId").attr('value',listId);
	$("div#mailform input#listName").attr('value',$("tr#tr"+listId+" td.listheader").text());
} 
function sendMail(){
	$("div#mailform").css('display','none');
	// Создать URL для подключения
	var url = "../shout.php?id=" + $('#mailform input#listId').attr('value') +"&msg="+$("#mailform textarea").attr('value')+"&subj="+$("#mailform #subject").attr("value");
	url=url.replace(/\r\n|\r|\n/g,"<br />")
	//alert(url);
	// Открыть соединение с сервером
	myRequest.open("GET", url, true);

	// Установить функцию для сервера, которая выполнится после его ответа
	//myRequest.onreadystatechange = updatePage;

	// Передать запрос
	myRequest.send(null);
}
function closeMailer(){ 
	$("div#mailform").css('display','none');
} 
