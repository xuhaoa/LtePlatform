<?php
header("Access-Control-Allow-Origin: *");
header("content-Type: text/html; charset=utf-8");
//require'fun.php';
include'fun.php';
class StationAction extends Action
{
	
	public function index() {
	}
	//单个查询
	public function single(){
		$results = array();
		$StationId = getParam('id',1); 	
		$tablename = 'station';
		$wherequery = " StationId = '".$StationId."'";

		$Station = M("station");
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
				$result[$f] = urlencode($l[$f]);
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
		$StationId = $Station['StationId'];
		$wherequery = " StationId = '".$StationId."'";

		$tablename = 'station';
		$stationModel = new Model($tablename); // 实例化模型类

		if($stationModel->where($wherequery)->save($Station) == 1)
			echo getResponse();
		else
			echo getErrMsg3('更新失败!');
	}	

	//添加站点
	public function add(){
		$Station=json_decode(getParam("Station",2), true);
		$tablename = 'station';
		$stationModel = new Model($tablename); // 实例化模型类
		if($stationModel->add($Station) == 1)
			echo getResponse();
		else
			echo getErrMsg3('插入失败,数据已存在!');
	}	

	//删除站点
	public function delete(){
		$idList = getParam('idList',1);//每页个数
		$wherequery = " StationId in ('".str_replace(",","','",$idList)."')";
		$tablename = 'station';
		$stationModel = new Model($tablename); // 实例化模型类
		
		if($stationModel->where($wherequery)->delete() >  0)
			echo getResponse();
		else
			echo getErrMsg3('删除失败,数据不存在!');
	}	
		
	//列表查询
	public function search_old(){
		$results = array();
		$page_size = getParam('page_size',0);//每页个数
		$curr_page = getParam('curr_page',0);//第几页

		if($curr_page == NULL || $curr_page == '' || $curr_page <= 0)
			$curr_page = 1;

		$wherequery = ' 1 = 1   ';

		if($curr_page == NULL || $curr_page == '')
		{
			$page_size = 30;
		}

		$Station = M("station");

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
				$result[$f] = urlencode($l[$f]); //编码
				$j++;
			}
			$results[$i] = $result;
			$i++;
		}

		$total = $count;
		$responce['curr_page'] = $curr_page;
		$responce['total_pages'] = $total_pages;
		$responce['records'] = $count;
		$responce['rows'] = $results;
		echo getResponse($responce,'','','');
	}

	//数据下载
	public function download(){
		$Station = M("station");
		$datestr = date("YmdHis");
		$filename = 'LTE基础数据'.$datestr;			
		$list = $Station->select(); // 查询数据
		$fields = $Station -> getDbFields();
		$size = count($fields);

		$out = '';
		$out = '<table class="data_table"><tr><th>站址编号</th><th>站名</th><th>网格名称</th><th>所属区域</th><th>机房（安装点）名称</th><th>站址类型</th><th>资源系统站址编号</th><th>安装地址</th><th>经度</th><th>纬度</th><th>机房归属</th><th>新建还是存量(如归属铁塔请补充是新建还是存量)</th><th>铁塔站址编码</th><th>铁塔类型</th><th>铁塔高度</th><th>铁塔归属</th><th>新建还是存量(如归属铁塔请补充是新建还是存量)</th><th>属地性质</th><th>是否简易机房</th><th>是否高危站点</th><th>网络类型C/L/VL/C+L/C+VL/L+VL/C+L</th><th>CL网是否共用天线</th><th>交维日期</th></tr>';
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

	public function show()
	{
		Log::Write(json_encode($_GET),Log::DEBUG,'');
		$this->display(); // 输出模板
	}
}
?>
