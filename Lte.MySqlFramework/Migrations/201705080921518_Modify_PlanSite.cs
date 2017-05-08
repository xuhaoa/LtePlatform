namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Modify_PlanSite : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PlanningSites", "SiteCategory", c => c.String(unicode: false));
            AddColumn("dbo.PlanningSites", "SiteSource", c => c.String(unicode: false));
            AddColumn("dbo.PlanningSites", "ShouzuShuoming", c => c.String(unicode: false));
            AddColumn("dbo.PlanningSites", "CompleteDate", c => c.DateTime(precision: 0));
            AddColumn("dbo.PlanningSites", "YanshouDate", c => c.DateTime(precision: 0));
            AddColumn("dbo.PlanningSites", "IsGotton", c => c.Boolean(nullable: false));
            AddColumn("dbo.PlanningSites", "TowerContaction", c => c.String(unicode: false));
            AddColumn("dbo.PlanningSites", "TowerScheme", c => c.String(unicode: false));
            AddColumn("dbo.PlanningSites", "TowerSiteName", c => c.String(unicode: false));
            AddColumn("dbo.PlanningSites", "AntennaType", c => c.String(unicode: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.PlanningSites", "AntennaType");
            DropColumn("dbo.PlanningSites", "TowerSiteName");
            DropColumn("dbo.PlanningSites", "TowerScheme");
            DropColumn("dbo.PlanningSites", "TowerContaction");
            DropColumn("dbo.PlanningSites", "IsGotton");
            DropColumn("dbo.PlanningSites", "YanshouDate");
            DropColumn("dbo.PlanningSites", "CompleteDate");
            DropColumn("dbo.PlanningSites", "ShouzuShuoming");
            DropColumn("dbo.PlanningSites", "SiteSource");
            DropColumn("dbo.PlanningSites", "SiteCategory");
        }
    }
}
