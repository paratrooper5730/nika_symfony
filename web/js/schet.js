function mailtolink(id){
	var rootURL = $("#homelink").attr('href');
	var url = rootURL + "schet/mailtolink";
	url=(url+'?mode=ajaxform&id='+id);
	  //alert (url);
    $.ajax(url).done( function(data){
	  //alert (data);
	  window.location.href=data;
	});
}
var currentTr;
$(document).ready(function() {
	 $('.plusbutton').click(function() {
			$(this).next().click();
			// always return false to prevent standard browser submit and page navigation
			return false;
		});
	 $('.addfiles').change(function() {
		 	//alert($(this).val());
		 	//alert($(this).parent().attr('action'));
			$(this).parent().ajaxSubmit({
					beforeSubmit:  beforeSubmit($(this)),  // pre-submit callback
					success:       function(data){
										//alert(currentT1q	sa3e /// Vej
										//alert('doingstuff');
										$('#'+currentTr).after(data).remove();
					}
			});
			// always return false to prevent standard browser submit and page navigation
			return false;
		});
     $('.schet_detail_table').DataTable({
         "paging":false
     });

});

//function to check file size before uploading.
function beforeSubmit(ffield){
    //check whether browser fully supports all File API
	//alert('callled beforeSubmit function');
   if (window.File && window.FileReader && window.FileList && window.Blob)
	{

		if( !ffield.val()) //check empty input filed
		{
			alert("Are you kidding me?");
			return false
		}

		var fsize = ffield[0].files[0].size; //get file size
		var ftype = ffield[0].files[0].type; // get file type


		//Allowed file size is less than 1 MB (1048576)
		if(fsize>4194304)
		{
			alert("Too big file!");
			return false
		}

		ffield.next('.loading').show();
		//alert('TR: '+ffield.parent().parent().parent().attr('id'));
		currentTr = ffield.parent().parent().parent().attr('id');
	}
	else
	{
		//Output error to older unsupported browsers that doesn't support HTML5 File API
		alert("Please upgrade your browser, because your current browser lacks some new features we need!");
		return false;
	}
}
