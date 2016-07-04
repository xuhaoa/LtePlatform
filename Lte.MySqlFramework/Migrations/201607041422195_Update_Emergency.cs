namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_Emergency : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.EmergencyFiberWorkItems",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        EmergencyId = c.Int(nullable: false),
                        WorkItemNumber = c.String(unicode: false),
                        Person = c.String(unicode: false),
                        BeginDate = c.DateTime(nullable: false, precision: 0),
                        FinishDate = c.DateTime(precision: 0),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.EmergencyProcesses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        EmergencyId = c.Int(nullable: false),
                        ProcessState = c.Byte(nullable: false),
                        ProcessTime = c.DateTime(nullable: false, precision: 0),
                        ProcessPerson = c.String(unicode: false),
                        ProcessInfo = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.EmergencyCommunications", "EmergencyState", c => c.Byte(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.EmergencyCommunications", "EmergencyState");
            DropTable("dbo.EmergencyProcesses");
            DropTable("dbo.EmergencyFiberWorkItems");
        }
    }
}
