namespace Lte.Parameters.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Change_CdmaCell : DbMigration
    {
        public override void Up()
        {
            DropTable("dbo.CdmaCells");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.CdmaCells",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        BtsId = c.Int(nullable: false),
                        SectorId = c.Byte(nullable: false),
                        CellType = c.String(),
                        Frequency = c.Int(nullable: false),
                        CellId = c.Int(nullable: false),
                        Lac = c.String(),
                        Pn = c.Short(nullable: false),
                        Longtitute = c.Double(nullable: false),
                        Lattitute = c.Double(nullable: false),
                        Height = c.Double(nullable: false),
                        MTilt = c.Double(nullable: false),
                        ETilt = c.Double(nullable: false),
                        Azimuth = c.Double(nullable: false),
                        AntennaGain = c.Double(nullable: false),
                        IsOutdoor = c.Boolean(nullable: false),
                        Frequency1 = c.Short(nullable: false),
                        Frequency2 = c.Short(nullable: false),
                        Frequency3 = c.Short(nullable: false),
                        Frequency4 = c.Short(nullable: false),
                        Frequency5 = c.Short(nullable: false),
                        Pci = c.Short(nullable: false),
                        RsPower = c.Double(nullable: false),
                        IsInUse = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
    }
}
