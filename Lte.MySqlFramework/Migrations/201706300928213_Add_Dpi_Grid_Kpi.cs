namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Dpi_Grid_Kpi : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.DpiGridKpis",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        X = c.Int(nullable: false),
                        Y = c.Int(nullable: false),
                        FirstPacketDelay = c.Double(nullable: false),
                        FirstPacketDelayClass = c.Double(nullable: false),
                        PageOpenDelay = c.Double(nullable: false),
                        PageOpenDelayClass = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.DpiGridKpis");
        }
    }
}
