namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Agps_Coverage_Town : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AgpsCoverageTowns",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StatDate = c.DateTime(nullable: false, precision: 0),
                        District = c.String(unicode: false),
                        Town = c.String(unicode: false),
                        Operator = c.String(unicode: false),
                        Rsrp = c.Int(nullable: false),
                        Count = c.Int(nullable: false),
                        GoodCount = c.Int(nullable: false),
                        GoodCount105 = c.Int(nullable: false),
                        GoodCount100 = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.AgpsCoverageTowns");
        }
    }
}
