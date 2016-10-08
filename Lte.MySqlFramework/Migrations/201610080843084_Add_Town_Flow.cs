namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Town_Flow : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TownFlowStats",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TownId = c.Int(nullable: false),
                        StatTime = c.DateTime(nullable: false, precision: 0),
                        PdcpDownlinkFlow = c.Double(nullable: false),
                        PdcpUplinkFlow = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.TownFlowStats");
        }
    }
}
