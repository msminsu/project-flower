$(document).ready( function() {
		if($( "#datepicker-1" ).length >0){
    $( "#datepicker-1" ).datepicker({
		changeMonth: true,
		changeYear: true,
		showMonthAfterYear: true,
		dateFormat: "yy-mm-dd",
		monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
		onSelect: function(date) {
			var s_date = $("#datepicker-2").val() ;
			var d1 = new Date(date) ;
			var d2 = new Date(s_date) ;
			d1.setHours(0, 0, 0, 0) ;
			d2.setHours(0, 0, 0, 0) ;
			if (d1 > d2) {
				$("#datepicker-2").val(date) ;
			}
		}
	});
}
if($( "#datepicker-2" ).length >0){
	$( "#datepicker-2" ).datepicker({
		changeMonth: true,
		changeYear: true,
		showMonthAfterYear: true,
		dateFormat: "yy-mm-dd",
		monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
		beforeShowDay: function(date) {
			var s_date = $("#datepicker-1").val() ;
			var d1 = new Date(date) ;
			var d2 = new Date(s_date) ;
			d1.setHours(0, 0, 0, 0) ;
			d2.setHours(0, 0, 0, 0) ;
			if (d1 < d2) {
				return [false] ;
			} else {
				return [true] ;
			}
		}
	});
}



	
if($('.btn-open').length > 0 ){
	$('.btn-open').on('click',open_win7);
}

if($('.btn-open13').length > 0 ){
	$('.btn-open13').on('click',open_win13);
}

if($('.btn-open16').length > 0 ){
	$('.btn-open16').on('click',open_win16);
}

if($('.btn-open18').length > 0 ){
	$('.btn-open18').on('click',open_win18);
}

if($('.btn-userinfo').length > 0 ){
	$('.btn-userinfo').on('click',open_userinfo);
}

if($('.btn-srch').length >0 ){
    $('.btn-srch').on('click',function(){
        $('.resultlist').css({'display':'block'})
        // window.resizeTo(750, 550);
	});
}



    function open_win7(){
        window.open('page7.html','popup', 'width=800, height=550, left=0, top=0, toolbar=no, location=no, directories=no, status=no, menubar=no, resizable=no, scrollbars=no, copyhistory=no');
	}
	
	function open_win13(){
        window.open('page13.html','popup', 'width=750, height=530, left=0, top=0, toolbar=no, location=no, directories=no, status=no, menubar=no, resizable=no, scrollbars=no, copyhistory=no');
	}
	
	function open_win16(){
        window.open('page16.html','popup', 'width=750, height=430, left=0, top=0, toolbar=no, location=no, directories=no, status=no, menubar=no, resizable=no, scrollbars=no, copyhistory=no');
	}
	
	function open_win18(){
        window.open('page18.html','popup', 'width=750, height=500, left=0, top=0, toolbar=no, location=no, directories=no, status=no, menubar=no, resizable=no, scrollbars=no, copyhistory=no');
	}
	
	function open_userinfo(){
        window.open('userinfo.html','popup', 'width=555, height=500, left=0, top=0, toolbar=no, location=no, directories=no, status=no, menubar=no, resizable=no, scrollbars=no, copyhistory=no');
	}
	
	$('.btn-close').click(function(){
		window.close();
	});

}); 