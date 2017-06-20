namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_Online_Sustain1 : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.ComplainProcesses", "PlanStation");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ComplainProcesses", "PlanStation", c => c.String(unicode: false));
        }
    }
}
