using System;
using System.Collections.Generic;
using System.Web.Http;
using Lte.Evaluations.DataService.College;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [ApiControl("����֧�Ų�ѯ������")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class OnlineSustainController : ApiController
    {
        private readonly OnlineSustainService _service;

        public OnlineSustainController(OnlineSustainService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("��ѯָ�����ڷ�Χ�ڵ�����֧�ż�¼")]
        [ApiParameterDoc("begin", "��ʼ����")]
        [ApiParameterDoc("end", "��������")]
        [ApiResponse("ָ�����ڷ�Χ�ڵ�����֧�ż�¼")]
        public List<OnlineSustainDto> Get(DateTime begin, DateTime end)
        {
            return _service.QueryList(begin, end);
        }

        [HttpGet]
        [ApiDoc("��ѯָ�����ڵ�ǰһ���µ�����֧�ż�¼")]
        [ApiParameterDoc("today", "ָ������")]
        [ApiResponse("ָ�����ڵ�ǰһ���µ�����֧�ż�¼")]
        public IEnumerable<OnlineSustainDto> Get(DateTime today)
        {
            return _service.QueryList(today);
        }

        [HttpGet]
        [ApiDoc("��ѯָ��������ָ�����ڵ�ǰһ���µ�����֧�ż�¼")]
        [ApiParameterDoc("today", "ָ������")]
        [ApiParameterDoc("city", "����")]
        [ApiParameterDoc("district", "����")]
        [ApiResponse("ָ��������ָ�����ڵ�ǰһ���µ�����֧�ż�¼")]
        public IEnumerable<OnlineSustainDto> Get(DateTime today, string city, string district)
        {
            return _service.QueryList(today, city, district);
        }

        [HttpGet]
        [ApiDoc("��ѯָ������Χ�ڵ�����֧�ż�¼")]
        [ApiParameterDoc("west", "���߾���")]
        [ApiParameterDoc("east", "���߾���")]
        [ApiParameterDoc("south", "�ϱ�γ��")]
        [ApiParameterDoc("north", "����γ��")]
        [ApiResponse("ָ������Χ�ڵ�����֧�ż�¼")]
        public IEnumerable<OnlineSustainDto> Get(double west, double east, double south, double north)
        {
            return _service.QueryList(west, east, south, north);
        } 
    }
}