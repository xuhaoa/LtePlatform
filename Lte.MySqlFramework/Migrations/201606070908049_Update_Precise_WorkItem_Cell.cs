namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_Precise_WorkItem_Cell : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PreciseWorkItemCells", "BackwardDb6Share", c => c.Double(nullable: false));
            AddColumn("dbo.PreciseWorkItemCells", "BackwardDb10Share", c => c.Double(nullable: false));
            AddColumn("dbo.PreciseWorkItemCells", "Mod6Share", c => c.Double(nullable: false));
            AddColumn("dbo.PreciseWorkItemCells", "BackwardMod3Share", c => c.Double(nullable: false));
            AddColumn("dbo.PreciseWorkItemCells", "BackwardMod6Share", c => c.Double(nullable: false));
            AddColumn("dbo.PreciseWorkItemCells", "OverCoverageRate", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.PreciseWorkItemCells", "OverCoverageRate");
            DropColumn("dbo.PreciseWorkItemCells", "BackwardMod6Share");
            DropColumn("dbo.PreciseWorkItemCells", "BackwardMod3Share");
            DropColumn("dbo.PreciseWorkItemCells", "Mod6Share");
            DropColumn("dbo.PreciseWorkItemCells", "BackwardDb10Share");
            DropColumn("dbo.PreciseWorkItemCells", "BackwardDb6Share");
        }
    }
}
