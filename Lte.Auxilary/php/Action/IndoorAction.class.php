<?php
header("content-Type: text/html; charset=utf-8");
header("Access-Control-Allow-Origin: *");
//require'fun.php';
include'fun.php';
class IndoorAction extends Action
{
	
	public function index() {
	}
	//单个查询
	public function single(){
		$results = array();
		$StationId = getParam('id',1); 	
		$wherequery = " Stationid = '".$StationId."'";
		$Station = M("indoor");
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
			$results[$I] = $result;
			$i++;
				
		}
		echo getResponse($results,'','','');
	}

	//更新站点
	public function update(){
		$Station=json_decode(getParam("Indoor",2), true);
		$StationId = $Station['id'];
		$wherequery = " id = '".$StationId."'";
		$tablename = 'indoor';
		$stationModel = new Model($tablename); // 实例化模型类

		if($stationModel->where($wherequery)->save($Station) == 1)
			echo getResponse();
		else
			echo getErrMsg3('更新失败!');
	}	

	//添加站点
	public function add(){
		$Station=json_decode(getParam("Indoor",2), true);
		$tablename = 'indoor';
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
		$tablename = 'indoor';
		$stationModel = new Model($tablename); // 实例化模型类
		
		if($stationModel->where($wherequery)->delete() >  0)
			echo getResponse();
		else
			echo getErrMsg3('删除失败,数据不存在!');
	}	
		
	//列表查询
	public function search(){
		$logfile = fopen("/tmp/indoor-search.log", "a");
		fwrite($logfile, "\n_REQUEST: ".var_export($_REQUEST,true));
		fclose($logfile);
		$results = array();
		$page_size = getParam('page_size',0);//每页个数
		$curr_page = getParam('curr_page',0);//第几页
		$stationName = getParam('name',1);
		$areaName = tranToCityCode(getParam('areaName',1));
		$netType = getParam('netType',1);
		$stationGrade = getParam('stationGrade',1);
		$isNew = getParam('isNew',1);
		$indoortype = getParam('indoortype',1);
		$coverage = getParam('coverage',1);
		$stationName = getParam('stationName',1);

		if($curr_page == NULL || $curr_page == '' || $curr_page <= 0)
			$curr_page = 1;

		$wherequery = ' tbc.id = tbi.stationid ';

		if($page_size == NULL || $page_size == '')
		{
			$page_size = 30;
		}

		if($stationName != NULL && $stationName != '')
		{
			$wherequery .= " and tbc.name like '%".$stationName."%'";	
		}
		if($netType != NULL && $netType != '' && $netType != 'undefined' )
		{
			$wherequery .= " and netType ='".$netType."'";	
		}
		if($stationGrade != NULL && $stationGrade != '' && $stationGrade != 'undefined')
		{
			$wherequery .= " and grade ='".$stationGrade."'";	
		}
		if($isNew != NULL && $isNew != '' && $isNew != 'undefined')
		{
			$wherequery .= " and isNew ='".$isNew."'";	
		}
		if($indoortype != NULL && $indoortype != '' && $indoortype != 'undefined')
		{
			$wherequery .= " and indoortype ='".$indoortype."'";	
		}
		if($areaName != NULL && $areaName != '' && $areaName != 'FS')
		{
			$wherequery .= " and id like '".$areaName."%'";	
		}
		$Station = M("stationcommon");

		$total = $Station->table('tb_stationcommon tbc,tb_indoor tbi')->where($wherequery)->count(); // 查询数据
		if( $total >0 ){
			$total_pages = ceil($total/$page_size);
		}else{
			$total_pages = 0;
		}

		if ($curr_page > $total_pages) 
			$curr_page=$total_pages;
		$start = $page_size * $curr_page - $page_size; //开始位置

		$list = $Station->table('tb_stationcommon tbc,tb_indoor tbi')->where($wherequery)->limit($start.','.$page_size)->select();

		$fields = $Station -> getDbFields();
		$size = count($fields);
		$i = 0;
		foreach($list as $l)
		{
			$result['index'] = $i + 1;
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

	//数据下载
	public function download(){
		$Station = M("indoor");
		$datestr = date("YmdHis");
		$filename = 'LTE室分基础数据'.$datestr;			
		$list = $Station->select(); // 查询数据
		$fields = $Station -> getDbFields();
		$size = count($fields);

		$out = '';
		$out = '<table class="data_table"><tr><th>编号</th><th>区公司</th><th>镇区</th><th>站名</th><th>详细地址</th><th>是否新建站点</th><th>站点级别</th><th>站点类型</th><th>覆盖范围</th><th>网络类型</th><th>设备类型</th><th>设备数目</th><th>备注</th></tr>';
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

	public function upload(){
			
	}
	public function show()
	{
		Log::Write(json_encode($_GET),Log::DEBUG,'');
		$this->display(); // 输出模板
	}
}
?>
