namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Users_to_TownStat : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.TownFlowStats", "AverageUsers", c => c.Double(nullable: false));
            AddColumn("dbo.TownFlowStats", "MaxUsers", c => c.Int(nullable: false));
            AddColumn("dbo.TownFlowStats", "AverageActiveUsers", c => c.Double(nullable: false));
            AddColumn("dbo.TownFlowStats", "MaxActiveUsers", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.TownFlowStats", "MaxActiveUsers");
            DropColumn("dbo.TownFlowStats", "AverageActiveUsers");
            DropColumn("dbo.TownFlowStats", "MaxUsers");
            DropColumn("dbo.TownFlowStats", "AverageUsers");
        }
    }
}
