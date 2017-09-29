function handledate(emname) {
	var day, mon, y;
	DaySel = document.getElementById('day'+emname);
	day = DaySel.value;
	monSel = document.getElementById('mon'+emname);
	mon = monSel.value;
	ySel = document.getElementById('y'+emname);
	y = ySel.value;
	mon--;
	var d = new Date(y, mon, '1');
	mon++;
	var d2 = new Date(y, mon, '1');
	//milliseconds per day
	msPerDay = 24 * 60 * 60 * 1000;
	// получить число дней
	daysInMonth = (d2.getTime() - d.getTime()) / msPerDay;
	first_day = d.getDay();
	//alert(first_day);
	DaySel.options.length=0;
	var init = 1;
	var shift = 0;
	if (ySel.options[0].value == 0){
		DaySel.options[0]=new Option("...","0");
		shift = 1;
	}
	for (x=init;x<daysInMonth+init;x++)
	{
		current_day = (first_day+x-init) % 7; // get remainder after division by 7
		if (x<10) opt="0"+x;
		else opt = x; 
		DaySel.options[x-1+shift]=new Option(opt,opt);
		if (current_day > 5 || current_day == 0){
			DaySel.options[x-1+shift].setAttribute("class","bold");
		}
	}
	if (day>x) day='01';
	else DaySel.options.selectedIndex=day-1+shift;
	takedate(emname);

}

function takedate(emname) {
	var day, mon, y;
	DaySel = document.getElementById('day'+emname);
	day = DaySel.value;
	monSel = document.getElementById('mon'+emname);
	mon = monSel.value;
	ySel = document.getElementById('y'+emname);
	y = ySel.value;
	if (day==0 || y==0 || mon==0) { 
		document.getElementById(emname).value='SETTHEVALUETONULL';
        //DaySel.options.selectedIndex=0;
        //monSel.options.selectedIndex=0;
        //ySel.options.selectedIndex=0;
		return;
	} 
	if (mon>9) document.getElementById(emname).value=y+'-'+mon+'-'+day;
	if (mon<10)document.getElementById(emname).value=y+'-0'+mon+'-'+day;
}
function pullForward(id){ 
	$("div.active").removeClass('active');
	$("a.active").removeClass('active');
	$("#tabbody"+id).attr('class','tabbody active');
	$("#tab"+id).attr('class','btn tabcaption active');
} 

