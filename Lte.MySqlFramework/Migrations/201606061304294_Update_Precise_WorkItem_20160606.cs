namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_Precise_WorkItem_20160606 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PreciseWorkItemCells", "WorkItemNumber", c => c.String(unicode: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.PreciseWorkItemCells", "WorkItemNumber");
        }
    }
}
