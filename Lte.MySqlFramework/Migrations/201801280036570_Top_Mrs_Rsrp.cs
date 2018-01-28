namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Top_Mrs_Rsrp : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TopMrsRsrps",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StatDate = c.DateTime(nullable: false, precision: 0),
                        ENodebId = c.Int(nullable: false),
                        SectorId = c.Byte(nullable: false),
                        RsrpBelow120 = c.Long(nullable: false),
                        Rsrp120To115 = c.Long(nullable: false),
                        Rsrp115To110 = c.Long(nullable: false),
                        Rsrp110To105 = c.Long(nullable: false),
                        Rsrp105To100 = c.Long(nullable: false),
                        Rsrp100To95 = c.Long(nullable: false),
                        Rsrp95To90 = c.Long(nullable: false),
                        Rsrp90To80 = c.Long(nullable: false),
                        Rsrp80To70 = c.Long(nullable: false),
                        Rsrp70To60 = c.Long(nullable: false),
                        RsrpAbove60 = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.TopMrsRsrps");
        }
    }
}
