namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_LteRru : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.LteRrus",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ENodebId = c.Int(nullable: false),
                        LocalSectorId = c.Byte(nullable: false),
                        RruName = c.String(unicode: false),
                        AntennaInfo = c.String(unicode: false),
                        AntennaFactory = c.Byte(nullable: false),
                        AntennaModel = c.String(unicode: false),
                        CanBeTilt = c.Boolean(nullable: false),
                        IsBeautify = c.String(unicode: false),
                        IsCa = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.LteRrus");
        }
    }
}
