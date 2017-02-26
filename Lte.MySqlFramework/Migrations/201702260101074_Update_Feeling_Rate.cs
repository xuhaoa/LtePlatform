namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_Feeling_Rate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.TownFlowStats", "DownlinkFeelingThroughput", c => c.Double(nullable: false));
            AddColumn("dbo.TownFlowStats", "DownlinkFeelingDuration", c => c.Double(nullable: false));
            AddColumn("dbo.TownFlowStats", "UplinkFeelingThroughput", c => c.Double(nullable: false));
            AddColumn("dbo.TownFlowStats", "UplinkFeelingDuration", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.TownFlowStats", "UplinkFeelingDuration");
            DropColumn("dbo.TownFlowStats", "UplinkFeelingThroughput");
            DropColumn("dbo.TownFlowStats", "DownlinkFeelingDuration");
            DropColumn("dbo.TownFlowStats", "DownlinkFeelingThroughput");
        }
    }
}
