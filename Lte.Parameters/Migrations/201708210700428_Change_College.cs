namespace Lte.Parameters.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Change_College : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.CollegeInfoes", "CollegeRegion_AreaId", "dbo.CollegeRegions");
            DropIndex("dbo.CollegeInfoes", new[] { "CollegeRegion_AreaId" });
            DropTable("dbo.CollegeInfoes");
            DropTable("dbo.CollegeRegions");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.CollegeRegions",
                c => new
                    {
                        AreaId = c.Int(nullable: false, identity: true),
                        Area = c.Double(nullable: false),
                        RegionType = c.Byte(nullable: false),
                        Info = c.String(),
                    })
                .PrimaryKey(t => t.AreaId);
            
            CreateTable(
                "dbo.CollegeInfoes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TownId = c.Int(nullable: false),
                        Name = c.String(),
                        LastModificationTime = c.DateTime(),
                        LastModifierUserId = c.Long(),
                        CreationTime = c.DateTime(nullable: false),
                        CreatorUserId = c.Long(),
                        CollegeRegion_AreaId = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateIndex("dbo.CollegeInfoes", "CollegeRegion_AreaId");
            AddForeignKey("dbo.CollegeInfoes", "CollegeRegion_AreaId", "dbo.CollegeRegions", "AreaId");
        }
    }
}
