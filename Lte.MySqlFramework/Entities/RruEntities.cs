using Abp.Domain.Entities;
using Abp.EntityFramework.AutoMapper;
using Lte.Domain.Common;
using Lte.Domain.Common.Wireless;

namespace Lte.MySqlFramework.Entities
{
    [AutoMapFrom(typeof(CdmaCellExcel))]
    public class CdmaRru : Entity
    {
        public int BtsId { get; set; }

        public byte SectorId { get; set; }

        public byte TrmId { get; set; }

        public string RruName { get; set; }
    }

    [AutoMapFrom(typeof(CellExcel))]
    public class LteRru : Entity
    {
        public int ENodebId { get; set; }

        public byte LocalSectorId { get; set; }

        public string RruName { get; set; }

        public string AntennaInfo { get; set; }

        [AutoMapPropertyResolve("AntennaFactoryString", typeof(CellExcel), typeof(AntennaFactoryTransform))]
        public AntennaFactory AntennaFactory { get; set; }

        public string AntennaModel { get; set; }

        [AutoMapPropertyResolve("CanBeETiltDescription", typeof(CellExcel), typeof(YesToBoolTransform))]
        public bool CanBeTilt { get; set; }

        [AutoMapPropertyResolve("IsBeautifyDescription", typeof(CellExcel), typeof(YesToBoolTransform))]
        public string IsBeautify { get; set; }

        [AutoMapPropertyResolve("IsCaDescription", typeof(CellExcel), typeof(YesToBoolTransform))]
        public string IsCa { get; set; }
    }
}
