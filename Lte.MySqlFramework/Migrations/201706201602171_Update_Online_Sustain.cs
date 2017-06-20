namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_Online_Sustain : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ComplainProcesses", "ComplainState", c => c.Byte(nullable: false));
            AddColumn("dbo.ComplainProcesses", "PlanStation", c => c.String(unicode: false));
            AddColumn("dbo.ComplainProcesses", "MainCause", c => c.Byte(nullable: false));
            AddColumn("dbo.ComplainProcesses", "SubCause", c => c.Byte(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ComplainProcesses", "SubCause");
            DropColumn("dbo.ComplainProcesses", "MainCause");
            DropColumn("dbo.ComplainProcesses", "PlanStation");
            DropColumn("dbo.ComplainProcesses", "ComplainState");
        }
    }
}
