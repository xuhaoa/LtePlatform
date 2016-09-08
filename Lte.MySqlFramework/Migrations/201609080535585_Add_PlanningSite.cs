namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_PlanningSite : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.PlanningSites",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TownId = c.Int(nullable: false),
                        PlanNum = c.String(unicode: false),
                        PlanName = c.String(unicode: false),
                        FormalName = c.String(unicode: false),
                        Longtitute = c.Double(nullable: false),
                        Lattitute = c.Double(nullable: false),
                        TowerType = c.String(unicode: false),
                        AntennaHeight = c.Double(),
                        GottenDate = c.DateTime(precision: 0),
                        ContractDate = c.DateTime(precision: 0),
                        FinishedDate = c.DateTime(precision: 0),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.PlanningSites");
        }
    }
}
