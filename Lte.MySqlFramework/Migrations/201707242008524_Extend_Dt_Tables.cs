namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Extend_Dt_Tables : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AreaTestInfoes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FileId = c.Int(nullable: false),
                        Distance = c.Double(nullable: false),
                        Count = c.Int(nullable: false),
                        CoverageCount = c.Int(nullable: false),
                        TownId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.RasterFileDtInfoes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FileId = c.Int(nullable: false),
                        RasterNum = c.Int(nullable: false),
                        Count = c.Int(nullable: false),
                        CoverageCount = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.TownBoundaries", "AreaName", c => c.String(unicode: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.TownBoundaries", "AreaName");
            DropTable("dbo.RasterFileDtInfoes");
            DropTable("dbo.AreaTestInfoes");
        }
    }
}
