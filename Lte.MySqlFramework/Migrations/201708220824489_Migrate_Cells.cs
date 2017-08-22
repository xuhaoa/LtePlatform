namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Migrate_Cells : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Cells",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ENodebId = c.Int(nullable: false),
                        SectorId = c.Byte(nullable: false),
                        LocalSectorId = c.Byte(nullable: false),
                        Frequency = c.Int(nullable: false),
                        BandClass = c.Byte(nullable: false),
                        Pci = c.Short(nullable: false),
                        Prach = c.Short(nullable: false),
                        RsPower = c.Double(nullable: false),
                        IsOutdoor = c.Boolean(nullable: false),
                        Tac = c.Int(nullable: false),
                        Longtitute = c.Double(nullable: false),
                        Lattitute = c.Double(nullable: false),
                        Height = c.Double(nullable: false),
                        Azimuth = c.Double(nullable: false),
                        MTilt = c.Double(nullable: false),
                        ETilt = c.Double(nullable: false),
                        AntennaGain = c.Double(nullable: false),
                        AntennaPorts = c.Int(nullable: false),
                        IsInUse = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Cells");
        }
    }
}
