using System;
using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.Dt
{
    [ApiControl("��������ļ���Ϣ��ѯ������")]
    public class RasterFileController : ApiController
    {
        private readonly RasterInfoService _service;

        public RasterFileController(RasterInfoService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("��ѯ����ָ���������ͺ����귶Χ����������Ĳ����ļ���Ϣ")]
        [ApiParameterDoc("dataType", "ָ���������ͣ�2G��3G��4G��")]
        [ApiParameterDoc("west", "��������")]
        [ApiParameterDoc("east", "���궫��")]
        [ApiParameterDoc("south", "�����Ͻ�")]
        [ApiParameterDoc("north", "���걱��")]
        [ApiResponse("����ָ���������͵���������Ĳ����ļ���Ϣ��ͼ�����������ļ���źͰ������������б�")]
        public IEnumerable<FileRasterInfoView> Get(string dataType, double west, double east, double south,
            double north)
        {
            return _service.QueryFileNames(dataType, west, east, south, north);
        }

        [HttpGet]
        [ApiDoc("��ѯ����ָ���������ͺ����귶Χ����������Ĳ����ļ���Ϣ")]
        [ApiParameterDoc("dataType", "ָ���������ͣ�2G��3G��4G��")]
        [ApiParameterDoc("west", "��������")]
        [ApiParameterDoc("east", "���궫��")]
        [ApiParameterDoc("south", "�����Ͻ�")]
        [ApiParameterDoc("north", "���걱��")]
        [ApiParameterDoc("begin", "��ʼ����")]
        [ApiParameterDoc("end", "��������")]
        [ApiResponse("����ָ���������͵���������Ĳ����ļ���Ϣ��ͼ�����������ļ���źͰ������������б�")]
        public IEnumerable<FileRasterInfoView> Get(string dataType, double west, double east, double south,
            double north, DateTime begin, DateTime end)
        {
            return _service.QueryFileNames(dataType, west, east, south, north, begin, end);
        }

        [HttpGet]
        [ApiDoc("��ѯ����ָ���������ͺ����������ڷ�Χ�ڵĲ����ļ���Ϣ")]
        [ApiParameterDoc("dataType", "ָ���������ͣ�2G��3G��4G��")]
        [ApiParameterDoc("townName", "��������")]
        [ApiParameterDoc("begin", "��ʼ����")]
        [ApiParameterDoc("end", "��������")]
        [ApiResponse("����ָ���������͵����ڷ�Χ�ڵĲ����ļ���Ϣ��ͼ�����������ļ���źͰ������������б�")]
        public IEnumerable<FileRasterInfoView> Get(string dataType, string townName, DateTime begin, DateTime end)
        {
            return _service.QueryFileNames(dataType, townName, begin, end);
        }

        [HttpGet]
        [ApiDoc("��ѯ����ָ���������ͺ���������������Ĳ����ļ���Ϣ")]
        [ApiParameterDoc("dataType", "ָ���������ͣ�2G��3G��4G��")]
        [ApiParameterDoc("townName", "��������")]
        [ApiResponse("����ָ���������͵���������Ĳ����ļ���Ϣ��ͼ�����������ļ���źͰ������������б�")]
        public IEnumerable<FileRasterInfoView> Get(string dataType, string townName)
        {
            return _service.QueryFileNames(dataType, townName);
        }

        [HttpGet]
        [ApiDoc("��ѯ����ָ�����ڷ�Χ�ڵĲ����ļ���Ϣ")]
        [ApiParameterDoc("begin", "��ʼ����")]
        [ApiParameterDoc("end", "��������")]
        [ApiResponse("����ָ�����ڷ�Χ�ڵĲ����ļ���Ϣ")]
        public IEnumerable<CsvFilesInfo> Get(DateTime begin, DateTime end)
        {
            return _service.QueryFileNames(begin, end);
        }

        [HttpGet]
        public string Get(string csvFileName)
        {
            return _service.QueryNetworkType(csvFileName);
        }

        [HttpGet]
        [ApiDoc("������API")]
        public IEnumerable<RasterInfo> Get()
        {
            return _service.GetAllList();
        } 
    }
}