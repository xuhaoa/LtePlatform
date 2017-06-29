namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_MrGrid_Cluster_Kpi : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.GridClusters",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Theme = c.String(unicode: false),
                        ClusterNumber = c.Int(nullable: false),
                        X = c.Int(nullable: false),
                        Y = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.MrGridKpis",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        X = c.Int(nullable: false),
                        Y = c.Int(nullable: false),
                        MrCount = c.Int(nullable: false),
                        WeakCount = c.Int(nullable: false),
                        Rsrp = c.Double(nullable: false),
                        MrCountNormalize = c.Int(nullable: false),
                        WeakCountNormalize = c.Int(nullable: false),
                        RsrpNormalize = c.Int(nullable: false),
                        ShortestDistance = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.MrGridKpis");
            DropTable("dbo.GridClusters");
        }
    }
}
