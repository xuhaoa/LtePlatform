namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_Customer1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.DownSwitchFlows",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StatDate = c.DateTime(nullable: false, precision: 0),
                        City = c.String(unicode: false),
                        Region = c.String(unicode: false),
                        Flow4G = c.Double(nullable: false),
                        DownSwitchFlow3G = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.DownSwitchFlows");
        }
    }
}
