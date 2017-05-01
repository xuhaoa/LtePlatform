namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Distribution_System : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.DistributionSystems",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StationNum = c.String(unicode: false),
                        Name = c.String(unicode: false),
                        Address = c.String(unicode: false),
                        Longtitute = c.Double(nullable: false),
                        Lattitute = c.Double(nullable: false),
                        City = c.String(unicode: false),
                        District = c.String(unicode: false),
                        Server = c.String(unicode: false),
                        ServiceArea = c.String(unicode: false),
                        ScaleDescription = c.String(unicode: false),
                        Owner = c.String(unicode: false),
                        SourceAppliances = c.Byte(nullable: false),
                        OutdoorPicos = c.Byte(nullable: false),
                        OutdoorRepeaters = c.Byte(nullable: false),
                        OutdoorRrus = c.Byte(nullable: false),
                        IndoorPicos = c.Byte(nullable: false),
                        IndoorRepeaters = c.Byte(nullable: false),
                        IndoorRrus = c.Byte(nullable: false),
                        Amplifiers = c.Byte(nullable: false),
                        ENodebId = c.Int(nullable: false),
                        LteSectorId = c.Byte(nullable: false),
                        BtsId = c.Int(nullable: false),
                        CdmaSectorId = c.Byte(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.DistributionSystems");
        }
    }
}
