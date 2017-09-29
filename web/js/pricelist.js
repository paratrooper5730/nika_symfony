if($('#mainform select[name=local_currency]').val() == 2){
    $('#tr_tax_social').addClass('invisible');
}
$('#mainform select[name=local_currency]').bind('change', function(){
        $("#tr_tax_social").toggleClass('invisible');
    });
