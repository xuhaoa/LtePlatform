namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Construct_ComplainItem : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ComplainItems",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SerialNumber = c.String(unicode: false),
                        TownId = c.Int(nullable: false),
                        ComplainSource = c.Byte(nullable: false),
                        BeginTime = c.DateTime(nullable: false, precision: 0),
                        City = c.String(unicode: false),
                        District = c.String(unicode: false),
                        RoadName = c.String(unicode: false),
                        BuildingName = c.String(unicode: false),
                        Longtitute = c.Double(nullable: false),
                        Lattitute = c.Double(nullable: false),
                        ComplainReason = c.Byte(nullable: false),
                        ComplainSubReason = c.Byte(nullable: false),
                        Grid = c.String(unicode: false),
                        NetworkType = c.Byte(nullable: false),
                        SitePosition = c.String(unicode: false),
                        IsIndoor = c.Boolean(nullable: false),
                        ComplainScene = c.Byte(nullable: false),
                        ComplainCategory = c.Byte(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.ComplainItems");
        }
    }
}
