namespace Lte.Parameters.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_Precise_Coverage_SQLServer1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.TownPreciseCoverage4GStat", "NeighborsMore", c => c.Int(nullable: false));
            AddColumn("dbo.TownPreciseCoverage4GStat", "InterFirstNeighbors", c => c.Int(nullable: false));
            AddColumn("dbo.TownPreciseCoverage4GStat", "InterSecondNeighbors", c => c.Int(nullable: false));
            AddColumn("dbo.TownPreciseCoverage4GStat", "InterThirdNeighbors", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.TownPreciseCoverage4GStat", "InterThirdNeighbors");
            DropColumn("dbo.TownPreciseCoverage4GStat", "InterSecondNeighbors");
            DropColumn("dbo.TownPreciseCoverage4GStat", "InterFirstNeighbors");
            DropColumn("dbo.TownPreciseCoverage4GStat", "NeighborsMore");
        }
    }
}
