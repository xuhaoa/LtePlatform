namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Change_College_Boundary : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CollegeInfoes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TownId = c.Int(nullable: false),
                        Name = c.String(unicode: false),
                        LastModificationTime = c.DateTime(precision: 0),
                        LastModifierUserId = c.Long(),
                        CreationTime = c.DateTime(nullable: false, precision: 0),
                        CreatorUserId = c.Long(),
                        CollegeRegion_AreaId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CollegeRegions", t => t.CollegeRegion_AreaId)
                .Index(t => t.CollegeRegion_AreaId);
            
            CreateTable(
                "dbo.CollegeRegions",
                c => new
                    {
                        AreaId = c.Int(nullable: false, identity: true),
                        Area = c.Double(nullable: false),
                        RegionType = c.Byte(nullable: false),
                        Info = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.AreaId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CollegeInfoes", "CollegeRegion_AreaId", "dbo.CollegeRegions");
            DropIndex("dbo.CollegeInfoes", new[] { "CollegeRegion_AreaId" });
            DropTable("dbo.CollegeRegions");
            DropTable("dbo.CollegeInfoes");
        }
    }
}
