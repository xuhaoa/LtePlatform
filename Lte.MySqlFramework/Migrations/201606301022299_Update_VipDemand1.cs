namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_VipDemand1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.VipDemands", "MarketTheme", c => c.Byte(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.VipDemands", "MarketTheme");
        }
    }
}
