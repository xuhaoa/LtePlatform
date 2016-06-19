namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_Flow : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.FlowHuaweis", "SchedulingRank1", c => c.Int(nullable: false));
            AddColumn("dbo.FlowHuaweis", "SchedulingRank2", c => c.Int(nullable: false));
            AddColumn("dbo.FlowZtes", "SchedulingTm3", c => c.Int(nullable: false));
            AddColumn("dbo.FlowZtes", "SchedulingTm3Rank2", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.FlowZtes", "SchedulingTm3Rank2");
            DropColumn("dbo.FlowZtes", "SchedulingTm3");
            DropColumn("dbo.FlowHuaweis", "SchedulingRank2");
            DropColumn("dbo.FlowHuaweis", "SchedulingRank1");
        }
    }
}
