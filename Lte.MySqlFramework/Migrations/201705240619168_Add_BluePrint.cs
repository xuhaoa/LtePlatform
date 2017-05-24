namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_BluePrint : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BluePrints",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FslNumber = c.String(unicode: false),
                        FileName = c.String(unicode: false),
                        Folder = c.String(unicode: false),
                        DesignBrief = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.BluePrints");
        }
    }
}
