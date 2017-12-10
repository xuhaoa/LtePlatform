namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Change_Agps_To_Kpi : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.MonthKpiStats",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StatDate = c.DateTime(nullable: false, precision: 0),
                        District = c.String(unicode: false),
                        AlarmWorkItemRate = c.Double(nullable: false),
                        AlarmProcessRate = c.Double(nullable: false),
                        MaintainProjectRate = c.Double(nullable: false),
                        AverageAlarms = c.Double(nullable: false),
                        TotalComplains = c.Int(nullable: false),
                        YuejiComplainRate = c.Double(nullable: false),
                        PreciseRate = c.Double(nullable: false),
                        Drop2GRate = c.Double(nullable: false),
                        FlowRate4GTo3G = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            DropTable("dbo.AgpsCoverageTowns");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.AgpsCoverageTowns",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StatDate = c.DateTime(nullable: false, precision: 0),
                        District = c.String(unicode: false),
                        Town = c.String(unicode: false),
                        Operator = c.String(unicode: false),
                        Rsrp = c.Int(nullable: false),
                        Count = c.Int(nullable: false),
                        GoodCount = c.Int(nullable: false),
                        GoodCount105 = c.Int(nullable: false),
                        GoodCount100 = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            DropTable("dbo.MonthKpiStats");
        }
    }
}
