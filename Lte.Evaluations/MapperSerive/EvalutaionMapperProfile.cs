using Abp.EntityFramework.AutoMapper;
using Abp.Reflection;
using AutoMapper;
using Lte.Evaluations.Policy;
using Lte.MySqlFramework.Abstract;
using Lte.Parameters.MockOperations;

namespace Lte.Evaluations.MapperSerive
{
    public class EvalutaionMapperProfile : Profile
    {
        private readonly ITypeFinder _typeFinder = new TypeFinder(new MyAssemblyFinder());

        protected override void Configure()
        {
            var module = new AbpAutoMapperModule(_typeFinder);
            module.PostInitialize();

            InfrastructureMapperService.MapCdmaCell();
            InfrastructureMapperService.MapCell();
            InfrastructureMapperService.MapDumpConatainers();
            InfrastructureMapperService.MapCustomerEntities();

            KpiMapperService.MapCdmaRegionStat();
            KpiMapperService.MapDtItems();
            KpiMapperService.MapFlow();
            KpiMapperService.MapAlarmStat();
            KpiMapperService.MapTopKpi();
            KpiMapperService.MapPreciseStat();
            KpiMapperService.MapWorkItem();

            BaiduMapperService.MapCdmaCellView();
            BaiduMapperService.MapCellView();
            BaiduMapperService.MapDtViews();
        }
    }
}
