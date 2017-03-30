namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_App_Record : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AppSteams",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Meid = c.String(unicode: false),
                        PhoneType = c.String(unicode: false),
                        Longtitute = c.Double(nullable: false),
                        Lattitute = c.Double(nullable: false),
                        LocationDesc = c.String(unicode: false),
                        NetType = c.String(unicode: false),
                        Apn = c.String(unicode: false),
                        LteCi = c.String(unicode: false),
                        LteRsrp = c.Double(nullable: false),
                        LteSinr = c.Double(nullable: false),
                        VideoName = c.String(unicode: false),
                        VideoUrl = c.String(unicode: false),
                        StatDate = c.DateTime(nullable: false, precision: 0),
                        VideoAvgSpeed = c.Double(nullable: false),
                        VideoPeakSpeed = c.Double(nullable: false),
                        TotalVideoSize = c.Double(nullable: false),
                        BufferCounter = c.Int(nullable: false),
                        VideoSize = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.WebBrowsings",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Meid = c.String(unicode: false),
                        PhoneType = c.String(unicode: false),
                        Longtitute = c.Double(nullable: false),
                        Lattitute = c.Double(nullable: false),
                        StatDate = c.DateTime(nullable: false, precision: 0),
                        LocationDesc = c.String(unicode: false),
                        NetType = c.String(unicode: false),
                        Apn = c.String(unicode: false),
                        LteCi = c.String(unicode: false),
                        LteRsrp = c.Double(nullable: false),
                        LteSinr = c.Double(nullable: false),
                        WebsiteName = c.String(unicode: false),
                        PageUrl = c.String(unicode: false),
                        FirstByteDelay = c.Int(nullable: false),
                        PageOpenDelay = c.Int(nullable: false),
                        DnsDelay = c.Int(nullable: false),
                        ConnectionDelay = c.Int(nullable: false),
                        RequestDelay = c.Int(nullable: false),
                        ResponseDelay = c.Int(nullable: false),
                        PageSize = c.Double(nullable: false),
                        PageAvgSpeed = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.WebBrowsings");
            DropTable("dbo.AppSteams");
        }
    }
}
