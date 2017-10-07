<?php
header("content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin: *");
//require'fun.php';
include'fun.php';
class StationCommonAction extends Action
{
	
	public function index() {
	}
	//单个查询
	public function single(){
		$logfile = fopen("/tmp/stationcommon-single.log", "a");
		fwrite($logfile, "\n_REQUEST: ".var_export($_REQUEST,true));
		fclose($logfile);
		$results = array();
		$StationId = getParam('id',1); 	
		$wherequery = " id = '".$StationId."'";

		$Station = M("stationcommon");
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

	//更新站点
	public function update(){
		$Station=json_decode(getParam("Station",2), true);
		$StationId = $Station['id'];
		$wherequery = " id = '".$StationId."'";

		$tablename = 'stationcommon';
		$stationModel = new Model($tablename); // 实例化模型类

		if($stationModel->where($wherequery)->save($Station) == 1)
			echo getResponse();
		else
			echo getErrMsg3('更新失败!');
	}	

	//添加站点
	public function add(){
		$Station=json_decode(getParam("Station",2), true);
		$tablename = 'stationcommon';
		$stationModel = new Model($tablename); // 实例化模型类
		if($stationModel->add($Station) == 1)
			echo getResponse();
		else
			echo getErrMsg3('插入失败,数据已存在!');
	}	

	//删除站点
	public function delete(){
		$idList = getParam('idList',1);//每页个数
		$wherequery = " id in ('".str_replace(",","','",$idList)."')";
		$tablename = 'stationcommon';
		$stationModel = new Model($tablename); // 实例化模型类
		
		if($stationModel->where($wherequery)->delete() >  0)
			echo getResponse();
		else
			echo getErrMsg3('删除失败,数据不存在!');
	}	
		
	//列表查询
	public function search(){
		$logfile = fopen("/tmp/stationcommon-search.log", "a");
		fwrite($logfile, "\n_REQUEST: ".var_export($_REQUEST,true));
		fclose($logfile);
		$results = array();
		$page_size = getParam('page_size',0);//每页个数
		$curr_page = getParam('curr_page',0);//第几页
		$type = getParam('type',1);//站点类型
		$stationName = getParam('stationName',1);
		$areaName = tranToCityCode(getParam('areaName',1));

		if($curr_page == NULL || $curr_page == '' || $curr_page <= 0)
			$curr_page = 1;

		$wherequery = ' 1 = 1   ';

		if($page_size == NULL && $page_size == '')
		{
			$page_size = 30;
		}

		if($stationName != NULL && $stationName != '')
		{
			$wherequery .= " and name like '%".$stationName."%'";	
		}

		if($areaName != NULL && $areaName != '' && $areaName != 'FS')
		{
			$wherequery .= " and id like '".$areaName."%'";	
		}
		if($type != NULL && $type != '')
		{
			$wherequery .= " and id like '%".$type."%'";	
		}
		$Station = M("stationcommon");

		$total = $Station->where($wherequery)->count(); // 查询数据
		if( $total >0 ){
			$total_pages = ceil($total/$page_size);
		}else{
			$total_pages = 0;
		}

		if ($curr_page > $total_pages) 
			$curr_page=$total_pages;
		$start = $page_size * $curr_page - $page_size; //开始位置

		$list = $Station -> where($wherequery)->limit($start.','.$page_size)->select();

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
				$result['index'] = $i + 1;
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

	//数据下载
	public function download(){
		$type = getParam('type',1);//站点类型
		$wherequery = ' 1 = 1   ';
		if($type != NULL && $type != '')
		{
			$wherequery .= " and id like '%".$type."%'";	
		}
		$Station = M("stationcommon")->where($wherequery);
		$datestr = date("YmdHis");
		if($type == 'JZ'){
			$filename = 'LTE基站数据'.$datestr;	
		}else if($type == 'SF'){
			$filename = 'LTE室分数据'.$datestr;	
		}else{
			$filename = 'LTE基础数据'.$datestr;			
		}
		$list = $Station->select(); // 查询数据
		$fields = $Station -> getDbFields();
		$size = count($fields);

		$out = '';
		$out = '<table class="data_table"><tr><th>编号</th><th>站名</th><th>地址</th><th>经度</th><th>纬度</th>><th>状态[在网、关停、拆除....]</th></tr>';
		foreach($list as $l)
		{
			$out .= '<tr>';
			$j = 0;
			foreach($fields as $f)	
			{

				if($j == $size-2)
					break;
				//$result[$f] = urlencode($l[$f]); //编码
				$result[$f] = $l[$f]; //编码
				$out.='<td>'.$result[$f].'</td>';
				$j++;
			}
			$out .= '</tr>';
		}
		$out.= '</table>';
		header("Content-Type: application/vnd.ms-excel; charset=UTF-8");
		header("Content-Disposition:filename=$filename.xls");
		//$this->ajaxReturn($responce,'查询成功',0);
		//$this->assign('list',$list); // 模板变量赋值
		$out .= '</table>';
		echo "\xEF\xBB\xBF";
		echo $out;
		exit;
	}
	public function generateId(){
		$type = getParam('type',1);//站点类型
		$distinct = getParam('distinct',1);//站点类型
		$logfile = fopen("/tmp/stationcommon-generateId.log", "a");
		fwrite($logfile, "\n_REQUEST: ".var_export($_REQUEST,true));
		fclose($logfile);
		$wherequery = ' 1 = 1   ';
		if($type != NULL && $type != '')
		{
			$wherequery .= " and id like '%".$type."%'";	
		}
		if($distinct != NULL && $distinct != '')
		{
			$wherequery .= " and id like '".$distinct."%'";	
		}
		$id = M("stationcommon")->where($wherequery)->Max(id);
		$results = $distinct.$type.strval(intval(substr($id,-4))+1);	
			

		/*
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
				$result[$f] = urlencode($l[$f]);
				$j++;
			}
			$results[$i] = $result;
			$i++;
				
		}
		*/
		echo getResponse($results,'','','');
					
	}

	public function upload(){
			
	}
	public function show()
	{
		Log::Write(json_encode($_GET),Log::DEBUG,'');
		$this->display(); // 输出模板
	}
}
?>
