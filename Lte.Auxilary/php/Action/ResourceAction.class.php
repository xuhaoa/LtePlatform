<?php
header("content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin: *");
//require'fun.php';
include'fun.php';
class ResourceAction extends Action
{
	
	public function index() {
	}
	//单个查询
	public function single(){
		$logfile = fopen("/tmp/resource-single.log", "a");
		fwrite($logfile, "\n_REQUEST: ".var_export($_REQUEST,true));
		fclose($logfile);
		$results = array();
		$StationId = getParam('id',1); 	
		$tablename = getParam('table',1); 	
		$wherequery = " StationId = '".$StationId."'";

		$Station = M($tablename);
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
	public function counter(){
		$StationId = getParam('id',1); 	
		$wherequery = " StationId = '".$StationId."'";
		$tablenames = array('crru','cjz','csf','czf','ljz','lrru');

		foreach($tablenames as $tablename)
		{
			$Station = M($tablename);
			$results[$tablename] = $Station -> where($wherequery)->count();
		}
		echo getResponse($results,'','','');
	}

		
	//列表查询
	public function search(){
		$results = array();
		$page_size = getParam('page_size',0);//每页个数
		$curr_page = getParam('curr_page',0);//第几页
		$stationName = getParam('stationName',1);
		$areaName = getParam('areaName',1);
		$type = getParam('type',1);

		if($curr_page == NULL || $curr_page == '' || $curr_page <= 0)
			$curr_page = 1;

		$wherequery = ' tbs.id = tbr.stationid ';

		if($page_size == NULL || $page_size == '')
		{
			$page_size = 30;
		}

		if($stationName != NULL || $stationName != '')
		{
			$wherequery .= " and Name like '%".$stationName."%'";	
		}

		if($areaName != NULL && $areaName != '')
		{
			$wherequery .= " and id like '".$areaName."%'";	
		}

		if($type != NULL && $type != '')
		{
			$wherequery .= " and id like '%".$type."%'";	
		}

		$Station = M("stationcommon");

		$total = $Station->table('tb_stationcommon tbs,tb_resource tbr')->where($wherequery)->count(); // 查询数据
		if( $total >0 ){
			$total_pages = ceil($total/$page_size);
		}else{
			$total_pages = 0;
		}

		if ($curr_page > $total_pages) 
			$curr_page=$total_pages;
		$start = $page_size * $curr_page - $page_size; //开始位置

		$list = $Station->table('tb_stationcommon tbs,tb_resource tbr')->where($wherequery)->limit($start.','.$page_size)->select();

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

}
?>
