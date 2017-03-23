namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_AgisDtPoints : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AgisDtPoints",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Operator = c.String(unicode: false),
                        Longtitute = c.Double(nullable: false),
                        Lattitute = c.Double(nullable: false),
                        UnicomRsrp = c.Double(nullable: false),
                        MobileRsrp = c.Double(nullable: false),
                        TelecomRsrp = c.Double(nullable: false),
                        StatDate = c.DateTime(nullable: false, precision: 0),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.AgisDtPoints");
        }
    }
}
