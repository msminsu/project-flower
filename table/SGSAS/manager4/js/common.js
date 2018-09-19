// 동적으로 imput 생성
function makeInput(name, value) {
	var _input = document.createElement("input");
	_input.setAttribute("type", "hidden");
	_input.setAttribute("name", name);
	_input.setAttribute("value", value);
	return _input;
}

// 동적으로 form 생성
// obj : json data, flag : null and false = POST, true = GET, target
function makeForm(ActionURL, obj, flag, target) {
	var _form = document.createElement("form");
	_form.setAttribute("method", flag && "GET" || "POST");
	_form.setAttribute("action", ActionURL);
	if(target){
		_form.setAttribute("target", target);
	}else{
		_form.setAttribute("target", "_self");
	}
	if (obj) {
		for ( var obj_element in obj) {
			var obj_value = obj[obj_element];
			if (obj_value) {
				_form.appendChild(makeInput(obj_element, obj_value));
			}
		}
	}
	document.body.appendChild(_form);
	_form.submit();

	// 로딩중 실행
	$('#viewLoading').show();

}

//동적으로 form 생성
//obj : json data, flag : null and false = POST, true = GET, target
function makeForm2(ActionURL, obj, flag, target) {
	var _form = document.createElement("form");
	_form.setAttribute("method", flag && "GET" || "POST");
	_form.setAttribute("action", ActionURL);
	if(target){
		_form.setAttribute("target", target);
	}else{
		_form.setAttribute("target", "_self");
	}
	if (obj) {
		for ( var obj_element in obj) {
			var obj_value = obj[obj_element];
			if (obj_value) {
				_form.appendChild(makeInput(obj_element, obj_value));
			}
		}
	}
	document.body.appendChild(_form);
	_form.submit();

}

function getScrollbarWidth(){
	var outer = document.createElement("div");
	outer.style.visibility = "hidden";
	outer.style.width = "100px";
	outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

	document.body.appendChild(outer);

	var widthNoScroll = outer.offsetWidth;
	// force scrollbars
	outer.style.overflow = "scroll";

	// add innerdiv
	var inner = document.createElement("div");
	inner.style.width = "100%";
	outer.appendChild(inner);        

	var widthWithScroll = inner.offsetWidth;

	// remove divs
	outer.parentNode.removeChild(outer);

	return widthNoScroll - widthWithScroll;
}

function pad(str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}