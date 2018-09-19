$(document).ready(function() {
	$("#viewLoading").hide();
	$("#btn_cancel").click( function() {
		console.log('btn_cancel') ;
		window.close() ;
	});
});

var n_max = 0 ; // 선택된 파일 전체
var n_cnt = 0 ; // 업로드 상태 현재
var b_upload = false ; // 파일 업로드 시작/중지

// 화면에 표시되는 파일 선택 정보 및 업로드 상태를 갱신합니다.
function updateInfo() {
	var btnApply = document.getElementById('btn_apply') ;
	var btnClear = document.getElementById('btn_clear') ;
	var upInfo = document.getElementById('upload_info') ;
	upInfo.innerHTML = (n_cnt+" / "+n_max) ;
	if (n_cnt == 0 || n_cnt == n_max) {
		btnApply.innerHTML = "업로드" ;
		btnClear.disabled = false ;
	} else {
		btnApply.innerHTML = "중지" ;
		btnClear.disabled = true ;
	}
}

// 선택된 파일의 목록을 비웁니다.
function clearList(tbody) {
	if (tbody) {
		while (tbody.rows.length > 0) {
			tbody.deleteRow(0) ;
		}
	}
	n_max = 0 ;
	n_cnt = 0 ;
	b_upload = false ;
	updateInfo() ;
}

// 선택된 파일 정보를 화면 목록에 추가합니다.
function addRow(tbody, i, fileObj) {
	var rowBody = '' ;
	if (tbody) {
		var newRow = tbody.insertRow(tbody.rows.length) ;
		newRow.insertCell(0).innerHTML = (i+1) ;
		newRow.insertCell(1).innerHTML = fileObj.type ;
		newRow.insertCell(2).innerHTML = fileObj.name ;
		newRow.insertCell(3).innerHTML = '대기' ;
	}
	var listBody = document.getElementById('popup_data_list') ;
	listBody.scrollTop = listBody.scrollHeight ;
}

// 전송 목록의 파일을 순차적으로 전송합니다.
function sendFile(tbody, i, fileList) {
	var n_menu = $("#n_menu").val() ;
	var n_submenu = $("#n_submenu").val() ;
	var n_popup = $("#n_popup").val() ;
	var n_user_seq = $("#TC_USER_SEQ").val();
	var domainList = document.getElementById('n_service_domain') ;
	var domainObj = domainList.options[domainList.selectedIndex] ;
	var s_domain_name = domainObj.innerHTML ;
	var s_domain_code = domainObj.getAttribute('code') ; 
	var fileObj = fileList[i] ;
	var n_upload_max = document.getElementById('btn_apply').getAttribute('limit') ;
	// n_upload_max = n_upload_max / 10 ;
	console.log(n_upload_max) ;
	
	if (fileObj.size >= n_upload_max) {
		console.log("[SKIP] "+fileObj.name+"("+fileObj.size+") :: 업로드 가능한 최대 용량 "+n_upload_max+" ") ;
		document.getElementById('btn_apply').innerHTML = "에러" ;
		if ((i+1) < n_max) {
			sendFile(tbody, i+1, fileList) ;
		}
	} else {
		var formData = new FormData() ;
		formData.append("upload_file", fileObj) ;
		formData.append("n_menu", n_menu) ;
		formData.append("n_submenu", n_submenu) ;
		formData.append("n_popup", n_popup) ;
		formData.append("n_user_seq", n_user_seq) ;
		formData.append("s_domain_name", s_domain_name) ;
		formData.append("s_domain_code", s_domain_code) ;
		var xhr = new XMLHttpRequest() ;
		xhr.open('POST', '/SGSAS/popup/cont_fileupload.do', true) ;
		xhr.onprogress = function(p) {
			if (p.loaded < p.total) {
				tbody.rows[i].cells[3].innerHTML = "진행중" ;
			} else {
				tbody.rows[i].cells[3].innerHTML = "완료" ;
				n_cnt = n_cnt + 1 ;
				updateInfo() ;
			}
		};
		xhr.onreadystatechange = function() {
			if (xhr.readyState == XMLHttpRequest.DONE) {
				if (xhr.readyState == 4 && xhr.status == 200) {
					if (xhr.responseText) {
						var jsonObj = JSON.parse(xhr.responseText) ;
						// console.log(jsonObj) ;
					}
					if (b_upload) {
						if ((i+1) < n_max) {
							sendFile(tbody, i+1, fileList) ;
						} else {
							alert("파일 업로드가 완료되었습니다.") ;
						}
					} else {
						document.getElementById('btn_apply').innerHTML = "업로드" ;
						document.getElementById('btn_clear').disabled = false ;
					}
				}
			}
		}
		xhr.send(formData) ;
	}
}

// 선택된 파일의 목록을 작성합니다.
function fileSelected(obj) {
	var list = obj.files ;
	var tbody = document.getElementById('file_list') ;
	clearList(tbody) ;
	for (var i=0; i<list.length; i++) {
		addRow(tbody, i, list[i]) ;
		n_max = i + 1 ;
		updateInfo() ;
	}
	n_max = list.length ;
	updateInfo() ;
} ;

// 작성된 파일 목록을 기준으로 파일을 순차적으로 전송합니다.
function uploadApply() {
	var tbody = document.getElementById('file_list') ;
	var listObj = document.getElementById('btn_list') ;
	var list = listObj.files ;
	if (document.getElementById('n_service_domain').selectedIndex == 0) {
		alert("도메인을 선택해 주세요") ;
	} else {
		if (listObj && list) {
			if (list.length > 0) {
				if (!b_upload) {
					if (n_cnt < n_max) {
						b_upload = true ;
						sendFile(tbody, n_cnt, list) ;
						document.getElementById('btn_apply').innerHTML = "중지" ;
						document.getElementById('btn_clear').disabled = true ;
					}
				} else {
					b_upload = false ;
				}
			} else {
				alert('선택된 파일이 없습니다.') ;
			}
		}
	}
}

// input 객체에 담긴 파일정보를 초기화 합니다.
function uploadClear() {
	if ($.browser.msie) {
		$("#btn_list").replaceWith( $("#btn_list").clone(true) ) ;
	} else {
		$("#btn_list").val("") ;
	}
	var tbody = document.getElementById('file_list') ;
	clearList(tbody) ;
}
