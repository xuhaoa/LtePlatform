namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Migrate_Basic_Dt : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CsvFilesInfoes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TestDate = c.DateTime(nullable: false, precision: 0),
                        CsvFileName = c.String(unicode: false),
                        Distance = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.RasterInfoes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Longtitute = c.Double(nullable: false),
                        Lattitute = c.Double(nullable: false),
                        Area = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.RasterTestInfoes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RasterNum = c.Int(nullable: false),
                        CsvFilesName = c.String(unicode: false),
                        NetworkType = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.RasterTestInfoes");
            DropTable("dbo.RasterInfoes");
            DropTable("dbo.CsvFilesInfoes");
        }
    }
}
