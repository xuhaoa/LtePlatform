namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_HotSpotDefs : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.HotSpotBtsIds",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        HotspotType = c.Byte(nullable: false),
                        HotspotName = c.String(unicode: false),
                        InfrastructureType = c.Byte(nullable: false),
                        BtsId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.HotSpotCdmaCellIds",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        HotspotType = c.Byte(nullable: false),
                        HotspotName = c.String(unicode: false),
                        InfrastructureType = c.Byte(nullable: false),
                        BtsId = c.Int(nullable: false),
                        SectorId = c.Byte(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.HotSpotCellIds",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        HotspotType = c.Byte(nullable: false),
                        HotspotName = c.String(unicode: false),
                        InfrastructureType = c.Byte(nullable: false),
                        ENodebId = c.Int(nullable: false),
                        SectorId = c.Byte(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.HotSpotENodebIds",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        HotspotType = c.Byte(nullable: false),
                        HotspotName = c.String(unicode: false),
                        InfrastructureType = c.Byte(nullable: false),
                        ENodebId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.HotSpotENodebIds");
            DropTable("dbo.HotSpotCellIds");
            DropTable("dbo.HotSpotCdmaCellIds");
            DropTable("dbo.HotSpotBtsIds");
        }
    }
}
