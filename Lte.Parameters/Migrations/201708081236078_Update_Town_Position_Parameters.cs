namespace Lte.Parameters.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_Town_Position_Parameters : DbMigration
    {
        public override void Up()
        {
            DropTable("dbo.OptimizeRegions");
            DropTable("dbo.Towns");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Towns",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CityName = c.String(maxLength: 20),
                        DistrictName = c.String(maxLength: 20),
                        TownName = c.String(maxLength: 20),
                        Longtitute = c.Double(nullable: false),
                        Lattitute = c.Double(nullable: false),
                        AreaType = c.Byte(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.OptimizeRegions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        City = c.String(),
                        Region = c.String(),
                        District = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
    }
}
