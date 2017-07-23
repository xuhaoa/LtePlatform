namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_Online_Sustain : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.ComplainProcesses", "CustomerType1");
            DropColumn("dbo.ComplainProcesses", "CustomerType2");
            DropColumn("dbo.ComplainProcesses", "CustomerType3");
            DropColumn("dbo.ComplainProcesses", "BscId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ComplainProcesses", "BscId", c => c.Byte());
            AddColumn("dbo.ComplainProcesses", "CustomerType3", c => c.Byte(nullable: false));
            AddColumn("dbo.ComplainProcesses", "CustomerType2", c => c.Byte(nullable: false));
            AddColumn("dbo.ComplainProcesses", "CustomerType1", c => c.Byte(nullable: false));
        }
    }
}
