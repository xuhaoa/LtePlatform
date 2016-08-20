using Abp.EntityFramework.AutoMapper;
using Abp.Reflection;
using AutoMapper;
using Lte.Evaluations.Policy;
using Lte.Parameters.Entities.Work;
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

            Mapper.CreateMap(typeof(WorkItemExcel), typeof(WorkItem)).ConvertUsing<WorkItemConverter>();

            BaiduMapperService.MapCdmaCellView();
            BaiduMapperService.MapCellView();
        }
    }
}
