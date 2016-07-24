namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_CdmaRru : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CdmaRrus",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        BtsId = c.Int(nullable: false),
                        SectorId = c.Byte(nullable: false),
                        TrmId = c.Byte(nullable: false),
                        RruName = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.CdmaRrus");
        }
    }
}
