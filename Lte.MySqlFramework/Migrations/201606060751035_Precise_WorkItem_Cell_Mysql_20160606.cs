namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Precise_WorkItem_Cell_Mysql_20160606 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.PreciseWorkItemCells",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ENodebId = c.Int(nullable: false),
                        SectorId = c.Byte(nullable: false),
                        Db6Share = c.Double(nullable: false),
                        Db10Share = c.Double(nullable: false),
                        Mod3Share = c.Double(nullable: false),
                        WeakCoverageRate = c.Double(nullable: false),
                        OriginalDownTilt = c.Double(nullable: false),
                        OriginalRsPower = c.Double(nullable: false),
                        AdjustDownTilt = c.Double(nullable: false),
                        AdjustRsPower = c.Double(nullable: false),
                        BeginDate = c.DateTime(precision: 0),
                        FininshDate = c.DateTime(precision: 0),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.PreciseWorkItemCells");
        }
    }
}
