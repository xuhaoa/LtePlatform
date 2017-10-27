namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Remove_Old_DownSwitch : DbMigration
    {
        public override void Up()
        {
            DropTable("dbo.DownSwitchFlows");
        }
        
        public override void Down()
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
    }
}
