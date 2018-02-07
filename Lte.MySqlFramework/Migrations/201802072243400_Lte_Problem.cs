namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Lte_Problem : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.LteProblems",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Type = c.String(unicode: false),
                        Body = c.String(unicode: false),
                        Choices = c.Int(nullable: false),
                        ChoiceA = c.String(unicode: false),
                        ChoiceB = c.String(unicode: false),
                        ChoiceC = c.String(unicode: false),
                        ChoiceD = c.String(unicode: false),
                        ChoiceE = c.String(unicode: false),
                        ChoiceF = c.String(unicode: false),
                        Answer = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.LteProblems");
        }
    }
}
