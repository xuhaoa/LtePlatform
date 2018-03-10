namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_CoverageStat : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CoverageStats",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StatDate = c.DateTime(nullable: false, precision: 0),
                        ENodebId = c.Int(nullable: false),
                        SectorId = c.Byte(nullable: false),
                        TelecomMrs = c.Int(nullable: false),
                        UnicomMrs = c.Int(nullable: false),
                        MobileMrs = c.Int(nullable: false),
                        TelecomAbobe110 = c.Int(nullable: false),
                        MobileAbove110 = c.Int(nullable: false),
                        UnicomAbove110 = c.Int(nullable: false),
                        TelcomAbove105 = c.Int(nullable: false),
                        MobileAbove105 = c.Int(nullable: false),
                        UnicomAbove115 = c.Int(nullable: false),
                        TelcomAbove115 = c.Int(nullable: false),
                        MobileAbove115 = c.Int(nullable: false),
                        UnicomAbove105 = c.Int(nullable: false),
                        TelecomSum = c.Double(nullable: false),
                        MobileSum = c.Double(nullable: false),
                        UnicomSum = c.Double(nullable: false),
                        TelecomSumAbove110 = c.Double(nullable: false),
                        MobileSumAbove110 = c.Double(nullable: false),
                        UnicomSumAbove110 = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.CoverageStats");
        }
    }
}
