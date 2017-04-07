namespace Lte.Parameters.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_Precise_Coverage_SQLServer : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PreciseCoverage4G", "Neighbors0", c => c.Int(nullable: false));
            AddColumn("dbo.PreciseCoverage4G", "Neighbors1", c => c.Int(nullable: false));
            AddColumn("dbo.PreciseCoverage4G", "Neighbors2", c => c.Int(nullable: false));
            AddColumn("dbo.PreciseCoverage4G", "Neighbors3", c => c.Int(nullable: false));
            AddColumn("dbo.PreciseCoverage4G", "NeighborsMore", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.PreciseCoverage4G", "NeighborsMore");
            DropColumn("dbo.PreciseCoverage4G", "Neighbors3");
            DropColumn("dbo.PreciseCoverage4G", "Neighbors2");
            DropColumn("dbo.PreciseCoverage4G", "Neighbors1");
            DropColumn("dbo.PreciseCoverage4G", "Neighbors0");
        }
    }
}
