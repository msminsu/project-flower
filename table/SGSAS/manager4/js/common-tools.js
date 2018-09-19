$(document).ready( function() {
	$( "#datepicker1" ).datepicker({
		changeMonth: true,
		changeYear: true,
		showMonthAfterYear: true,
		dateFormat: "yy-mm-dd",
		monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
		onSelect: function(date) {
			var s_date = $("#datepicker2").val() ;
			var d1 = new Date(date) ;
			var d2 = new Date(s_date) ;
			d1.setHours(0, 0, 0, 0) ;
			d2.setHours(0, 0, 0, 0) ;
			if (d1 > d2) {
				$("#datepicker2").val(date) ;
			}
		}
	});
	$( "#datepicker2" ).datepicker({
		changeMonth: true,
		changeYear: true,
		showMonthAfterYear: true,
		dateFormat: "yy-mm-dd",
		monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
		beforeShowDay: function(date) {
			var s_date = $("#datepicker1").val() ;
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
});

function checkStringFormat(string) { 
	var stringRegx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,50}$/; 
	var isValid = false; 
	if(stringRegx.test(string)) { 
		isValid = true; 
	} 
	return isValid; 
}
function checkSpecialCharacter(string) {
	var spchar = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
	var isValid = false; 
	if (spchar.test(string)) {
		isValid = true; 
	}
	return isValid; 
}
function checkEmailFormat(string) {
	// 정규식 - 이메일 유효성 검사
	var regEmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	var isValid = false;
	if (regEmail.test(string)) {
		isValid = true;
	}
	return isValid;
}
function checkPhoneFormat(string) {
	// 정규식 -전화번호 유효성 검사
	var regPhone = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;
	var isValid = false;
	if (regPhone.test(string)) {
		isValid = true;
	}
	return isValid;
}
function fnCheckCompPass() {
	if ($("#upassword").val() != $("#upassword2").val()) {
		alert("패스워드와 패스워드 확인 정보가 다릅니다.\n확인 후, 다시 시도해 주세요.");
		return false;
	}
	var uid = $("#uid").val();
	var upass = $("#upassword").val();
	// check length
	if (upass.length < 8) {
		alert("패스워드 복잡성 정책으로 인해 패스워드는 반드시 영문+숫자+특수문자 조합으로 8자이상을 입력하셔야 합니다.-0xA001");
		return false;
	}
	// check alpabet/number/sc
	var v_alp = checkStringFormat(upass);
	if (v_alp == false) {
		alert("패스워드 복잡성 정책으로 인해 패스워드는 반드시 영문+숫자+특수문자 조합으로 8자이상을 입력하셔야 합니다.-0xAER2");
		return false;
	}

	var b_dup = false;
	for (var i=0 ; i<(uid.length-2) ; i++) {
		var v_uid = uid.substring( i, (i+3) );
		var n_idx = upass.indexOf(v_uid.toString());
		if (n_idx != undefined) {
			if (n_idx >= 0)
				b_dup = true;
		}
	}
	if (b_dup == true) { 
		alert("사용자 아이디와 중복된 정보를 패스워드에 입력할 수 없습니다.-0xADP3");
		return false;
	}
	
	return true;
}

//____________________________________________________________________________________________________
//
var root = {
	menu:	 function() { return $('#n_menu').val() ; },
	submenu: function() { return $('#n_submenu').val() ; },
	set: function(p_key, p_val) { $(p_key).val(p_val) ; },
	get: function(p_key) { return $(p_key).val() ; },
	isDebugMode: false,
	debug: function(s_msg) { if(this.isDebugMode == true) { alert(s_msg) } ; }
}
function fnGetToday() {
	var date = new Date() ;
	var s_yyyy = date.getFullYear().toString() ;
	var s_MM = (date.getMonth() + 1).toString() ;
	var s_dd = date.getDate().toString() ;
	var s_yyyyMMdd = s_yyyy + '-' + (s_MM.length==1?"0"+s_MM:s_MM) + '-' + (s_dd.length==1?"0"+s_dd:s_dd) ;
	return s_yyyyMMdd ;
}
function dateAt(n_diff) {
	var a_day = (1000*60*60*24) ;
	var today = new Date() ;
	var date = new Date((today.getTime() + (a_day * n_diff))) ;
	var s_yyyy = date.getFullYear().toString() ;
	var s_MM = (date.getMonth() + 1).toString() ;
	var s_dd = (date.getDate()).toString() ;
	var s_yyyyMMdd = s_yyyy + '-' + (s_MM.length==1?"0"+s_MM:s_MM) + '-' + (s_dd.length==1?"0"+s_dd:s_dd) ;
	return s_yyyyMMdd ;
}
function fnCompareDate(date1, date2) {
	var yyyy1 = date1.substring(0, 4) ; // for IE8
	var mm1 = date1.substring(5, 7) ;
	var dd1 = date1.substring(8, 10) ;
	var d1 = new Date(yyyy1, mm1, dd1) ;
	var yyyy2 = date2.substring(0, 4) ; // for IE8
	var mm2 = date2.substring(5, 7) ;
	var dd2 = date2.substring(8, 10) ;
	var d2 = new Date(yyyy2, mm2, dd2) ;
	d1.setHours(0, 0, 0, 0) ;
	d2.setHours(0, 0, 0, 0) ;
	if (d1 < d2) {
		return -1 ;
	} else if (d1 > d2) {
		return 1 ;
	} else {
		return 0 ;
	}
}

//____________________________________________________________________________________________________
//	key(id, name) value 쌍을 input element 에 담는다

function fnMakeInput(name, value) {
	root.debug("fnMakeInput : "+ name +" / "+ value) ;
	var _input = document.createElement("input") ;
	_input.setAttribute("type", "hidden") ;
	_input.setAttribute("id", name) ;
	_input.setAttribute("name", name) ;
	_input.setAttribute("value", value) ;
	return _input ;
}
//____________________________________________________________________________________________________
// 
function fnRegInput(key, value) {
	var _input = fnMakeInput(key, value) ;
	document.body.appendChild(_input) ;
}
//____________________________________________________________________________________________________
//	form element 를 작성하여 target window 로 전송(submit)한다
//	*	target	{ default:_self }
//	*	flag	{ default:POST }
function fnMakeForm(ActionURL, obj, target, flag) {
	root.debug("fnMakeForm : " + ActionURL) ;
	var _form = document.createElement("form") ;
	_form.setAttribute("action", ActionURL) ;
	if (target) {
		_form.setAttribute("target", target) ;
	} else {
		_form.setAttribute("target", "_self") ;
	}
	if (flag) {
		_form.setAttribute("method", flag) ;
	} else {
		_form.setAttribute("method", "POST") ;
	}
	if (obj) {
		for ( var obj_element in obj) {
			var obj_value = obj[obj_element] ;
			if (obj_value) { _form.appendChild(fnMakeInput(obj_element, obj_value)) ; }
		}
	}
	document.body.appendChild(_form) ;
	_form.submit() ;
}

function fnMoveSubTab(n_subtab) {
	root.debug("fnMoveSubtab : "+ n_subtab) ;
	$("#viewLoading").show() ;
	var n_menu = $("#n_menu").val() ;
	var n_submenu = $("#n_submenu").val();
	var obj = {
			"n_menu": n_menu,
			"n_subtab": n_subtab,
			"n_submenu": n_submenu
	} ;
	var action = contextPath +"/menu"+ n_menu +"/cont.do" ;
	fnMakeForm(action, obj) ;
}

//____________________________________________________________________________________________________
//	Call Menu & Sub-Menu & Pop-Up Window
function fnMoveSubMenu(n_submenu) {
	root.debug("fnMoveSubMenu : "+ n_submenu) ;
	$("#viewLoading").show() ;
	var n_menu = $("#n_menu").val() ;
	if (n_menu == 11) {	// 실시간 현황
		var s_startdate = $("#datepicker1").val() ;
		var obj = {
				"n_menu": n_menu,
				"n_submenu": n_submenu, 
				"s_startdate" : s_startdate
		} ;
		var action = contextPath +"/menu"+ n_menu +"/cont.do" ;
		fnMakeForm(action, obj) ;
	} else if (n_menu == 12) {	// 콜리스트
		var s_startdate = $("#datepicker1").val() ;
		var s_enddate = $("#datepicker2").val() ;
		var n_search_type = $("#n_search_type").val() ;
		var n_service_domain = $("#n_service_domain").val() ;
		var s_search_text = $("#s_search_text").val() ;
		var obj = {
				"n_menu": n_menu,
				"n_submenu": n_submenu, 
				"s_startdate" : s_startdate, 
				"s_enddate" : s_enddate,
				"n_search_type" : n_search_type,
				"n_service_domain" : n_service_domain,
				"s_search_text" : s_search_text
		} ;
		var action = contextPath +"/menu"+ n_menu +"/cont.do" ;
		fnMakeForm(action, obj) ;
	} else if (n_menu == 13) {	// 학습자료
		var s_startdate = $("#datepicker1").val() ;
		var s_enddate = $("#datepicker2").val() ;
		var n_search_type = $("#n_search_type").val() ;
		var n_service_domain = $("#n_service_domain").val() ;
		var s_search_text = $("#s_search_text").val() ;
		var obj = {
				"n_menu": n_menu,
				"n_submenu": n_submenu, 
				"s_startdate" : s_startdate, 
				"s_enddate" : s_enddate,
				"n_search_type" : n_search_type,
				"n_service_domain" : n_service_domain,
				"s_search_text" : s_search_text
		} ;
		var action = contextPath +"/menu"+ n_menu +"/cont.do" ;
		fnMakeForm(action, obj) ;
	} else if (n_menu == 14) {	// 학습스케줄
		var s_startdate = $("#datepicker1").val() ;
		var s_enddate = $("#datepicker2").val() ;
		var n_search_type = $("#n_search_type").val() ;
		var n_service_domain = $("#n_service_domain").val() ;
		var s_search_text = $("#s_search_text").val() ;
		var obj = {
				"n_menu": n_menu,
				"n_submenu": n_submenu, 
				"s_startdate" : s_startdate, 
				"s_enddate" : s_enddate
		} ;
		var action = contextPath +"/menu"+ n_menu +"/cont.do" ;
		fnMakeForm(action, obj) ;
	} else if (n_menu == 15) {	// 통계
		var s_startdate = $("#datepicker1").val() ;
		var s_enddate = $("#datepicker2").val() ;
		var n_search_type = $("#n_search_type").val() ;
		var search_year = $("#search_year").val() ;
		var search_month = $("#search_month").val() ;
		var n_service_domain = $("#n_service_domain").val() ;
		var obj = {
				"n_menu": n_menu,
				"n_submenu": n_submenu, 
				"s_startdate" : s_startdate, 
				"s_enddate" : s_enddate, 
				"n_search_type" : n_search_type,
				"search_year" : search_year,
				"search_month" : search_month,
				"n_service_domain" : n_service_domain
		} ;
		var action = contextPath +"/menu"+ n_menu +"/cont.do" ;
		fnMakeForm(action, obj) ;
	} else if (n_menu == 16) {	// 리포트
		var s_startdate = $("#datepicker1").val() ;
		var s_enddate = $("#datepicker2").val() ;
		var n_search_type = $("#n_search_type").val() ;
		var search_year = $("#search_year").val() ;
		var search_month = $("#search_month").val() ;
		var n_service_domain = $("#n_service_domain").val() ;
		var obj = {
				"n_menu": n_menu,
				"n_submenu": n_submenu, 
				"s_startdate" : s_startdate, 
				"s_enddate" : s_enddate, 
				"n_search_type" : n_search_type,
				"search_year" : search_year,
				"search_month" : search_month,
				"n_service_domain" : n_service_domain
		} ;
		var action = contextPath +"/menu"+ n_menu +"/cont.do" ;
		fnMakeForm(action, obj) ;
	} else if (n_menu == 17) {	// 관리설정
		if (n_submenu == 171) {
		} else if (n_submenu == 172) {
		} else if (n_submenu == 173) {
		} else if (n_submenu == 174) {
		}
		var obj = {
				"n_menu": n_menu,
				"n_submenu": n_submenu
				} ;
		var action = contextPath +"/menu"+ n_menu +"/cont.do" ;
		fnMakeForm(action, obj) ;
	} else if (n_menu == 18) {	// 파일리스트
		var s_startdate = $("#datepicker1").val() ;
		var s_enddate = $("#datepicker2").val() ;
		var n_search_type = $("#n_search_type").val() ;
		var n_service_domain = $("#n_service_domain").val() ;
		var s_search_text = $("#s_search_text").val() ;
		var obj = {
				"n_menu": n_menu,
				"n_submenu": n_submenu, 
				"s_startdate" : s_startdate, 
				"s_enddate" : s_enddate,
				"n_search_type" : n_search_type,
				"n_service_domain" : n_service_domain,
				"s_search_text" : s_search_text
		} ;
		var action = contextPath +"/menu"+ n_menu +"/cont.do" ;
		fnMakeForm(action, obj) ;
	} else {
		var obj = {
				"n_menu": n_menu,
				"n_submenu": n_submenu
		} ;
		var action = contextPath +"/menu"+ n_menu +"/cont.do" ;
		fnMakeForm(action, obj) ;
	}
}
function fnMovePage(vPage) {
	root.debug("fnMovePage : " + vPage) ;
	var n_menu = $("#n_menu").val() ;
	var n_submenu = $("#n_submenu").val() ;
	var s_today = $("#datepicker1").val() ;
	var obj = {
			"n_menu" : n_menu,
			"n_submenu" : n_submenu,
			"s_today" : s_today,
			"n_page" : vPage
	};
	var action = contextPath + "/menu" + n_menu + "/cont.do" ;
	makeForm(action, obj);
}
function fnReloadPage(p_seq) {
	root.debug("fnReloadPage : "+ n_seq) ;
	var n_menu = $("#n_menu").val() ;
	var n_submenu = $("#n_submenu").val() ;
	var n_seq = $("#n_seq").val() ;
	if(p_seq) {
		n_seq = p_seq ;
	}
	
	if (n_menu > 10) {
		fnSearchThis();
		return;
	}
	
	var obj = {
			"n_menu" : n_menu,
			"n_submenu" : n_submenu,
			"n_seq" : n_seq
	} ;
	if (n_menu == 4 || n_menu == 5) { // 카테고리 관리 : subtab 추가
		obj.n_subtab = $("#n_subtab").val() ;
	} 
	else if (n_menu == 11 || n_menu == 17) { // 조회조건 날짜
		obj.s_startdate = $("#datepicker1").val();
		obj.s_enddate = $("#datepicker2").val();
	}
	var action = contextPath + "/menu"+ n_menu +"/cont.do" ;
	fnMakeForm(action, obj) ;
}
function fnReloadPopupPage(param) {
	root.debug("fnReloadPopupPage()")
	var p_url = contextPath +"/menu"+ $("#n_menu").val() +"/cont_popup.do" ;
	fnMakeForm(p_url, param) ;
}
function fnParentReload() {
	root.debug("fnParentReload()")
	window.opener.fnReloadPage() ;
	window.close() ;
}
function fnMakeRect(width, height) {
	root.debug("fnMakeRect : "+ width +" / "+ height) ;
	var xOffset = window.screenLeft + (window.outerWidth - width)/2 ;
	var yOffset = window.screenTop + (window.outerHeight - height)/2 - Math.abs(window.screenTop)*2 ;
	var left = (((xOffset + width) < (window.screenLeft + window.outerWidth))? xOffset : window.screenLeft) ;
	var top = (((yOffset + height) < (window.screenTop + window.outerHeight))? yOffset : window.screenTop) ;
	var rect = "left="+ ((left > 0)? left : 0) +", top="+ ((top > 0)? top : 0) +", height="+ height +", width="+ width ;	
	return rect ;
}
function fnPopupAction(width, height, param, name) {
	root.debug("fnPopupAction : " + name) ;
	var option = ", fullscreen=no, location=no, menubar=no, resizable=yes, scrollbars=no, titlebar=yes, toolbar=no" ;
	var specs = fnMakeRect(width, height) + option ;
	var p_url = contextPath +"/menu"+ $("#n_menu").val() +"/cont_popup.do" ;
	if (name == "POPUP121" || name == "POPUP122" || name == "POPUP123") { p_url = contextPath +"/popup/cont_popup.do"; }
	if (name == "POPUP131" || name == "POPUP132" || name == "POPUP133") { p_url = contextPath +"/popup/cont_popup.do"; }
	if (name == "POPUP141" || name == "POPUP142") { p_url = contextPath +"/popup/cont_popup.do"; }
	if (name == "POPUP171" || name == "POPUP172" || name == "POPUP173" || name == "POPUP174") { p_url = contextPath +"/popup/cont_popup.do"; }
	if (name == "POPUP181" || name == "POPUP182" || name == "POPUP183" || name == "POPUP184") { p_url = contextPath +"/popup/cont_popup.do"; }
	var NWin = window.open(p_url, name, specs) ;
	fnMakeForm(p_url, param, name) ;
	if (window.focus) { NWin.focus() ; }
}
//____________________________________________________________________________________________________
//
function fnSearchThis() {
	root.debug("fnSerchThis()")
	var n_menu = $("#n_menu").val() ;
	var n_submenu = $("#n_submenu").val();
	if (n_menu == 11) {	// 실시간 현황
		var s_startdate = $("#datepicker1").val();
		var obj = {
				"n_menu" : n_menu,
				"n_submenu" : n_submenu,
				"s_startdate" : s_startdate
		};
		var action = contextPath + "/menu" + n_menu + "/cont.do" ; 
		makeForm(action, obj);
	} else if (n_menu == 12) {	// 콜리스트
		var s_startdate = $("#datepicker1").val() ;
		var s_enddate = $("#datepicker2").val() ;
		var n_search_type = $("#n_search_type").val() ;
		var n_service_domain = $("#n_service_domain").val() ;
		var s_search_text = $("#s_search_text").val() ;
		var obj = {
				"n_menu": n_menu,
				"n_submenu": n_submenu, 
				"s_startdate" : s_startdate, 
				"s_enddate" : s_enddate, 
				"n_search_type" : n_search_type,
				"n_service_domain" : n_service_domain,
				"s_search_text" : s_search_text
		} ;
		var action = contextPath +"/menu"+ n_menu +"/cont.do" ;
		fnMakeForm(action, obj) ;
	} else if (n_menu == 13) {	// 학습자료
		var s_startdate = $("#datepicker1").val() ;
		var s_enddate = $("#datepicker2").val() ;
		var n_search_type = $("#n_search_type").val() ;
		var n_service_domain = $("#n_service_domain").val() ;
		var s_search_text = $("#s_search_text").val() ;
		var obj = {
				"n_menu": n_menu,
				"n_submenu": n_submenu, 
				"s_startdate" : s_startdate, 
				"s_enddate" : s_enddate, 
				"n_search_type" : n_search_type,
				"n_service_domain" : n_service_domain,
				"s_search_text" : s_search_text
		} ;
		var action = contextPath +"/menu"+ n_menu +"/cont.do" ;
		fnMakeForm(action, obj) ;
	} else if (n_menu == 14) {	// 학습스케줄
		var s_startdate = $("#datepicker1").val() ;
		var s_enddate = $("#datepicker2").val() ;
		var n_search_type = $("#n_search_type").val() ;
		var n_service_domain = $("#n_service_domain").val() ;
		var s_search_text = $("#s_search_text").val() ;
		var obj = {
				"n_menu": n_menu,
				"n_submenu": n_submenu, 
				"s_startdate" : s_startdate, 
				"s_enddate" : s_enddate, 
				"n_search_type" : n_search_type,
				"n_service_domain" : n_service_domain,
				"s_search_text" : s_search_text
		} ;
		var action = contextPath +"/menu"+ n_menu +"/cont.do" ;
		fnMakeForm(action, obj) ;
	} else if (n_menu == 15) {	// 통계
		var s_startdate = $("#datepicker1").val() ;
		var s_enddate = $("#datepicker2").val() ;
		var n_search_type = $("#n_search_type").val() ;
		var search_year = $("#search_year").val() ;
		var search_month = $("#search_month").val() ;
		var n_service_domain = $("#n_service_domain").val();
		var obj = {
				"n_menu": n_menu,
				"n_submenu": n_submenu, 
				"s_startdate" : s_startdate, 
				"s_enddate" : s_enddate, 
				"n_search_type" : n_search_type,
				"search_year" : search_year,
				"search_month" : search_month,
				"n_service_domain" : n_service_domain
		} ;
		var action = contextPath +"/menu"+ n_menu +"/cont.do" ;
		fnMakeForm(action, obj) ;
	} else if (n_menu == 16) {	// 리포트
		var s_startdate = $("#datepicker1").val() ;
		var s_enddate = $("#datepicker2").val() ;
		var n_search_type = $("#n_search_type").val() ;
		var search_year = $("#search_year").val() ;
		var search_month = $("#search_month").val() ;
		var n_service_domain = $("#n_service_domain").val();
		var obj = {
				"n_menu": n_menu,
				"n_submenu": n_submenu, 
				"s_startdate" : s_startdate, 
				"s_enddate" : s_enddate, 
				"n_search_type" : n_search_type,
				"search_year" : search_year,
				"search_month" : search_month,
				"n_service_domain" : n_service_domain
		} ;
		var action = contextPath +"/menu"+ n_menu +"/cont.do" ;
		fnMakeForm(action, obj) ;
	} else if (n_menu == 17) {	// 관리설정
		if (n_submenu == 171 || n_submenu == 174) {
			var n_search_type = $("#n_search_type").val() ;
			var s_search_text = $("#s_search_text").val() ;
			var s_search_date = $("#datepicker1").val() ;
			var obj = {
					"n_menu": n_menu,
					"n_submenu": n_submenu, 
					"n_search_type": n_search_type,
					"s_search_text": s_search_text,
					"s_search_date": s_search_date 
			} ;
			var action = contextPath +"/menu"+ n_menu +"/cont.do" ;
			fnMakeForm(action, obj) ;
		} else if (n_submenu == 172) {
		} else if (n_submenu == 173) {
			var n_search_type = $("#n_search_type").val() ;
			var n_service_domain = $("#n_service_domain").val();
			var s_search_text = $("#s_search_text").val() ;
			var s_search_date = $("#datepicker1").val() ;
			var obj = {
					"n_menu": n_menu,
					"n_submenu": n_submenu, 
					"n_search_type": n_search_type,
					"n_service_domain": n_service_domain,
					"s_search_text": s_search_text,
					"s_search_date": s_search_date 
			} ;
			var action = contextPath +"/menu"+ n_menu +"/cont.do" ;
			fnMakeForm(action, obj) ;
		}
	} else if (n_menu == 18) {	// 파일리스트
		var s_startdate = $("#datepicker1").val() ;
		var s_enddate = $("#datepicker2").val() ;
		var n_search_type = $("#n_search_type").val() ;
		var n_service_domain = $("#n_service_domain").val() ;
		var s_search_text = $("#s_search_text").val() ;
		var obj = {
				"n_menu": n_menu,
				"n_submenu": n_submenu, 
				"s_startdate" : s_startdate, 
				"s_enddate" : s_enddate, 
				"n_search_type" : n_search_type,
				"n_service_domain" : n_service_domain,
				"s_search_text" : s_search_text
		} ;
		var action = contextPath +"/menu"+ n_menu +"/cont.do" ;
		fnMakeForm(action, obj) ;
	}
}
function fnSaveThis() {
	root.debug("fnSaveThis()")
	var n_menu = $("#n_menu").val() ;
	var n_submenu = $("#n_submenu").val();
	if (n_menu == 11) {	// 실시간 현황
		var s_startdate = $("#datepicker1").val();
		var obj = {
				"n_menu" : n_menu,
				"n_submenu" : n_submenu,
				"s_startdate" : s_startdate
		};
		var action = contextPath + "/menu" + n_menu + "/cont_xls.do" ; 
		makeForm(action, obj);
	} else if (n_menu == 12) {	// 콜리스트
		var s_startdate = $("#datepicker1").val() ;
		var s_enddate = $("#datepicker2").val() ;
		var n_search_type = $("#n_search_type").val() ;
		var n_service_domain = $("#n_service_domain").val() ;
		var s_search_text = $("#s_search_text").val() ;
		var obj = {
				"n_menu": n_menu,
				"n_submenu": n_submenu, 
				"s_startdate" : s_startdate, 
				"s_enddate" : s_enddate, 
				"n_search_type" : n_search_type,
				"n_service_domain" : n_service_domain,
				"s_search_text" : s_search_text
		} ;
		var action = contextPath +"/menu"+ n_menu +"/cont_xls.do" ;
		makeForm(action, obj) ;
	} else if (n_menu == 13) {	// 학습자료
		var s_startdate = $("#datepicker1").val() ;
		var s_enddate = $("#datepicker2").val() ;
		var n_search_type = $("#n_search_type").val() ;
		var n_service_domain = $("#n_service_domain").val() ;
		var s_search_text = $("#s_search_text").val() ;
		var obj = {
				"n_menu": n_menu,
				"n_submenu": n_submenu, 
				"s_startdate" : s_startdate, 
				"s_enddate" : s_enddate, 
				"n_search_type" : n_search_type,
				"n_service_domain" : n_service_domain,
				"s_search_text" : s_search_text
		} ;
		var action = contextPath +"/menu"+ n_menu +"/cont_xls.do" ;
		makeForm(action, obj) ;
	} else if (n_menu == 14) {	// 학습스케줄
		var s_startdate = $("#datepicker1").val() ;
		var s_enddate = $("#datepicker2").val() ;
		var n_search_type = $("#n_search_type").val() ;
		var n_service_domain = $("#n_service_domain").val() ;
		var s_search_text = $("#s_search_text").val() ;
		var obj = {
				"n_menu": n_menu,
				"n_submenu": n_submenu, 
				"s_startdate" : s_startdate, 
				"s_enddate" : s_enddate, 
				"n_search_type" : n_search_type,
				"n_service_domain" : n_service_domain,
				"s_search_text" : s_search_text
		} ;
		var action = contextPath +"/menu"+ n_menu +"/cont_xls.do" ;
		makeForm(action, obj) ;
	} else if (n_menu == 15) {	// 통계
		var s_startdate = $("#datepicker1").val() ;
		var s_enddate = $("#datepicker2").val() ;
		var n_search_type = $("#n_search_type").val() ;
		var search_year = $("#search_year").val() ;
		var search_month = $("#search_month").val() ;
		var n_service_domain = $("#n_service_domain").val() ;
		var obj = {
				"n_menu": n_menu,
				"n_submenu": n_submenu, 
				"s_startdate" : s_startdate, 
				"s_enddate" : s_enddate, 
				"n_search_type" : n_search_type,
				"search_year" : search_year,
				"search_month" : search_month,
				"n_service_domain" : n_service_domain
		} ;
		var action = contextPath +"/menu"+ n_menu +"/cont_xls.do" ;
		makeForm(action, obj) ;
	} else if (n_menu == 16) {	// 리포트
		var s_startdate = $("#datepicker1").val() ;
		var s_enddate = $("#datepicker2").val() ;
		var n_search_type = $("#n_search_type").val() ;
		var search_year = $("#search_year").val() ;
		var search_month = $("#search_month").val() ;
		var n_service_domain = $("#n_service_domain").val();
		var obj = {
				"n_menu": n_menu,
				"n_submenu": n_submenu, 
				"s_startdate" : s_startdate, 
				"s_enddate" : s_enddate, 
				"n_search_type" : n_search_type,
				"search_year" : search_year,
				"search_month" : search_month,
				"n_service_domain" : n_service_domain
		} ;
		var action = contextPath +"/menu"+ n_menu +"/cont_xls.do" ;
		makeForm(action, obj) ;
	} else if (n_menu == 17) {	// 관리설정
		if (n_submenu == 171 || n_submenu == 174) {
			var n_search_type = $("#n_search_type").val() ;
			var s_search_text = $("#s_search_text").val() ;
			var s_search_date = $("#datepicker1").val() ;
			var obj = {
					"n_menu": n_menu,
					"n_submenu": n_submenu, 
					"n_search_type": n_search_type,
					"s_search_text": s_search_text,
					"s_search_date": s_search_date 
			} ;
			var action = contextPath +"/menu"+ n_menu +"/cont_xls.do" ;
			makeForm(action, obj) ;
		} else if (n_submenu == 172) {
		} else if (n_submenu == 173) {
			var n_search_type = $("#n_search_type").val() ;
			var n_service_domain = $("#n_service_domain").val();
			var s_search_text = $("#s_search_text").val() ;
			var s_search_date = $("#datepicker1").val() ;
			var obj = {
					"n_menu": n_menu,
					"n_submenu": n_submenu, 
					"n_search_type": n_search_type,
					"n_service_domain": n_service_domain,
					"s_search_text": s_search_text,
					"s_search_date": s_search_date 
			} ;
			var action = contextPath +"/menu"+ n_menu +"/cont_xls.do" ;
			makeForm(action, obj) ;
		}
	} else if (n_menu == 18) {	// 파일리스트
		var s_startdate = $("#datepicker1").val() ;
		var s_enddate = $("#datepicker2").val() ;
		var n_search_type = $("#n_search_type").val() ;
		var n_service_domain = $("#n_service_domain").val() ;
		var s_search_text = $("#s_search_text").val() ;
		var obj = {
				"n_menu": n_menu,
				"n_submenu": n_submenu, 
				"s_startdate" : s_startdate, 
				"s_enddate" : s_enddate, 
				"n_search_type" : n_search_type,
				"n_service_domain" : n_service_domain,
				"s_search_text" : s_search_text
		} ;
		var action = contextPath +"/menu"+ n_menu +"/cont_xls.do" ;
		makeForm(action, obj) ;
	} else {
		var s_startdate = $("#datepicker1").val();
		var s_enddate = $("#datepicker2").val();
		var obj = {
				"n_menu" : n_menu,
				"n_submenu" : n_submenu,
				"s_startdate" : s_startdate, 
				"s_enddate" : s_enddate 
		};
		var action = contextPath + "/menu" + n_menu + "/cont_xls.do" ; 
		makeForm(action, obj);
	}
}
function fnSaveSubmenu() {
	root.debug("fnSaveSubmenu()") ;
	var n_menu = $("#n_menu").val() ;
	var n_submenu = $("#n_submenu").val() ;
	var s_today = $("#datepicker1").val() ;
	var obj = {
			"n_menu" : n_menu,
			"n_submenu" : n_submenu,
			"s_today" : s_today
	};
	var action = contextPath + "/menu" + n_menu + "/cont_xls.do" ;
	makeForm(action, obj);
}
//____________________________________________________________________________________________________
//
function reqGetResponse(data) {
	root.debug("regGetResponse()") ;
	if ($(data.popup_data)) {
		$(data.popup_data).each( function (key, val) {
			if (val.pd_result == "S_PARAM_FAIL") {
				alert("데이터가 정상적으로 전송되지 못했습니다.\n데이터를 확인 후, 다시 시도해 주세요.");
			} else if (val.pd_result == "S_WORK_OK") {
				alert("정상적으로 처리되었습니다.");
				var vSeq = "<c:out value='${n_seq}' />";
				fnParentReload() ;
			} else if (val.pd_result == "S_WORK_FAIL") {
				alert("처리에 실패했습니다.\n잠시 후, 다시 시도해 주세요.");
			} else if (val.pd_result == "S_DUPLICATE_FAIL") {
				alert("적용일자가 이미 존재하고 있습니다.\n적용일자를 확인한 후, 다시 시도해 주세요.");
			} else if (val.pd_result == "S_APPLYDATE_FAIL") {
				alert("적용일자가 현재날짜의 이전입니다.\n적용일자를 확인한 후, 다시 시도해 주세요.");
			} else if (val.pd_result == "S_WORK_FAIL") {
				alert("처리에 실패했습니다.\n잠시 후, 다시 시도해 주세요.");
			} else if (val.pd_result == "S_QUERY_FAIL") {
				alert("명령 실행에 실패했습니다.\n잠시 후, 다시 시도해 주세요.");
			} else if (val.pd_result == "S_DATA_FAIL") {
				alert("적용할 데이터가 맞지 않습니다.\n잠시 후 다시 시도해 주세요.");
			}
		});
	}
}
function errorNoti() {
	root.debug("errorNoti()") ;
	var obj = arguments;
	if(obj) {
		var objB = obj[0] || "";
		var objT = obj[1] || "";
		if((objT.toLowerCase()).indexOf("error") >= 0){
			if(objB && objB.readyState == "4" && objB.status == "200"){
				var code = $(eval('(' + objB.responseText + ')'))[0];
				if(code){
					code.message && alert(code.message);
					code.path && ($(top.document)[0].location.href = code.path);
				}
				return;
			}
		}
	}
	alert("에러");
}
//____________________________________________________________________________________________________
//
function fnOnClickTD(cell, row, col) {
	root.debug(row + " / " + col) ;
	var tr = cell.parent() ;
	var n_menu = $("#n_menu").val() ;
	var n_submenu = $("#n_submenu").val() ;

	// 11. 실시간현황
	if (n_menu == 11) {
		
	// 12. 콜리스트
	} else if (n_menu == 12) {
		var n_page = $("#n_page").val();
		// 121. 콜리스트
		if (n_submenu == 121) {
			var n_seq = tr.attr('ref') ;
			var s_calldate = tr.attr('ref1') ;
			if (col >= 0) {
				var param = {
						"n_menu" : n_menu,
						"n_submenu" : n_submenu,
						"n_page" : n_page,
						"n_popup" : n_submenu, 
						"n_seq" : n_seq,
						"s_calldate" : s_calldate
					};
				var title = "POPUP"+n_submenu ;
				fnPopupAction(1000, 650, param, title) ;
			}
		// 122. 비신뢰콜 리스트 
		} else if (n_submenu == 122) {			// 리스트
			var n_seq = tr.attr('ref') ;
			var s_calldate = tr.attr('ref1') ;
			if (col >= 0) {
				var param = {
						"n_menu" : n_menu,
						"n_submenu" : n_submenu,
						"n_page" : n_page,
						"n_popup" : n_submenu, 
						"n_seq" : n_seq,
						"s_calldate" : s_calldate
					};
				var title = "POPUP"+n_submenu ;
				fnPopupAction(1000, 650, param, title) ;
			}
			// 123. 콜문장 리스트 
		} else if (n_submenu == 123) {			// 리스트
			var n_seq = tr.attr('ref') ;
			var s_calldate = tr.attr('ref1') ;
			if (col >= 0) {
				var param = {
						"n_menu" : n_menu,
						"n_submenu" : n_submenu,
						"n_page" : n_page,
						"n_popup" : n_submenu, 
						"n_seq" : n_seq,
						"s_calldate" : s_calldate
					};
				var title = "POPUP"+n_submenu ;
				fnPopupAction(1000, 650, param, title) ;
			}
		}
	// 13. 학습자료
	} else if (n_menu == 13) {
		var n_page = $("#n_page").val();
		// 131. 학습파일
		if (n_submenu == 131) {
			var n_seq = tr.attr('ref') ;
			var s_path = tr.attr('ref1') ;
			var s_file = tr.attr('ref2') ;
			if (col >= 0) {
				var v_url = contextPath + s_path + s_file;
				location.href = v_url;
			}
		// 132. 용어정의
		} else if (n_submenu == 132) {
			var n_seq = tr.attr('ref') ;
			var n_word_seq = tr.attr('ref1') ;
			if (col >= 0) {
				var param = {
						"n_menu" : n_menu,
						"n_submenu" : n_submenu,
						"n_page" : n_page,
						"n_popup" : n_submenu, 
						"n_seq" : n_seq,
						"n_word_seq" : n_word_seq
					};
				var title = "POPUP"+n_submenu ;
				fnPopupAction(600, 450, param, title) ;
			}
		// 133. 비신뢰콜
		} else if (n_submenu == 133) {
			var n_seq = tr.attr('ref') ;
			var s_calldate = tr.attr('ref1') ;
			if (col >= 0) {
				var param = {
						"n_menu" : n_menu,
						"n_submenu" : n_submenu,
						"n_page" : n_page,
						"n_popup" : n_submenu, 
						"n_seq" : n_seq,
						"s_calldate" : s_calldate
					};
				var title = "POPUP"+n_submenu ;
				fnPopupAction(1000, 650, param, title) ;
			}
		}
	// 14. 학습스케줄
	} else if (n_menu == 14) {
		var n_page = $("#n_page").val();
		// 141. 대상선택
		if (n_submenu == 141) {
			var n_seq = tr.attr('ref') ;
			var n_service_domain = tr.attr('ref1') ;
			var n_schedule_seq = tr.attr('ref2') ;
			if (col >= 0) {
				var param = {
						"n_menu" : n_menu,
						"n_submenu" : n_submenu,
						"n_page" : n_page,
						"n_popup" : n_submenu, 
						"n_seq" : n_seq,
						"n_service_domain" : n_service_domain,
						"n_schedule_seq" : n_schedule_seq
					};
				var title = "POPUP"+n_submenu ;
				fnPopupAction(1000, 400, param, title) ;
			}
		// 142. 스케줄 관리
		} else if (n_submenu == 142) {
			var n_seq = tr.attr('ref') ;
			if (col >= 0) {
				var param = {
						"n_menu" : n_menu,
						"n_submenu" : n_submenu,
						"n_page" : n_page,
						"n_popup" : n_submenu, 
						"n_seq" : n_seq
					};
				var title = "POPUP"+n_submenu ;
				fnPopupAction(600, 480, param, title) ;
			}
		}		
	// 15. 통계
	} else if (n_menu == 15) {

	// 16. 리포트
	} else if (n_menu == 16) {

	// 17. 환경설정
	} else if (n_menu == 17) {
		// 171. 사용자관리
		if (n_submenu == 171) {
			var n_seq = 0;
			var n_page = $("#n_page").val();
			if (col >= 0) {
				n_seq = tr.attr('ref') ;
			} 
			var param = {
					"n_menu" : n_menu,
					"n_submenu" : n_submenu,
					"n_page" : n_page,
					"n_popup" : n_submenu, 
					"n_seq" : n_seq
				};
			var title = "POPUP"+n_submenu ;
			fnPopupAction(600, 700, param, title) ;
		// 172. 서버관리	
		} else if (n_submenu == 172) {
			
		// 173. 신뢰도관리
		} else if (n_submenu == 173) {
			var n_seq = 0;
			var n_page = $("#n_page").val();
			var n_service_domain = $("#n_service_domain").val();
			if (col >= 0) {
				n_seq = tr.attr('ref') ;
			} 
			var param = {
					"n_menu" : n_menu,
					"n_submenu" : n_submenu,
					"n_page" : n_page,
					"n_popup" : n_submenu, 
					"n_seq" : n_seq,
					"n_service_domain" : n_service_domain
				};
			var title = "POPUP"+n_submenu ;
			fnPopupAction(600, 350, param, title) ;
		// 174. 도메인관리
		} else if (n_submenu == 174) {
			var n_seq = 0;
			var n_page = $("#n_page").val();
			if (col >= 0) {
				n_seq = tr.attr('ref') ;
			} 
			var param = {
					"n_menu" : n_menu,
					"n_submenu" : n_submenu,
					"n_page" : n_page,
					"n_popup" : n_submenu, 
					"n_seq" : n_seq
				};
			var title = "POPUP"+n_submenu ;
			fnPopupAction(600, 350, param, title) ;
		}
	// 18. 파일리스트
	} else if (n_menu == 18) {
		var n_page = $("#n_page").val();
		// 181. 파일리스트
		if (n_submenu == 181) {
			var n_seq = tr.attr('ref') ;
			var s_calldate = tr.attr('ref1') ;
			if (col >= 0) {
				var param = {
						"n_menu" : n_menu,
						"n_submenu" : n_submenu,
						"n_page" : n_page,
						"n_popup" : n_submenu, 
						"n_seq" : n_seq,
						"s_calldate" : s_calldate
					};
				var title = "POPUP"+n_submenu ;
				fnPopupAction(1280, 840, param, title) ;
			}
		// 182. 비신뢰 리스트 
		} else if (n_submenu == 182) {			// 리스트
			var n_seq = tr.attr('ref') ;
			var s_calldate = tr.attr('ref1') ;
			if (col >= 0) {
				var param = {
						"n_menu" : n_menu,
						"n_submenu" : n_submenu,
						"n_page" : n_page,
						"n_popup" : n_submenu, 
						"n_seq" : n_seq,
						"s_calldate" : s_calldate
					};
				var title = "POPUP"+n_submenu ;
				fnPopupAction(1000, 650, param, title) ;
			}
			// 183. 문장 리스트 
		} else if (n_submenu == 183) {			// 리스트
			var n_seq = tr.attr('ref') ;
			var s_calldate = tr.attr('ref1') ;
			if (col >= 0) {
				var param = {
						"n_menu" : n_menu,
						"n_submenu" : n_submenu,
						"n_page" : n_page,
						"n_popup" : n_submenu, 
						"n_seq" : n_seq,
						"s_calldate" : s_calldate
					};
				var title = "POPUP"+n_submenu ;
				fnPopupAction(1000, 650, param, title) ;
			}
		}
	}
}
//____________________________________________________________________________________________________
// POPUP in POPUP

function fnOnClickTDPopup(cell, row, col, n_menu, n_submenu, n_popup, m_page, m_startdate, m_enddate, m_group_code, m_ulevel) {
	root.debug(row + " / " + col) ;
	var tr = cell.parent() ;
	// rtcc.taxi
	if (n_menu >10 && n_menu <20) {
		// 품질관리
		if (n_popup == 11) {
			var s_CALLID = cell.attr('ref') ;
			var s_RDATE = cell.attr('ref1') ;
			var s_RTIME = cell.attr('ref2') ;
			
			if (col == 99) {
				var n_popup = "99" ;
				var param = {
						"n_menu": n_menu, "n_submenu": n_submenu, "n_popup": n_popup, 
						"s_CALLID": s_CALLID, "s_RDATE": s_RDATE, "s_RTIME": s_RTIME
				};
				var title = "POPUP99" ;
				fnPopupAction(500, 250, param, title) ;
			}			
		} else if (n_popup == 12) {
			var n_callkey = tr.attr('ref') ;
			var n_oc_seq = tr.attr('ref1') ;
			var s_rdate = tr.attr('ref2') ;
			if (col == 8) {
				var n_popup = "11" ;
				var param = {
						"m_page": m_page, "m_startdate": m_startdate, "m_enddate": m_enddate, "m_group_code": m_group_code, "m_ulevel": m_ulevel,
						"n_menu": n_menu, "n_submenu": n_submenu, "n_popup": n_popup, "n_callkey": n_callkey, "n_oc_seq": n_oc_seq, "s_rdate": s_rdate
				};
				var title = "POPUP11" ;
				fnPopupAction(1020, 680, param, title) ;
			}			
		} else if (n_popup == 21) {
			var n_callkey = cell.attr('ref') ;
			var n_oc_seq = cell.attr('ref1') ;
			var s_rdate = cell.attr('ref2') ;
			if (col == 99) {
				var n_popup = "99" ;
				var param = {
						"m_page": m_page, "m_startdate": m_startdate, "m_enddate": m_enddate, "m_group_code": m_group_code, "m_ulevel": m_ulevel,
						"n_menu": n_menu, "n_submenu": n_submenu, "n_popup": n_popup, "n_callkey": n_callkey, "n_oc_seq": n_oc_seq, "s_rdate": s_rdate
				};
				var title = "POPUP99" ;
				fnPopupAction(500, 250, param, title) ;
			}			
		} else if (n_popup == 31) {
			var n_callkey = tr.attr('ref') ;
			var n_oc_seq = tr.attr('ref1') ;
			var s_rdate = tr.attr('ref2') ;
			if (col == 8) {
				var n_popup = "11" ;
				var param = {
						"m_page": m_page, "m_startdate": m_startdate, "m_enddate": m_enddate, "m_group_code": m_group_code, "m_ulevel": m_ulevel,
						"n_menu": n_menu, "n_submenu": n_submenu, "n_popup": n_popup, "n_callkey": n_callkey, "n_oc_seq": n_oc_seq, "s_rdate": s_rdate
				};
				var title = "POPUP11" ;
				fnPopupAction(1020, 680, param, title) ;
			}			
		} else if (n_popup == 41) {
			var n_callkey = tr.attr('ref') ;
			var n_oc_seq = tr.attr('ref1') ;
			var s_rdate = tr.attr('ref2') ;
			if (col == 8) {
				var n_popup = "99" ;
				var param = {
						"m_page": m_page, "m_startdate": m_startdate, "m_enddate": m_enddate, "m_group_code": m_group_code, "m_ulevel": m_ulevel,
						"n_menu": n_menu, "n_submenu": n_submenu, "n_popup": n_popup, "n_callkey": n_callkey, "n_oc_seq": n_oc_seq, "s_rdate": s_rdate
				};
				var title = "POPUP99" ;
				fnPopupAction(500, 250, param, title) ;
			}			
		} else if (n_popup == 42) {
			var n_agent = tr.attr('ref') ;
			var n_oc_seq = tr.attr('ref1') ;
			if (col == 7 || col == 9) {
				var n_sc_type = col;
				var n_popup = "12" ;
				var param = {
						"m_page": m_page, "m_startdate": m_startdate, "m_enddate": m_enddate, "m_group_code": m_group_code, "m_ulevel": m_ulevel,
						"n_menu": n_menu, "n_submenu": n_submenu, "n_popup": n_popup, "n_agent": n_agent, "n_oc_seq": n_oc_seq, "n_sc_type": n_sc_type
				};
				var title = "POPUP12" ;
				fnPopupAction(1020, 680, param, title) ;
			}
		} else if (n_popup == 99) {
		}
	// cats
	} else if (n_menu > 20 && n_menu < 30) {
		if (n_popup == 31 || n_popup == 32) {
			var n_callkey = tr.attr('ref') ;
			var n_oc_seq = tr.attr('ref1') ;
			var s_rdate = tr.attr('ref2') ;
			if (col == 9) {
				var n_popup = "99" ;
				var param = {
						"m_page": m_page, "m_startdate": m_startdate, "m_enddate": m_enddate, "m_group_code": m_group_code, "m_ulevel": m_ulevel,
						"n_menu": n_menu, "n_submenu": n_submenu, "n_popup": n_popup, "n_callkey": n_callkey, "n_oc_seq": n_oc_seq, "s_rdate": s_rdate
				};
				var title = "POPUP99" ;
				fnPopupAction(500, 250, param, title) ;
			}			
		} else if (n_popup == 41) {
			var n_callkey = cell.attr('ref') ;
			var n_oc_seq = cell.attr('ref1') ;
			var s_rdate = cell.attr('ref2') ;
			if (col == 99) {
				var n_popup = "99" ;
				var param = {
						"m_page": m_page, "m_startdate": m_startdate, "m_enddate": m_enddate, "m_group_code": m_group_code, "m_ulevel": m_ulevel,
						"n_menu": n_menu, "n_submenu": n_submenu, "n_popup": n_popup, "n_callkey": n_callkey, "n_oc_seq": n_oc_seq, "s_rdate": s_rdate
				};
				var title = "POPUP99" ;
				fnPopupAction(500, 250, param, title) ;
			}			
		}
	}
}

//____________________________________________________________________________________________________
// PRINT in DATA

function fnPrintThis(strPrintContents, strPath, strStdDate, strMemoText) {
	var objWin = null;
	var strFeature = "";
	var width = 1050;
	var height = 700;
	var x = (screen.width  - width)  / 2;
	var y = 0;
	if (true) {
		strFeature += ("width="+(width+20));
		strFeature += (",height="+height);
		strFeature += (",toolbar=no,location=no,directories=no");
		strFeature += (",status=no,menubar=no,scrollbars=yes,resizable=no");
	}
	objWin = window.open('', 'print', strFeature);
	self.focus();
	objWin.document.open();
	objWin.document.write("<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>");
	objWin.document.write("<html xmlns='http://www.w3.org/1999/xhtml'>");
	objWin.document.write("<head>");
	objWin.document.write("<title>"+SITE_NM+"</title>");
	objWin.document.write("<meta http-equiv='content-type' content='text/html; charset=utf-8' />");
	objWin.document.write("<link rel='stylesheet' type='text/css' href='"+contextPath+"/manager4/css/global.css' />");
	objWin.document.write("<link rel='stylesheet' type='text/css' href='"+contextPath+"/manager4/css/jquery-ui.css' />");
	objWin.document.write("<link rel='stylesheet' type='text/css' href='"+contextPath+"/manager4/css/style.css' />");
	objWin.document.write("<link rel='stylesheet' type='text/css' href='"+contextPath+"/manager4/js/colorbox/colorbox.css' />");
	objWin.document.write("<script src='"+contextPath+"/manager4/js/jquery-1.8.2.js'><\/script>");
	objWin.document.write("<script src='"+contextPath+"/manager4/js/jquery-ui.js'><\/script>");
	objWin.document.write("<script src='"+contextPath+"/manager4/js/html2canvas/rgbcolor.js' type='text/javascript'><\/script>");
	objWin.document.write("<script src='"+contextPath+"/manager4/js/html2canvas/canvg.js' type='text/javascript'><\/script>");
	objWin.document.write("<script src='"+contextPath+"/manager4/js/amcharts/amcharts.js' type='text/javascript'><\/script>");
	objWin.document.write("<script src='"+contextPath+"/manager4/js/amcharts/serial.js' type='text/javascript'><\/script>");
	objWin.document.write("<script src='"+contextPath+"/manager4/js/fixedheadertable/jquery.freezeheader.js' type='text/javascript'><\/script>");
	objWin.document.write("<script src='"+contextPath+"/manager4/js/colorbox/jquery.colorbox.js'><\/script>");
	objWin.document.write("<script src='"+contextPath+"/manager4/js/common.js'><\/script>");
	objWin.document.write("<script type='text/javascript'>");
	objWin.document.write("$(document).ready(function(){$('#btn_print').click( function() {window.print();});});<\/script>");
	objWin.document.write("</head>");
	objWin.document.write("<body onload='window.focus();'>");
	
	// 헤더
	objWin.document.write("<div id='report_print_header_area' style='width:"+width+"px;'>");
	objWin.document.write("  <div id='report_print_header_vspace_area'></div>");
	objWin.document.write("  <div id='report_print_header_title_area'>[ SGSAS™ 음성인식 운영지원시스템 ]</div>");
	objWin.document.write("  <div id='report_print_header_summary_area'>");
	objWin.document.write("    <div id='report_print_header_summary_left'>데이터 경로 : "+strPath+"<br>검색기간 : "+strStdDate+"</div>");
	objWin.document.write("    <div id='report_print_header_summary_right'><a alt='인쇄하기' title='인쇄하기' id='btn_print' name='btn_print'><button>Print</button></a></div>");
	objWin.document.write("  </div>");
	objWin.document.write("</div>");
	objWin.document.write("<div style='width:"+width+"px;height=20px;'>&nbsp;</div>");

	// 한줄메모
	if (false) {
		objWin.document.write("	<div id='report_print_memo_area'>");
		objWin.document.write("	<div id='report_print_memo_content_area'>");
		objWin.document.write("	<div id='report_data_title2'>");
		objWin.document.write("		<table id='report_data_table'>");
		objWin.document.write("			<colgroup>");
		objWin.document.write("				<col style='width:154px;' >");
		objWin.document.write("				<col style='' >");
		objWin.document.write("			</colgroup>");
		objWin.document.write("			<tbody>");
		objWin.document.write("				<tr>");
		objWin.document.write("					<td class='print_title'>한줄메모</td>");
		objWin.document.write("					<td class='data'>"+strMemoText+"</td>");
		objWin.document.write("				</tr>");
		objWin.document.write("			</tbody>");
		objWin.document.write("		</table>");
		objWin.document.write("	</div>");
		objWin.document.write("	</div>");
		objWin.document.write("	</div>");
	}

	// 표 & 그래프
	objWin.document.write("<div id='report_print_area' style='width:"+width+"px;'>");
	objWin.document.write(strPrintContents);
	objWin.document.write("</div>");
	objWin.document.write("</body>");
	objWin.document.write("</html>");
	objWin.document.close();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////	CUSTOM TIME FUNCTION

Object.defineProperty(Date.prototype, 'uid', {
	value : function() {
		function pad2(n) { return ((n<10) ? '0' : '') + n ; }
		return this.getFullYear()
			+ pad2(this.getMonth() + 1)
			+ pad2(this.getDate())
			+ pad2(this.getHours())
			+ pad2(this.getMinutes())
			+ pad2(this.getSeconds()) ;
	}
}) ;
Object.defineProperty(Date.prototype, 'timestamp', {
	value : function() {
		function pad2(n) { return ((n<10) ? '0' : '') + n ; }
		return this.getFullYear()
			+ '-' + pad2(this.getMonth() + 1)
			+ '-' + pad2(this.getDate())
			+ ' ' + pad2(this.getHours())
			+ ':' + pad2(this.getMinutes())
			+ ':' + pad2(this.getSeconds()) ;
	}
}) ;
Object.defineProperty(Date.prototype, 'dateString', {
	value : function() {
		function pad2(n) { return ((n<10) ? '0' : '') + n ; }
		return this.getFullYear()
			+ pad2(this.getMonth() + 1)
			+ pad2(this.getDate()) ;
	}
}) ;
Object.defineProperty(Date.prototype, 'timeString', {
	value : function() {
		function pad2(n) { return ((n<10) ? '0' : '') + n ; }
		return pad2(this.getHours())
			+ pad2(this.getMinutes())
			+ pad2(this.getSeconds()) ;
	}
}) ;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////