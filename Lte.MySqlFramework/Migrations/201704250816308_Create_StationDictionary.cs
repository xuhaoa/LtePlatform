namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Create_StationDictionary : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.StationDictionaries",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StationNum = c.String(unicode: false),
                        ENodebId = c.Int(nullable: false),
                        PlanNum = c.String(unicode: false),
                        ElementName = c.String(unicode: false),
                        IsRru = c.Boolean(nullable: false),
                        ENodebName = c.String(unicode: false),
                        TotalRrus = c.Byte(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.StationDictionaries");
        }
    }
}
