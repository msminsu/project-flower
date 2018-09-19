var b_tc_id = false;
var b_edit_mode = false;
var n_action = -1;
var s_audioURL = '' ;

$(document).ready(function() {
	$("#viewLoading").hide();
	
	$("#btn_change").click( function () {
		if (b_edit_mode) {
			b_edit_mode = false;
			$("#btn_apply").hide();
			$("#s_btn_change").text("편집모드");
			$("#call_edit").hide();
			$("#call_view").show();
		}
		else {
			b_edit_mode = true;
			$("#btn_apply").show();
			$("#s_btn_change").text("뷰모드");
			$("#call_view").hide();
			$("#call_edit").show();
		}
	});
	
	$("#btn_apply").click( function() {
		if (!fnFormValidationCheck()) {
			return false;
		}
		n_action = 0;
		fnAjaxCtrl(n_action);
	});
	$("#btn_cancel").click( function() {
		window.close() ;
	});

	// AJAX Works
	function fnAjaxCtrl(vAction) {
		// SEQ, TC_DOMAIN_SEQ, TC_APPDATE, TC_APPNAME, TC_TYPE_SELECT, TC_LIST_MAX_COUNT, TC_LIST_MAX_RATIO, TC_USEYN 
		var data_val = "n_action="+vAction;
		data_val += "&n_seq="+$("#n_seq").val()+"&n_menu="+$("#n_menu").val()+"&n_submenu="+$("#n_submenu").val()+"&n_popup="+$("#n_popup").val();
		data_val += "&TC_CALL_STARTDATE="+$("#TC_CALL_STARTDATE").val()+"&TC_SEQ="+$("#TC_SEQ").val();
		data_val += "&TC_CURRENTTIME=";
        $("input:hidden[id='TC_CURRENTTIME']").each(function(){
            var v_temp = $(this).val();
            data_val += v_temp+",";
        });
		data_val += "&TC_CHANNEL=";
        $("input:hidden[id='TC_CHANNEL']").each(function(){
            var v_temp = $(this).val();
            data_val += v_temp+",";
        });
		data_val += "&TC_STT_RESULT=";
        $("input:text[id='TC_STT_RESULT']").each(function(){
            var v_temp = $(this).val();
            data_val += v_temp+",";
        });
		// alert(data_val);	return false;
		var s_url = contextPath + "/popup/cont_popup_ajax.do" ;
		// alert(s_url);	return false;
		
		$.ajax({
			type: "POST",
			dataType: "json",
			url: s_url,
			data: data_val,
			success: reqGetResponse,
			error: errorNoti
		});
	}
	
	function reqGetResponse(data) {
		if ($(data.popup_data)) {
			$(data.popup_data).each( function (key, val) {
				if (n_action == 0) {
					if (val.pd_result == "S_WORK_FAIL") {
						alert("정보처리에 실패했습니다.\n잠시 후 다시 시도해 주세요.");
					} else if (val.pd_result == "S_PARAM_FAIL") {
						alert("전송 데이터가 불확실합니다.\n잠시 후 다시 시도해 주세요.");
					} else if (val.pd_result == "S_DB_FAIL") {
						alert("데이터 정보 변경에 실패가 있습니다.\n사이트 사용 상태를 확인해주세요.");
					} else if (val.pd_result == "S_WORK_OK") {
						alert("정상 처리되었습니다.");
						opener.location.reload();
						window.close() ;
					}
				} 
			});
		}
	}
	function errorNoti() {
		alert("ERROR");
	}
	
	// Work Form Commit
	function fnFormValidationCheck() {
        var v_error = 0;
        
        $("input:text[id='TC_STT_RESULT']").each(function(){
            var v_temp = $(this).val();
            if (v_temp == undefined || v_temp == "") {
            	v_error = 1;
            	return false;
            } else {
            	if (checkSpecialCharacter(v_temp)) {
            		v_error = 2;
                	return false;
            	}
            }
        });
        if (v_error == 1) {
        	if (!confirm("수정 텍스트 상에 빈 칸이 있습니다.\n빈 칸은 추후 음성인식 결과에 영향을 미칠 수 있습니다.\n그래도 적용하시겠습니까?")) {
        		return false;
        	}
        } else if (v_error == 2) {
        	alert("수정 텍스트 상에 특수문자 및 기호가 포함되어 있습니다.\n음성인식 텍스트는 한글글자로만 입력하길 권장합니다.");
        	return false;
        }
        
        return true;
	}
	
	// Table Event Listener [tr][highlight]
	$("#popup_data_table tbody tr").hover(
		function() { $(this).addClass("hovermove"); $(this).children().addClass("hovermove"); },
		function() { $(this).removeClass("hovermove"); $(this).children().removeClass("hovermove");
	});
	// Table Event Listener [td][highlight]
	$("#popup_data_table tbody tr td").mouseenter( function() {
		var comp = $(this).attr('hv') ;
		$(this).closest('tr').children('[hv]').each( function() {
			if ($(this).attr('hv') == comp) {
				$(this).css({"color":"#EEE","text-shadow":"0px 1px 2px #000","cursor":"pointer"});
			}
		}) ;
	});
	$("#popup_data_table tbody tr td").mouseleave( function() {
		var comp = $(this).attr('hv') ;
		$(this).closest('tr').children('[hv]').each( function() {
			if ($(this).attr('hv') == comp) {
				$(this).css({"color":"#000","text-shadow":"none","cursor":"pointer"});
			}
		}) ;
	});
	// Table Event Listener [tr][td][click]
	$("#popup_data_table tbody tr td").click( function() {
		root.debug("#popup_data_table > tbody > tr > td > click()")
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
			var n_currenttime = $(tr).attr('ref');
			fnSeekPlayer(n_currenttime);
			// fnSeekPlayer("mediaplayer", n_currenttime);
		}
	});
});
