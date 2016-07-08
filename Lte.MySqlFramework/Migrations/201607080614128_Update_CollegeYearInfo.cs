namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_CollegeYearInfo : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CollegeYearInfoes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CollegeId = c.Int(nullable: false),
                        Year = c.Int(nullable: false),
                        TotalStudents = c.Int(nullable: false),
                        CurrentSubscribers = c.Int(nullable: false),
                        GraduateStudents = c.Int(nullable: false),
                        NewSubscribers = c.Int(nullable: false),
                        OldOpenDate = c.DateTime(nullable: false, precision: 0),
                        NewOpenDate = c.DateTime(nullable: false, precision: 0),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.CollegeYearInfoes");
        }
    }
}
