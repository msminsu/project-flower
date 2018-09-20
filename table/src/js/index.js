$(document).ready( function() {
    console.log(10)
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
    
    $('.btn-open').on('click',open_win);

    $('.btn-srch').on('click',function(){
        $('.listbox').css({'display':'block'})
        window.resizeTo(600, 475);
            
        
    });



    function open_win(){
        window.open('page7.html','popup', 'width=600, height=90, left=0, top=0, toolbar=no, location=no, directories=no, status=no, menubar=no, resizable=no, scrollbars=no, copyhistory=no');
    }

}); 