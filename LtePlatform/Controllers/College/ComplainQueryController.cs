using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Lte.Evaluations.DataService.College;
using Lte.MySqlFramework.Entities;
using LtePlatform.Models;

namespace LtePlatform.Controllers.College
{
    [ApiControl("���Ͷ�߹���������ѯ������")]
    [Cors("http://132.110.60.94:2018", "http://218.13.12.242:2018")]
    public class ComplainQueryController : ApiController
    {
        private readonly ComplainService _service;

        public ComplainQueryController(ComplainService service)
        {
            _service = service;
        }

        [HttpGet]
        [ApiDoc("��ѯ���ڷ�Χ�ڵĺ��Ͷ�߹�����ͼ")]
        [ApiParameterDoc("begin", "��ʼ����")]
        [ApiParameterDoc("end", "��������")]
        [ApiResponse("���ڷ�Χ�ڵĺ��Ͷ�߹�����ͼ")]
        public List<ComplainDto> Get(DateTime begin, DateTime end)
        {
            return _service.Query(begin, end);
        }

        [HttpGet]
        [ApiDoc("��ѯ��ʼ����ǰ�����һ����Ͷ�߹�����ͼ")]
        [ApiParameterDoc("statDate", "��ʼ����")]
        [ApiResponse("���һ����Ͷ�߹�����ͼ")]
        public List<ComplainDto> Get(DateTime statDate, string district)
        {
            var end = statDate.AddDays(1);
            return _service.QueryDate(statDate, end, district);
        }

        [HttpGet]
        public List<ComplainDto> Get(DateTime beginDate, DateTime endDate, string district)
        {
            return _service.QueryDate(beginDate.Date, endDate.Date, district);
        }

        [HttpGet]
        [ApiDoc("���չ��������ѯͶ�߹�����ͼ")]
        [ApiParameterDoc("serialNumber", "��������")]
        [ApiResponse("Ͷ�߹�����ͼ")]
        public ComplainDto Get(string serialNumber)
        {
            return _service.Query(serialNumber);
        }
        
        [HttpPut]
        [ApiDoc("����Ͷ�߹�����Ϣ")]
        [ApiParameterDoc("dto", "Ͷ�߹�����ͼ")]
        [ApiResponse("���½��")]
        public async Task<int> Put(ComplainDto dto)
        {
            return await _service.UpdateAsync(dto);
        }

        [HttpGet]
        [ApiDoc("��ѯָ��������ָ�����ڵ�ǰһ���µ��ں��Ͷ�߹���")]
        [ApiParameterDoc("today", "ָ������")]
        [ApiParameterDoc("city", "����")]
        [ApiParameterDoc("district", "����")]
        [ApiResponse("ָ��������ָ�����ڵ�ǰһ���µĺ��Ͷ�߹���")]
        public IEnumerable<ComplainDto> Get(DateTime today, string city, string district)
        {
            return _service.QueryList(today, city, district);
        }
    }
}