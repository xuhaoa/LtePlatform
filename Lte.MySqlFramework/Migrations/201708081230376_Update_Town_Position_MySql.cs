namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_Town_Position_MySql : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AreaTestDates",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Area = c.String(unicode: false),
                        LatestTestDate2G = c.String(unicode: false),
                        LatestTestDate3G = c.String(unicode: false),
                        LatestTestDate4G = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.OptimizeRegions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        City = c.String(unicode: false),
                        Region = c.String(unicode: false),
                        District = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Towns",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CityName = c.String(maxLength: 20, storeType: "nvarchar"),
                        DistrictName = c.String(maxLength: 20, storeType: "nvarchar"),
                        TownName = c.String(maxLength: 20, storeType: "nvarchar"),
                        Longtitute = c.Double(nullable: false),
                        Lattitute = c.Double(nullable: false),
                        AreaType = c.Byte(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Towns");
            DropTable("dbo.OptimizeRegions");
            DropTable("dbo.AreaTestDates");
        }
    }
}
