namespace Lte.Parameters.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Change_Lte_Neighbor : DbMigration
    {
        public override void Up()
        {
            DropTable("dbo.LteNeighborCells");
        }
        
        public override void Down()
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
                        Discriminator = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.Id);
            
        }
    }
}
