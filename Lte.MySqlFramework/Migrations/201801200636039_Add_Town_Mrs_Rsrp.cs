namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Town_Mrs_Rsrp : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TownMrsRsrps",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StatDate = c.DateTime(nullable: false, precision: 0),
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
                        TownId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.TownMrsRsrps");
        }
    }
}
