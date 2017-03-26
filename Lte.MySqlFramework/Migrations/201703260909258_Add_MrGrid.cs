namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_MrGrid : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.MrGrids",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StatDate = c.DateTime(nullable: false, precision: 0),
                        District = c.String(unicode: false),
                        Frequency = c.Int(nullable: false),
                        Description = c.String(unicode: false),
                        Coordinates = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.MrGrids");
        }
    }
}
