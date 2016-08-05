namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Move_College_Test_Entity : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.College3GTestResults",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CollegeId = c.Int(nullable: false),
                        TestTime = c.DateTime(nullable: false, precision: 0),
                        DownloadRate = c.Double(nullable: false),
                        AccessUsers = c.Int(nullable: false),
                        MinRssi = c.Double(nullable: false),
                        MaxRssi = c.Double(nullable: false),
                        Vswr = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.College4GTestResults",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CollegeId = c.Int(nullable: false),
                        TestTime = c.DateTime(nullable: false, precision: 0),
                        DownloadRate = c.Double(nullable: false),
                        UploadRate = c.Double(nullable: false),
                        ENodebId = c.Int(nullable: false),
                        SectorId = c.Byte(nullable: false),
                        AccessUsers = c.Int(nullable: false),
                        Rsrp = c.Double(nullable: false),
                        Sinr = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.CollegeKpis",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CollegeId = c.Int(nullable: false),
                        TestTime = c.DateTime(nullable: false, precision: 0),
                        OnlineUsers = c.Int(nullable: false),
                        DownloadFlow = c.Double(nullable: false),
                        UploadFlow = c.Double(nullable: false),
                        RrcConnection = c.Double(nullable: false),
                        ErabConnection = c.Double(nullable: false),
                        ErabDrop = c.Double(nullable: false),
                        Connection2G = c.Double(nullable: false),
                        Connection3G = c.Double(nullable: false),
                        Erlang3G = c.Double(nullable: false),
                        Drop3G = c.Double(nullable: false),
                        Flow3G = c.Double(nullable: false),
                        LastModificationTime = c.DateTime(precision: 0),
                        LastModifierUserId = c.Long(),
                        CreationTime = c.DateTime(nullable: false, precision: 0),
                        CreatorUserId = c.Long(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.CollegeKpis");
            DropTable("dbo.College4GTestResults");
            DropTable("dbo.College3GTestResults");
        }
    }
}
