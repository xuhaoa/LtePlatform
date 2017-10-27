namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Prb_Stat : DbMigration
    {
        public override void Up()
        {
            //CreateTable(
            //    "dbo.PrbHuaweis",
            //    c => new
            //        {
            //            Id = c.Int(nullable: false, identity: true),
            //            ENodebId = c.Int(nullable: false),
            //            LocalCellId = c.Byte(nullable: false),
            //            SectorId = c.Byte(nullable: false),
            //            StatTime = c.DateTime(nullable: false, precision: 0),
            //            PdschPrbs = c.Double(nullable: false),
            //            DownlinkDtchPrbNumber = c.Double(nullable: false),
            //            PuschPrbs = c.Double(nullable: false),
            //            UplinkDtchPrbNumber = c.Double(nullable: false),
            //            DownlinkPrbSubframe = c.Int(nullable: false),
            //            UplinkPrbSubframe = c.Int(nullable: false),
            //            PdschUsageInterval0Seconds = c.Double(nullable: false),
            //            PdschUsageInterval10Seconds = c.Double(nullable: false),
            //            PdschUsageInterval20Seconds = c.Double(nullable: false),
            //            PdschUsageInterval30Seconds = c.Double(nullable: false),
            //            PdschUsageInterval40Seconds = c.Double(nullable: false),
            //            PdschUsageInterval50Seconds = c.Double(nullable: false),
            //            PdschUsageInterval60Seconds = c.Double(nullable: false),
            //            PdschUsageInterval70Seconds = c.Double(nullable: false),
            //            PdschUsageInterval80Seconds = c.Double(nullable: false),
            //            PdschUsageInterval90Seconds = c.Double(nullable: false),
            //            PuschUsageInterval0Seconds = c.Double(nullable: false),
            //            PuschUsageInterval10Seconds = c.Double(nullable: false),
            //            PuschUsageInterval20Seconds = c.Double(nullable: false),
            //            PuschUsageInterval30Seconds = c.Double(nullable: false),
            //            PuschUsageInterval40Seconds = c.Double(nullable: false),
            //            PuschUsageInterval50Seconds = c.Double(nullable: false),
            //            PuschUsageInterval60Seconds = c.Double(nullable: false),
            //            PuschUsageInterval70Seconds = c.Double(nullable: false),
            //            PuschUsageInterval80Seconds = c.Double(nullable: false),
            //            PuschUsageInterval90Seconds = c.Double(nullable: false),
            //        })
            //    .PrimaryKey(t => t.Id);
            
            //CreateTable(
            //    "dbo.PrbZtes",
            //    c => new
            //        {
            //            Id = c.Int(nullable: false, identity: true),
            //            ENodebId = c.Int(nullable: false),
            //            SectorId = c.Byte(nullable: false),
            //            StatTime = c.DateTime(nullable: false, precision: 0),
            //            PuschPrbs = c.Double(nullable: false),
            //            UplinkPrbSubframe = c.Int(nullable: false),
            //            PdschPrbs = c.Double(nullable: false),
            //            DownlinkPrbSubframe = c.Int(nullable: false),
            //            UplinkDtchPrbs = c.Double(nullable: false),
            //            DownlinkDtchPrbs = c.Double(nullable: false),
            //            PuschUsageInterval0Seconds = c.Double(nullable: false),
            //            PuschUsageInterval20Seconds = c.Double(nullable: false),
            //            PuschUsageInterval40Seconds = c.Double(nullable: false),
            //            PuschUsageInterval60Seconds = c.Double(nullable: false),
            //            PuschUsageInterval80Seconds = c.Double(nullable: false),
            //            PdschUsageInterval0Seconds = c.Double(nullable: false),
            //            PdschUsageInterval20Seconds = c.Double(nullable: false),
            //            PdschUsageInterval40Seconds = c.Double(nullable: false),
            //            PdschUsageInterval60Seconds = c.Double(nullable: false),
            //            PdschUsageInterval80Seconds = c.Double(nullable: false),
            //        })
            //    .PrimaryKey(t => t.Id);
            
            //CreateTable(
            //    "dbo.TownPrbStats",
            //    c => new
            //        {
            //            Id = c.Int(nullable: false, identity: true),
            //            TownId = c.Int(nullable: false),
            //            StatTime = c.DateTime(nullable: false, precision: 0),
            //            PdschPrbs = c.Double(nullable: false),
            //            DownlinkDtchPrbNumber = c.Double(nullable: false),
            //            PuschPrbs = c.Double(nullable: false),
            //            UplinkDtchPrbNumber = c.Double(nullable: false),
            //            DownlinkPrbSubframe = c.Int(nullable: false),
            //            UplinkPrbSubframe = c.Int(nullable: false),
            //            PdschUsageInterval0Seconds = c.Double(nullable: false),
            //            PdschUsageInterval10Seconds = c.Double(nullable: false),
            //            PdschUsageInterval20Seconds = c.Double(nullable: false),
            //            PdschUsageInterval30Seconds = c.Double(nullable: false),
            //            PdschUsageInterval40Seconds = c.Double(nullable: false),
            //            PdschUsageInterval50Seconds = c.Double(nullable: false),
            //            PdschUsageInterval60Seconds = c.Double(nullable: false),
            //            PdschUsageInterval70Seconds = c.Double(nullable: false),
            //            PdschUsageInterval80Seconds = c.Double(nullable: false),
            //            PdschUsageInterval90Seconds = c.Double(nullable: false),
            //            PuschUsageInterval0Seconds = c.Double(nullable: false),
            //            PuschUsageInterval10Seconds = c.Double(nullable: false),
            //            PuschUsageInterval20Seconds = c.Double(nullable: false),
            //            PuschUsageInterval30Seconds = c.Double(nullable: false),
            //            PuschUsageInterval40Seconds = c.Double(nullable: false),
            //            PuschUsageInterval50Seconds = c.Double(nullable: false),
            //            PuschUsageInterval60Seconds = c.Double(nullable: false),
            //            PuschUsageInterval70Seconds = c.Double(nullable: false),
            //            PuschUsageInterval80Seconds = c.Double(nullable: false),
            //            PuschUsageInterval90Seconds = c.Double(nullable: false),
            //        })
            //    .PrimaryKey(t => t.Id);
            
            //DropColumn("dbo.FlowHuaweis", "DownlinkAveragePrbs");
            //DropColumn("dbo.FlowHuaweis", "DownlinkDrbPbs");
            //DropColumn("dbo.FlowHuaweis", "UplinkAveragePrbs");
            //DropColumn("dbo.FlowHuaweis", "UplinkDrbPbs");
        }
        
        public override void Down()
        {
            AddColumn("dbo.FlowHuaweis", "UplinkDrbPbs", c => c.Double(nullable: false));
            AddColumn("dbo.FlowHuaweis", "UplinkAveragePrbs", c => c.Double(nullable: false));
            AddColumn("dbo.FlowHuaweis", "DownlinkDrbPbs", c => c.Double(nullable: false));
            AddColumn("dbo.FlowHuaweis", "DownlinkAveragePrbs", c => c.Double(nullable: false));
            DropTable("dbo.TownPrbStats");
            DropTable("dbo.PrbZtes");
            DropTable("dbo.PrbHuaweis");
        }
    }
}
