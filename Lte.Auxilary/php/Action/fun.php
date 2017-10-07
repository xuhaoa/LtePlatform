<?php
/*
* 参数解析 防sql注入
 */
function getParam($name,$type){
	if($type == 0)//数字
	{
		if(is_numeric($_REQUEST[$name]))
			return $_REQUEST[$name];
		else 
			return ''; 
	}
	else if($type == 1)//字符
	{
		$str = $_REQUEST[$name];
		$str = addslashes($str);

		$str = str_replace("and","",$str);
		$str = str_replace("execute","",$str);
		$str = str_replace("update","",$str);
		$str = str_replace("count","",$str);
		$str = str_replace("chr","",$str);
		$str = str_replace("mid","",$str);
		$str = str_replace("master","",$str);
		$str = str_replace("truncate","",$str);
		$str = str_replace("char","",$str);
		$str = str_replace("declare","",$str);
		$str = str_replace("select","",$str);
		$str = str_replace("create","",$str);
		$str = str_replace("delete","",$str);
		$str = str_replace("insert","",$str);
		$str = str_replace("'","",$str);
		$str = str_replace("\"","",$str);
		$str = str_replace(";","",$str);
		$str = str_replace("or","",$str);
		$str = str_replace("=","",$str);
		$str = str_replace("%20","",$str);
		$str = str_replace("_", "\_", $str);    // 把 '_'过滤掉      
		$str = str_replace("%", "\%", $str);    // 把 '%'过滤掉      
		$str = nl2br($str);    // 回车转换      
		$str = htmlspecialchars($str);    // html标记转换 
		return $str;
	}else if($type == 2){
		return  stripslashes ($_REQUEST[$name]); 	
	}else if($type == 3){
		return $_REQUEST[$name];
	}
}

//获取错误信息 *****************************************
function getErrMsg($errCode, $description){
	$msg = '{"error":%d, "description":"%s"}';
	return sprintf($msg, $errCode, $description);
}

function getErrMsg0($name){
	return getErrMsg(1, "缺少参数 '".$name."'");
}

function getErrMsg1($name, $value){
	return getErrMsg(2, "参数取值错误 '".$name."':'".$value."'");
}

function getErrMsg2(){
	return getErrMsg(3, "无数据");
}
function getErrMsg4(){
	return getErrMsg(10, "请求失败，接口暂不支持");
}
function getErrMsg3($info){
	return getErrMsg(100, sprintf("系统错误 '%s'", (isset($info) && $info != '' ? $info : 'NULL')));
}
//*******************************************************
//获取结果 *********************************************
function getResponse($result, $page, $title, $dataDates){
	$resp->error = 0;
	$resp->description = urlencode("请求成功");
	if(isset($page) && $page != '') $resp->page = $page;
	if(isset($result) && $result != '') $resp->result = $result;
	if(isset($title) && $title != '') $resp->title = $title;
	if(isset($dataDates) && $dataDates != '') $resp->dataDate = $dataDates;
	//print_r($resp);
	$msg = json_encode($resp);
	$msg = urldecode($msg);
	return $msg;
}
function tranToCityCode($cityname){
	$CityCode = 'FS';
	if($cityname == 'FS顺德' || $cityname == '顺德'){
		$CityCode = 'SD';
	}else if($cityname == 'FS南海' || $cityname == '南海'){
		$CityCode = 'NH';
	}else if($cityname == 'FS禅城' || $cityname == '禅城'){
		$CityCode = 'CC';
	}else if($cityname == 'FS三水' || $cityname == '三水'){ 
		$CityCode = 'SS';
	}else if($cityname == 'FS高明' || $cityname == '高明'){
		$CityCode = 'GM';
	}
	return $CityCode;
		
}
?>
