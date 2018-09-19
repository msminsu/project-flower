$(document).ready( function() {
    $( "#datepicker1" ).datepicker({
		changeMonth: true,
		changeYear: true,
		showMonthAfterYear: true,
		dateFormat: "yy-mm-dd",
		monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
		
    });

    $('.btn1').on('click',open_win);

    $('.btn2').on('click',function(){
        
        window.resizeTo(400, 600);
            
        
    });



    function open_win(){
        window.open('popup1.html','popup', 'width=300, height=auto, left=0, top=0, toolbar=no, location=no, directories=no, status=no, menubar=no, resizable=no, scrollbars=no, copyhistory=no');
    }

}); 