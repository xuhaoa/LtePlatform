namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_BranchDemand : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BranchDemands",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        BeginDate = c.DateTime(nullable: false, precision: 0),
                        TownId = c.Int(nullable: false),
                        ComplainContents = c.String(unicode: false),
                        ProcessContents = c.String(unicode: false),
                        SolveFunction = c.Byte(nullable: false),
                        IsSolved = c.Boolean(nullable: false),
                        EndDate = c.DateTime(precision: 0),
                        Lontitute = c.Double(nullable: false),
                        Lattitute = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.BranchDemands");
        }
    }
}
