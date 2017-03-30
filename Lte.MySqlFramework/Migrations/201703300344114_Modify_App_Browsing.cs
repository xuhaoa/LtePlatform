namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Modify_App_Browsing : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AppSteams", "Imsi", c => c.String(unicode: false));
            AddColumn("dbo.WebBrowsings", "Imsi", c => c.String(unicode: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.WebBrowsings", "Imsi");
            DropColumn("dbo.AppSteams", "Imsi");
        }
    }
}
