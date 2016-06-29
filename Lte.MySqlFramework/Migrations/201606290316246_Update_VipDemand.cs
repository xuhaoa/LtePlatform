namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_VipDemand : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.VipDemands", "ProcessInfo", c => c.String(unicode: false));
            AlterColumn("dbo.VipDemands", "FinishTime", c => c.DateTime(precision: 0));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.VipDemands", "FinishTime", c => c.DateTime(nullable: false, precision: 0));
            DropColumn("dbo.VipDemands", "ProcessInfo");
        }
    }
}
