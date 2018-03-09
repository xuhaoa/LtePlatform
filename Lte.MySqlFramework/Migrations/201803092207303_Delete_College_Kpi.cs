namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Delete_College_Kpi : DbMigration
    {
        public override void Up()
        {
            DropTable("dbo.CollegeKpis");
        }
        
        public override void Down()
        {
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
    }
}
