$(function(){ 
	$("td img.validbutton").click(function(){ 
		//alert('clicked!'+this.id);
		callServer(this.id);
	} );
}
);


function createRequest(){
	var xmlHttp = false;

	if (!xmlHttp && typeof XMLHttpRequest != 'undefined') { 
		  xmlHttp = new XMLHttpRequest();
	}
	return xmlHttp;
}

var imgID;
function callServer(theId) { 
	// Создать URL для подключения
	var rootURL = $("#homelink").attr('href');
	var url = rootURL + "data/toggle_status?id=" + escape(theId);
	imgID = theId;
	
	//alert(url);
	// Открыть соединение с сервером
	myRequest.open("GET", url, true);

	// Установить функцию для сервера, которая выполнится после его ответа
	myRequest.onreadystatechange = updatePage;

	// Передать запрос
	myRequest.send(null);
}

function updatePage() { 
		if (myRequest.readyState == 4) { 
			var response = myRequest.responseText;
			//if(!response)return 0;
			//alert(response);
			//alert($("td.validbutton img#"+response).attr('src'));
			$("td img#"+imgID).attr('src',response);
		}
}

var myRequest=createRequest();
