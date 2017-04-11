namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_TownFlowStat : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.TownFlowStats", "SchedulingRank2", c => c.Double(nullable: false));
            AddColumn("dbo.TownFlowStats", "SchedulingTimes", c => c.Double(nullable: false));
            AddColumn("dbo.TownFlowStats", "RedirectCdma2000", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.TownFlowStats", "RedirectCdma2000");
            DropColumn("dbo.TownFlowStats", "SchedulingTimes");
            DropColumn("dbo.TownFlowStats", "SchedulingRank2");
        }
    }
}
