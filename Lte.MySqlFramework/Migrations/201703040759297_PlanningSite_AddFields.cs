namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class PlanningSite_AddFields : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PlanningSites", "TowerNum", c => c.String(unicode: false));
            AddColumn("dbo.PlanningSites", "TowerName", c => c.String(unicode: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.PlanningSites", "TowerName");
            DropColumn("dbo.PlanningSites", "TowerNum");
        }
    }
}
