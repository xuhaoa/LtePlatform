namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Vip_Process : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.VipProcesses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SerialNumber = c.String(unicode: false),
                        VipState = c.Byte(nullable: false),
                        BeginTime = c.DateTime(nullable: false, precision: 0),
                        BeginInfo = c.String(unicode: false),
                        ProcessTime = c.DateTime(nullable: false, precision: 0),
                        ProcessPerson = c.String(unicode: false),
                        ProcessInfo = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.VipDemands", "VipState", c => c.Byte(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.VipDemands", "VipState");
            DropTable("dbo.VipProcesses");
        }
    }
}
