namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_Some_Entities : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BranchDemands", "SerialNumber", c => c.String(unicode: false));
            AddColumn("dbo.BranchDemands", "SubscriberInfo", c => c.String(unicode: false));
            AddColumn("dbo.BranchDemands", "ManagerInfo", c => c.String(unicode: false));
            AddColumn("dbo.OnlineSustains", "ContactPhone", c => c.String(unicode: false));
            AddColumn("dbo.OnlineSustains", "StaffId", c => c.Int(nullable: false));
            AddColumn("dbo.OnlineSustains", "Phenomenon", c => c.String(unicode: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.OnlineSustains", "Phenomenon");
            DropColumn("dbo.OnlineSustains", "StaffId");
            DropColumn("dbo.OnlineSustains", "ContactPhone");
            DropColumn("dbo.BranchDemands", "ManagerInfo");
            DropColumn("dbo.BranchDemands", "SubscriberInfo");
            DropColumn("dbo.BranchDemands", "SerialNumber");
        }
    }
}
