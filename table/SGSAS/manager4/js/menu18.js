$(document).ready( function() {
	$("#btn_search").click( function() {
		if (!fnSearchOptionCheck())
			return false;
		fnSearchThis();
	});
	$("#btn_upload").click(function() {
		console.log('upload') ;
		var vSubmenu = $("#n_submenu").val();
		if (vSubmenu == 181) {
			fnPopupUserControl(0);
		}
	}) ;
	$("#btn_save").click( function() {
		fnSaveThis();
		$('#viewLoading').hide();
	});
	$("#btn_print").click( function() {
		fnPrintThis(document.getElementById("report_cont_area_wraper").innerHTML, 
				document.getElementById("report_data_path").innerHTML, 
				document.getElementById("report_data_std_date").innerHTML, 
				"");
		$('#viewLoading').hide();
	});
	
	// Submenu Action
	$("a[id*=sub_menu]").click( function () { 
		// 로딩중 실행
		$('#viewLoading').show();
		var vMenu = $(this).attr('ref');
		fnMoveSubMenu(vMenu);
	});
	// search_type change
	$("#n_search_type").change( function() {
		var vSearchType = $("#n_search_type").val();
		if (parseInt(vSearchType) == 5) {	// 서비스 도메인
			$("#li_service_domain").show();
			$("#li_search_text").hide();
		} else {
			$("#li_service_domain").hide();
			$("#li_search_text").show();
		}
	});
	
	// Table Event Listener [tr][highlight]
	$("#menu1_main_list tbody tr").hover(
		function() { $(this).addClass("hovermove"); $(this).children().addClass("hovermove"); },
		function() { $(this).removeClass("hovermove"); $(this).children().removeClass("hovermove");
	});
	// Table Event Listener [td][highlight]
	$("#menu1_main_list tbody tr td").mouseenter( function() {
		var comp = $(this).attr('hv') ;
		$(this).closest('tr').children('[hv]').each( function() {
			if ($(this).attr('hv') == comp) {
				$(this).css({"color":"#EEE","text-shadow":"0px 1px 2px #000","cursor":"pointer"});
			}
		}) ;
	});
	$("#menu1_main_list tbody tr td").mouseleave( function() {
		var comp = $(this).attr('hv') ;
		$(this).closest('tr').children('[hv]').each( function() {
			if ($(this).attr('hv') == comp) {
				$(this).css({"color":"#000","text-shadow":"none","cursor":"pointer"});
			}
		}) ;
	});
	// Table Event Listener [tr][td][click]
	$("#menu1_main_list tbody tr td").click( function() {
		root.debug("#menu1_main_list > tbody > tr > td > click()")
		var td = $(this).get(0) ;
		var tr = $(td).parent().get(0) ;
		var table = $(tr).parent().get(0) ;
		$(table).children("tr").each( function() {				
			if ($(this).hasClass("highlight")) {
				$(this).removeClass("highlight"); $(this).children().removeClass("highlight");
		}});
		$(tr).addClass("highlight"); $(tr).children().addClass("highlight");
		var col = parseInt($(td).index()) ;
		var row = parseInt($(tr).index()) ;
		//$("#n_seq").val(parseInt(row) + 1) ;
		var col_cnt = $(this).parent().children().length ;
		var row_cnt = $(this).parent().parent().children().length ; 
		if (col_cnt == 1 && row_cnt == 1) {
		} else {
			fnOnClickTD($(this), row, col) ;
		}
	})
	
	// Paging Action
	$("a[id*=page_data]").click( function () { 
		$('#viewLoading').show();
		var vPage = $(this).attr('ref');
		fnGetMovePageList(vPage);
	});

	function fnGetMovePageList(vPage) {
		// 로딩중 해제
		$('#viewLoading').show();

		var s_startdate = $("#datepicker1").val() ;
		var s_enddate = $("#datepicker2").val() ;
		var n_search_type = $("#n_search_type").val() ;
		var n_service_domain = $("#n_service_domain").val();
		var s_search_text = $("#s_search_text").val() ;
		var obj = {
				"n_page": vPage,
				"n_menu": $("#n_menu").val(),
				"n_submenu": $("#n_submenu").val(),
				"s_startdate" : s_startdate, 
				"s_enddate" : s_enddate,
				"n_search_type" : n_search_type,
				"n_service_domain" : n_service_domain,
				"s_search_text" : s_search_text
			};
		var action = contextPath+"/menu"+$("#n_menu").val()+"/cont.do";
		fnMakeForm(action, obj);
	}
	
	function fnSearchOptionCheck() {
		console.log('fnSearchOptionCheck 1') ;

		var vSearchType = $("#n_search_type").val();
		var n_search_type = parseInt(vSearchType);
		var vSubmenu = $("#n_submenu").val();
		var n_submenu = parseInt(vSubmenu);
		var s_search_text = $("#s_search_text").val() ;
		
		console.log(vSearchType) ;
		console.log(n_search_type) ;
		console.log(vSubmenu) ;
		console.log(n_submenu) ;
		console.log(s_search_text) ;

		if (n_search_type == 6 || n_search_type == 7) {
			if (s_search_text != undefined && s_search_text != "") {
				var b_num = $.isNumeric(s_search_text);
				if (!b_num) {
					alert("신뢰도 점수 검색은 숫자만 입력이 가능합니다.\n확인 후 다시 시도해 주세요.");
					$("#s_search_text").focus();
					return false;
				}
			} else {
				alert("신뢰도 점수 검색은 숫자만 입력이 가능합니다.\n확인 후 다시 시도해 주세요.");
				$("#s_search_text").focus();
				return false;
			}
		}
		
		return true;
	}
	
	// List Popup Action
	function fnPopupUserControl(v_seq) {
		var n_menu = $("#n_menu").val();
		var n_submenu = $("#n_submenu").val();
		var n_page = $("#n_page").val();
		var n_seq = v_seq;
		if (n_submenu == 181) {
			var n_service_domain = $("#n_service_domain").val();
			var n_popup = n_submenu ;
			if (n_seq == 0 || n_seq == '0') {
				n_popup = '184' ;
				var param = {
						"n_menu" : n_menu,
						"n_submenu" : n_submenu,
						"n_page" : n_page,
						"n_popup" : n_popup, 
						"n_seq" : n_seq,
						"n_service_domain" : n_service_domain
					};
				fnPopupAction(590, 600, param, "POPUP"+n_popup);
			} else {
				var param = {
						"n_menu" : n_menu,
						"n_submenu" : n_submenu,
						"n_page" : n_page,
						"n_popup" : n_popup, 
						"n_seq" : n_seq,
						"n_service_domain" : n_service_domain
					};
				fnPopupAction(600, 200, param, "POPUP"+n_popup);
			}
		}
	}
});

function fnReceiveReloadData(vSeq) {
	$('#viewLoading').show();
	var n_menu = $("#n_menu").val() ;
	var n_submenu = $("#n_submenu").val() ;
	var s_startdate = $("#datepicker1").val() ;
	var s_enddate = $("#datepicker2").val() ;
	var n_search_type = $("#n_search_type").val() ;
	var n_service_domain = $("#n_service_domain").val() ;
	var s_search_text = $("#s_search_text").val() ;
	//alert($("#n_page").val()+","+n_menu+","+n_submenu+","+vSeq+","+s_startdate+","+s_enddate+","+s_group_code+","+s_ulevel);
	var obj = {
		"n_page" : $("#n_page").val(),
		"n_menu" : n_menu,
		"n_submenu" : n_submenu,
		"n_seq" : vSeq,
		"s_startdate" : s_startdate, 
		"s_enddate" : s_enddate,
		"n_search_type" : n_search_type,
		"n_service_domain" : n_service_domain,
		"s_search_text" : s_search_text
	};
	var action = contextPath+"/menu"+n_menu+"/cont.do";
	fnMakeForm(action, obj);
}
// 페이지 리로딩 후 해당 로우 잡아주기 - kingknight - 20140708 - start
$(window).load( function() {
	var n_seq = $("#n_seq").val() ;
	root.debug("Load Page > Set Table Index to " + n_seq) ;
	if (n_seq != "0") {
		$("#menu1_main_list tbody tr[tabindex="+ n_seq +"]").addClass("highlight");
		$("#menu1_main_list tbody tr[tabindex="+ n_seq +"]").children().addClass("highlight");
		$("#menu1_main_list tbody tr[tabindex="+ n_seq +"]").focus();
	}
});
