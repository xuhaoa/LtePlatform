namespace Lte.Parameters.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Construction : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PreciseCoverage4G", "Neighbors0", c => c.Int(nullable: false));
            AddColumn("dbo.PreciseCoverage4G", "Neighbors1", c => c.Int(nullable: false));
            AddColumn("dbo.PreciseCoverage4G", "Neighbors2", c => c.Int(nullable: false));
            AddColumn("dbo.PreciseCoverage4G", "Neighbors3", c => c.Int(nullable: false));
            AddColumn("dbo.PreciseCoverage4G", "NeighborsMore", c => c.Int(nullable: false));
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
            DropColumn("dbo.PreciseCoverage4G", "NeighborsMore");
            DropColumn("dbo.PreciseCoverage4G", "Neighbors3");
            DropColumn("dbo.PreciseCoverage4G", "Neighbors2");
            DropColumn("dbo.PreciseCoverage4G", "Neighbors1");
            DropColumn("dbo.PreciseCoverage4G", "Neighbors0");
        }
    }
}
