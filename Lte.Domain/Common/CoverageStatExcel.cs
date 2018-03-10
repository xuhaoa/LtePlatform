using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Lte.Domain.Common.Wireless;
using Lte.Domain.Regular;
using Lte.Domain.Regular.Attributes;

namespace Lte.Domain.Common
{
    public class CoverageStatExcel: ILteCellQuery
    {
        [ExcelColumn("行主键")]
        public string MainKey { get; set; }
        
        public DateTime StatDate => MainKey.GetDateFromFileName() ?? DateTime.Today;

        [ExcelColumn("基站标识")]
        public int ENodebId { get; set; }

        [ExcelColumn("小区标识")]
        public byte SectorId { get; set; }

        [ExcelColumn("电信RSRP非空数量")]
        public int TelecomMrs { get; set; }

        [ExcelColumn("联通RSRP非空数量")]
        public int UnicomMrs { get; set; }

        [ExcelColumn("移动RSRP非空数量")]
        public int MobileMrs { get; set; }

        [ExcelColumn("电信RSRP大于-110数量")]
        public int TelecomAbove110 { get; set; }

        [ExcelColumn("移动RSRP大于-110数量")]
        public int MobileAbove110 { get; set; }

        [ExcelColumn("联通RSRP大于-110数量")]
        public int UnicomAbove110 { get; set; }

        [ExcelColumn("电信RSRP大于等于-105且小于0的记录数")]
        public int TelecomAbove105 { get; set; }

        [ExcelColumn("移动RSRP大于等于-105且小于0的记录数")]
        public int MobileAbove105 { get; set; }

        [ExcelColumn("联通RSRP大于等于-105且小于0的记录数")]
        public int UnicomAbove105 { get; set; }

        [ExcelColumn("电信RSRP大于等于-115且小于0的记录数")]
        public int TelecomAbove115 { get; set; }

        [ExcelColumn("移动RSRP大于等于-115且小于0的记录数")]
        public int MobileAbove115 { get; set; }

        [ExcelColumn("联通RSRP大于等于-115且小于0的记录数")]
        public int UnicomAbove115 { get; set; }

        [ExcelColumn("电信RSRP之和")]
        public double TelecomSum { get; set; }

        [ExcelColumn("移动RSRP之和")]
        public double MobileSum { get; set; }

        [ExcelColumn("联通RSRP之和")]
        public double UnicomSum { get; set; }

        [ExcelColumn("电信RSRP大于-110之和")]
        public double TelecomSumAbove110 { get; set; }

        [ExcelColumn("移动RSRP大于-110之和")]
        public double MobileSumAbove110 { get; set; }

        [ExcelColumn("联通RSRP大于-110之和")]
        public double UnicomSumAbove110 { get; set; }
    }
}
