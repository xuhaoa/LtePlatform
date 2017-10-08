<?php
header("content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin: *");
//require'fun.php';
include'fun.php';
class AlarmhistoryAction extends Action
{
	//列表查询
	public function search(){
		$results = array();

		$stationId = getParam('id',1);
		
		$curr_page = getParam('curr_page',0);
		$page_size = getParam('page_size',0);
		$alarmLevel = getParam('alarmLevel',1);

		$logfile = fopen("/tmp/alarmhistory-search.log", "a");
		fwrite($logfile, "\n_REQUEST: ".var_export($_REQUEST,true));
		fclose($logfile);

		$starttime = getParam('starttime',1);
		$endtime = getParam('endtime',1);
		//$AlarmName = getParam('alarm_name',1);

		if($curr_page == NULL || $curr_page == '' || $curr_page <= 0)
			$curr_page = 1;

		if($page_size == NULL || $page_size == '')
		{
			$page_size = 30;
		}

		//设置查询条件
		$wherequery = ' 1 = 1   ';
		if($stationId != '')
			$wherequery = $wherequery." and stationId='".$stationId."'";
		if($starttime != '')
			$wherequery = $wherequery." and fssj10>='".$starttime."'";
		if($endtime != '')
			$wherequery = $wherequery." and fssj10<='".$endtime."'";
		if($alarmLevel != '')
			$wherequery = $wherequery." and gzdj06='".$alarmLevel."'";

		//准备数据
		$Alarmhistory = M("alarmhistory");

		$total = $Alarmhistory->where($wherequery)->count();
		if( $total >0 ){
			$total_pages = ceil($total/$page_size);
		}else{
			$total_pages = 0;
		}

		if ($curr_page > $total_pages) 
			$curr_page=$total_pages;
		$start = $page_size * $curr_page - $page_size; //开始位置

		$listAlarmhistory = $Alarmhistory->where($wherequery)->limit($start.','.$page_size)->select();

		$fields = $Alarmhistory -> getDbFields();
		$size = count($fields);
		$i = 0;
		foreach($listAlarmhistory as $l)
		{
			$j = 0;
			foreach($fields as $f)	
			{
				if($j == $size-2)
					break;
				$result[$f] = urlencode(trim($l[$f]));
				$j++;
			}
			$results[$i] = $result;
			$i++;
				
		}

		//返回结果
		$responce['curr_page'] = $curr_page;
		$responce['total_pages'] = $total_pages;
		$responce['records'] = $total;
		$responce['rows'] = $results;
		echo getResponse($responce,'','','');
	}

	public function show()
	{
		Log::Write(json_encode($_GET),Log::DEBUG,'');
		$this->display(); // 输出模板
	}
}
?>
