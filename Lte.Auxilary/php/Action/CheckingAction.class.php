<?php
header("content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin: *");
//require'fun.php';
include'fun.php';
class CheckingAction extends Action
{
	
	public function index() {
	}
		
	//列表查询
	public function check(){
		$results = array();
		$page_size = getParam('page_size',0);//每页个数
		$curr_page = getParam('curr_page',0);//第几页
		$areaName = getParam('areaName',1);//第几页
		$status = getParam('status',1);//第几页

		if($curr_page == NULL || $curr_page == '' || $curr_page <= 0)
			$curr_page = 1;

		$wherequery = ' 1 = 1   ';

		if($areaName != NULL || $areaName != '')
		{
			$wherequery .= " and areaName = '".$areaName."'";	
		}

		if($status != NULL || $status != '')
		{
			$wherequery .= " and status like '%".$status."%'";	
		}

		if($page_size == NULL || $page_size == '')
		{
			$page_size = 30;
		}


		$Special = M("checking");

		$total = $Special->where($wherequery)->count(); // 查询数据
		if( $total >0 ){
			$total_pages = ceil($total/$page_size);
		}else{
			$total_pages = 0;
		}

		if ($curr_page > $total_pages) 
			$curr_page=$total_pages;
		$start = $page_size * $curr_page - $page_size; //开始位置

		$list = $Special -> where($wherequery)->limit($start.','.$page_size)->select();

		$fields = $Special -> getDbFields();
		$size = count($fields);
		$i = 0;
		foreach($list as $l)
		{
			$j = 0;
			foreach($fields as $f)	
			{
				if($j == $size-1)
					break;
				$result[$f] = urlencode($l[$f]); //编码
				$j++;
			}
			$results[$i] = $result;
			$i++;
		}

		$responce['curr_page'] = $curr_page;
		$responce['total_pages'] = $total_pages;
		$responce['records'] = $total;
		$responce['rows'] = $results;
		echo getResponse($responce,'','','');
	}
	public function search(){
		$logfile = fopen("/tmp/checking-check.log", "a");
		fwrite($logfile, "\n_REQUEST: ".var_export($_REQUEST,true));
		fclose($logfile);
		$results = array();
		$page_size = getParam('page_size',0);//每页个数
		$curr_page = getParam('curr_page',0);//第几页
		$areaName = getParam('areaName',1);//
		$status = getParam('status',1);//
		$type = getParam('type',1);//
		$stationName = getParam('stationName',1);//

		if($curr_page == NULL || $curr_page == '' || $curr_page <= 0)
			$curr_page = 1;
		if($page_size == NULL || $page_size == '')
		{
			$page_size = 30;
		}

		$wherequery = ' tbs.id = tbc.stationid ';


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
		if($status != NULL && $status != '')
		{
			if($status == '已巡检')
				$wherequery .= " and XJDZT027='归档'";	
			else
				$wherequery .= " and XJDZT027!='归档'";	
				
		}

		$Station = M("stationcommon");
		$total = $Station->table('tb_stationcommon tbs,tb_checkplan tbc')->where($wherequery)->count(); // 查询数据

		if( $total >0 ){
			$total_pages = ceil($total/$page_size);
		}else{
			$total_pages = 0;
		}

		if ($curr_page > $total_pages) 
			$curr_page=$total_pages;
		$start = $page_size * $curr_page - $page_size; //开始位置

		$list = $Station->table('tb_stationcommon tbs,tb_checkplan tbc')->where($wherequery)->limit($start.','.$page_size)->select();

		$fields = $Station -> getDbFields();
		$size = count($fields);
		$i = 0;
		foreach($list as $l)
		{
			$j = 0;
			$result['index'] = $i + 1;
			foreach($fields as $f)	
			{
				if($j == $size-2)
					break;
				$result[$f] = urlencode(trim($l[$f])); //编码
				$j++;
			}
			$results[$i] = $result;
			$i++;
		}

		$responce['curr_page'] = $curr_page;
		$responce['total_pages'] = $total_pages;
		$responce['records'] = $total;
		$responce['rows'] = $results;
		echo getResponse($responce,'','','');

	}
	public function details(){
		$logfile = fopen("/tmp/checking-details.log", "a");
		fwrite($logfile, "\n_REQUEST: ".var_export($_REQUEST,true));
		fclose($logfile);
		$results = array();
		$StationId = getParam('id',1); 	
		$wherequery = " StationId = '".$StationId."'";

		$Station = M("checkdetails");
		$list = $Station -> where($wherequery)->select();
		$fields = $Station -> getDbFields();
		$size = count($fields);
		$i = 0;
		foreach($list as $l)
		{
			$j = 0;
			foreach($fields as $f)	
			{
				if($j == $size-1)
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
