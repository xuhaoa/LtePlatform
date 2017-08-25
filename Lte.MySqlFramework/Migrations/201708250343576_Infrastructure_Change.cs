namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Infrastructure_Change : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.IndoorDistributions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(unicode: false),
                        Range = c.String(unicode: false),
                        SourceName = c.String(unicode: false),
                        SourceType = c.String(unicode: false),
                        Longtitute = c.Double(nullable: false),
                        Lattitute = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.InfrastructureInfoes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        HotspotType = c.Byte(nullable: false),
                        HotspotName = c.String(unicode: false),
                        InfrastructureType = c.Byte(nullable: false),
                        InfrastructureId = c.Int(nullable: false),
                        Address = c.String(unicode: false),
                        SourceName = c.String(unicode: false),
                        Longtitute = c.Double(nullable: false),
                        Lattitute = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.InfrastructureInfoes");
            DropTable("dbo.IndoorDistributions");
        }
    }
}
