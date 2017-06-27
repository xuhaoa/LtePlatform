namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Extend_Agis_Dt_Point : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AgisDtPoints", "X", c => c.Int(nullable: false));
            AddColumn("dbo.AgisDtPoints", "Y", c => c.Int(nullable: false));
            AddColumn("dbo.AgisDtPoints", "TelecomRate110", c => c.Double(nullable: false));
            AddColumn("dbo.AgisDtPoints", "TelecomRate105", c => c.Double(nullable: false));
            AddColumn("dbo.AgisDtPoints", "TelecomRate100", c => c.Double(nullable: false));
            AddColumn("dbo.AgisDtPoints", "MobileRate110", c => c.Double(nullable: false));
            AddColumn("dbo.AgisDtPoints", "MobileRate105", c => c.Double(nullable: false));
            AddColumn("dbo.AgisDtPoints", "MobileRate100", c => c.Double(nullable: false));
            AddColumn("dbo.AgisDtPoints", "UnicomRate110", c => c.Double(nullable: false));
            AddColumn("dbo.AgisDtPoints", "UnicomRate105", c => c.Double(nullable: false));
            AddColumn("dbo.AgisDtPoints", "UnicomRate100", c => c.Double(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.AgisDtPoints", "UnicomRate100");
            DropColumn("dbo.AgisDtPoints", "UnicomRate105");
            DropColumn("dbo.AgisDtPoints", "UnicomRate110");
            DropColumn("dbo.AgisDtPoints", "MobileRate100");
            DropColumn("dbo.AgisDtPoints", "MobileRate105");
            DropColumn("dbo.AgisDtPoints", "MobileRate110");
            DropColumn("dbo.AgisDtPoints", "TelecomRate100");
            DropColumn("dbo.AgisDtPoints", "TelecomRate105");
            DropColumn("dbo.AgisDtPoints", "TelecomRate110");
            DropColumn("dbo.AgisDtPoints", "Y");
            DropColumn("dbo.AgisDtPoints", "X");
        }
    }
}
