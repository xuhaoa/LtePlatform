namespace Lte.Parameters.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Interference_Matrix_1221 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.InterferenceMatrixStats", "Earfcn", c => c.Int());
            AddColumn("dbo.InterferenceMatrixStats", "NeighborEarfcn", c => c.Int());
        }
        
        public override void Down()
        {
            DropColumn("dbo.InterferenceMatrixStats", "NeighborEarfcn");
            DropColumn("dbo.InterferenceMatrixStats", "Earfcn");
        }
    }
}
