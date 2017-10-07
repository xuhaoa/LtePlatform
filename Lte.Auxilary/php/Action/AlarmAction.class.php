<?php
header("content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin: *");
//require'fun.php';
include'fun.php';
class AlarmAction extends Action
{
	//列表查询
	public function search(){
		$logfile = fopen("/tmp/alarm-search.log", "a");
		fwrite($logfile, "\n_REQUEST: ".var_export($_REQUEST,true));
		fclose($logfile);
		$results = array();
		$type = getParam('type',1);
		$areaName = getParam('areaName',1);
		$alarmLevel = getParam('alarmLevel',1);
		$stationName = getParam('stationName',1);
		$page_size = getParam('page_size',0);//每页个数
		$curr_page = getParam('curr_page',0);//第几页

		//设置查询条件
		$wherequery = " tbs.id = tba.stationid and gzqcsj11<='2000-01-01 00:00:00' and fssj10>='2000-01-01 00:00:00'";

		if($areaName != NULL && $areaName != '')
		{
			$wherequery .= " and id like '".$areaName."%'";	
		}
		if($type != NULL && $type != '')
		{
			$wherequery .= " and id like '%".$type."%'";	
		}
		if($stationName != NULL && $stationName != '')
		{
			$wherequery .= " and name like '%".$stationName."%'";	
		}
		if($page_size == NULL || $page_size == '')
		{
			$page_size = 30;
		}
		if($curr_page == NULL || $curr_page == '' || $curr_page <= 0)
			$curr_page = 1;
		if($alarmLevel != '')
			$wherequery = $wherequery." and gzdj06='".$alarmLevel."'";

		//准备数据
		$Station = M("stationcommon");

		if( $total >0 ){
			$total_pages = ceil($total/$page_size);
		}else{
			$total_pages = 0;
		}


		$start = $page_size * $curr_page - $page_size; //开始位置

		$list = $Station->table('tb_stationcommon tbs,tb_alarm tba')->field('StationId,name,longtitute,lattitute,min(gzdj06) as gzdj')->group('StationId')->where($wherequery)->limit($start.','.$page_size)->select();

		$i = 0;
		foreach($list as $l)
		{
			$result['index'] = $i + 1;
			$result['StationId'] = $l['StationId'];
			$result['name'] = urlencode(trim($l['name']));
			$result['longtitute'] = $l['longtitute'];
			$result['lattitute'] = $l['lattitute'];
			$result['gzdj'] = $l['gzdj'];
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
	public function single(){
		$logfile = fopen("/tmp/alarm-single.log", "a");
		fwrite($logfile, "\n_REQUEST: ".var_export($_REQUEST,true));
		fclose($logfile);

		$results = array();
		$StationId = getParam('id',1); 	
		$wherequery = " StationId = '".$StationId."'";

		$Station = M("alarm");
		$list = $Station -> where($wherequery)->select();
		$fields = $Station -> getDbFields();
		$size = count($fields);
		$i = 0;
		foreach($list as $l)
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
		echo getResponse($results,'','','');

				
	}

	public function show()
	{
		Log::Write(json_encode($_GET),Log::DEBUG,'');
		$this->display(); // 输出模板
	}
}
?>
