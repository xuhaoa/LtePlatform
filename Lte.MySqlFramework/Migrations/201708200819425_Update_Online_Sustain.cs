namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_Online_Sustain : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ComplainProcesses", "WorkItemInfo", c => c.String(unicode: false));
            AddColumn("dbo.ComplainProcesses", "ComplainTime", c => c.DateTime(precision: 0));
            AddColumn("dbo.ComplainProcesses", "ReceiveTime", c => c.DateTime(precision: 0));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ComplainProcesses", "ReceiveTime");
            DropColumn("dbo.ComplainProcesses", "ComplainTime");
            DropColumn("dbo.ComplainProcesses", "WorkItemInfo");
        }
    }
}
