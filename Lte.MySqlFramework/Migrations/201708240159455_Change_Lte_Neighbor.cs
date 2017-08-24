namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Change_Lte_Neighbor : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.LteNeighborCells",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CellId = c.Int(nullable: false),
                        SectorId = c.Byte(nullable: false),
                        NearestCellId = c.Int(nullable: false),
                        NearestSectorId = c.Byte(nullable: false),
                        Pci = c.Short(),
                        TotalTimes = c.Int(),
                        Discriminator = c.String(nullable: false, maxLength: 128, storeType: "nvarchar"),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.LteNeighborCells");
        }
    }
}
