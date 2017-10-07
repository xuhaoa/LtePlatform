<?php
header("content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin: *");
//require'fun.php';
include'fun.php';
class FixingAction extends Action
{
	
	public function index() {
	}
		
	//列表查询
	public function search(){
		$logfile = fopen("/tmp/fixing-search.log", "a");
		fwrite($logfile, "\n_REQUEST: ".var_export($_REQUEST,true));
		fclose($logfile);
		$results = array();
		$page_size = getParam('page_size',0);//每页个数
		$curr_page = getParam('curr_page',0);//第几页
		$areaName = getParam('areaName',1);//第几页
		$level = getParam('level',1);//第几页
		$type = getParam('type',1);//第几页
		$stationName = getParam('stationName',1);//第几页

		if($curr_page == NULL || $curr_page == '' || $curr_page <= 0)
			$curr_page = 1;

		$wherequery = ' tbs.id = tbf.stationid ';

		if($areaName != NULL && $areaName != '' && $areaName != 'FS')
		{
			$wherequery .= " and id like '".$areaName."%'";	
		}
		if($type != NULL && $type != '')
		{
			$wherequery .= " and id like '%".$type."%'";	
		}

		if($level != NULL && $level != '')
		{
			$wherequery .= " and level ='".$level."'";	
		}
		if($stationName != NULL && $stationName != '')
		{
			$wherequery .= " and tbs.name like '%".$stationName."%'";	
		}

		if($page_size == NULL &&  $page_size == '')

		{
			$page_size = 30;
		}


		$Station = M("stationcommon");
		$total = $Station->table('tb_stationcommon tbs,tb_fixdetails tbf')->where($wherequery)->count(); // 查询数据
		if( $total >0 ){
			$total_pages = ceil($total/$page_size);
		}else{
			$total_pages = 0;
		}

		if ($curr_page > $total_pages) 
			$curr_page=$total_pages;

		$start = $page_size * $curr_page - $page_size; //开始位置

		$list = $Station->table('tb_stationcommon tbs,tb_fixdetails tbf')->where($wherequery)->limit($start.','.$page_size)->select();

		$fields = $Station -> getDbFields();
		$size = count($fields);
		$i = 0;
		foreach($list as $l)
		{
			$result['index'] = $i + 1;
			$j = 0;
			foreach($fields as $f)	
			{
				if($j == $size-1)
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
		$logfile = fopen("/tmp/fixing-search.log", "a");
                fwrite($logfile, "\n_RESULT: ".getResponse($responce,'','',''));
                fclose($logfile);
	}

	public function single(){
		$logfile = fopen("/tmp/fixing-single.log", "a");
		fwrite($logfile, "\n_REQUEST: ".var_export($_REQUEST,true));
		fclose($logfile);
		$id = getParam('id',1);//站址ID
		$wherequery = ' 1 = 1   ';
		if($id != NULL || $id != '')
		{
			$wherequery .= " and stationid = '".$id."'";	
		}
		$Fixdetails = M("fixdetails");

		$list = $Fixdetails -> where($wherequery)->select();

		$fields = $Fixdetails -> getDbFields();
		$size = count($fields);
		$i = 0;
		foreach($list as $l)
		{
			$j = 0;
			foreach($fields as $f)	
			{
				if($j == $size-1)
					break;
				$result[$f] = urlencode(trim($l[$f])); //编码
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
