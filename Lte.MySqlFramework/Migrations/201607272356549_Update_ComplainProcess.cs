namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_ComplainProcess : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ComplainProcesses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SerialNumber = c.String(unicode: false),
                        ComplainState = c.Byte(nullable: false),
                        BeginTime = c.DateTime(nullable: false, precision: 0),
                        BeginInfo = c.String(unicode: false),
                        ProcessTime = c.DateTime(nullable: false, precision: 0),
                        ProcessPerson = c.String(unicode: false),
                        ProcessInfo = c.String(unicode: false),
                        AttachFilePath = c.String(unicode: false),
                        ContactPerson = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.ComplainItems", "ComplainState", c => c.Byte(nullable: false));
            AddColumn("dbo.EmergencyProcesses", "AttachFilePath", c => c.String(unicode: false));
            AddColumn("dbo.EmergencyProcesses", "ContactPerson", c => c.String(unicode: false));
            AddColumn("dbo.VipProcesses", "AttachFilePath", c => c.String(unicode: false));
            AddColumn("dbo.VipProcesses", "ContactPerson", c => c.String(unicode: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.VipProcesses", "ContactPerson");
            DropColumn("dbo.VipProcesses", "AttachFilePath");
            DropColumn("dbo.EmergencyProcesses", "ContactPerson");
            DropColumn("dbo.EmergencyProcesses", "AttachFilePath");
            DropColumn("dbo.ComplainItems", "ComplainState");
            DropTable("dbo.ComplainProcesses");
        }
    }
}
