namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Extend_ComplainItem : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ComplainItems", "SubscriberPhone", c => c.String(unicode: false));
            AddColumn("dbo.ComplainItems", "RepeatTimes", c => c.Byte(nullable: false));
            AddColumn("dbo.ComplainItems", "IsUrgent", c => c.Boolean(nullable: false));
            AddColumn("dbo.ComplainItems", "SubscriberInfo", c => c.String(unicode: false));
            AddColumn("dbo.ComplainItems", "ContactPhone", c => c.String(unicode: false));
            AddColumn("dbo.ComplainItems", "ContactPerson", c => c.String(unicode: false));
            AddColumn("dbo.ComplainItems", "ContactAddress", c => c.String(unicode: false));
            AddColumn("dbo.ComplainItems", "ManagerInfo", c => c.String(unicode: false));
            AddColumn("dbo.ComplainItems", "ComplainContents", c => c.String(unicode: false));
            AddColumn("dbo.ComplainItems", "BeginDate", c => c.DateTime(nullable: false, precision: 0));
            AddColumn("dbo.ComplainItems", "Deadline", c => c.DateTime(nullable: false, precision: 0));
            AddColumn("dbo.ComplainItems", "CurrentProcessor", c => c.String(unicode: false));
            AddColumn("dbo.ComplainItems", "ProcessTime", c => c.DateTime(nullable: false, precision: 0));
            AddColumn("dbo.ComplainItems", "OssSerialNumber", c => c.String(unicode: false));
            AddColumn("dbo.ComplainItems", "CauseLocation", c => c.String(unicode: false));
            AddColumn("dbo.ComplainItems", "PreProcessContents", c => c.String(unicode: false));
            AddColumn("dbo.ComplainItems", "IsSubscriber4G", c => c.Boolean(nullable: false));
            AddColumn("dbo.ComplainItems", "IndoorDescription", c => c.String(unicode: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ComplainItems", "IndoorDescription");
            DropColumn("dbo.ComplainItems", "IsSubscriber4G");
            DropColumn("dbo.ComplainItems", "PreProcessContents");
            DropColumn("dbo.ComplainItems", "CauseLocation");
            DropColumn("dbo.ComplainItems", "OssSerialNumber");
            DropColumn("dbo.ComplainItems", "ProcessTime");
            DropColumn("dbo.ComplainItems", "CurrentProcessor");
            DropColumn("dbo.ComplainItems", "Deadline");
            DropColumn("dbo.ComplainItems", "BeginDate");
            DropColumn("dbo.ComplainItems", "ComplainContents");
            DropColumn("dbo.ComplainItems", "ManagerInfo");
            DropColumn("dbo.ComplainItems", "ContactAddress");
            DropColumn("dbo.ComplainItems", "ContactPerson");
            DropColumn("dbo.ComplainItems", "ContactPhone");
            DropColumn("dbo.ComplainItems", "SubscriberInfo");
            DropColumn("dbo.ComplainItems", "IsUrgent");
            DropColumn("dbo.ComplainItems", "RepeatTimes");
            DropColumn("dbo.ComplainItems", "SubscriberPhone");
        }
    }
}
