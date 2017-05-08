namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_OnlineSustain : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ComplainProcesses", "ComplainScene", c => c.Byte(nullable: false));
            AddColumn("dbo.ComplainProcesses", "CustomerType1", c => c.Byte(nullable: false));
            AddColumn("dbo.ComplainProcesses", "CustomerType2", c => c.Byte(nullable: false));
            AddColumn("dbo.ComplainProcesses", "CustomerType3", c => c.Byte(nullable: false));
            AddColumn("dbo.ComplainProcesses", "ProcessSuggestion", c => c.String(unicode: false));
            AddColumn("dbo.ComplainProcesses", "BeginDate", c => c.DateTime(nullable: false, precision: 0));
            AddColumn("dbo.ComplainProcesses", "ProcessDate", c => c.DateTime(precision: 0));
            AddColumn("dbo.ComplainProcesses", "ReceiveLevel", c => c.Short());
            AddColumn("dbo.ComplainProcesses", "TransmitLevel", c => c.Short());
            AddColumn("dbo.ComplainProcesses", "Pn", c => c.Short());
            AddColumn("dbo.ComplainProcesses", "EcIo", c => c.Double());
            AddColumn("dbo.ComplainProcesses", "BtsName", c => c.String(unicode: false));
            AddColumn("dbo.ComplainProcesses", "BscId", c => c.Byte());
            AddColumn("dbo.ComplainProcesses", "BtsId", c => c.Int());
            AddColumn("dbo.ComplainProcesses", "CoverageLevel", c => c.Byte());
            AddColumn("dbo.ComplainProcesses", "ComplainCategory", c => c.Byte(nullable: false));
            AddColumn("dbo.ComplainProcesses", "IsResolved", c => c.Boolean(nullable: false));
            AddColumn("dbo.ComplainProcesses", "ResolveScheme", c => c.String(unicode: false));
            AddColumn("dbo.ComplainProcesses", "ResolveCauseDescription", c => c.String(unicode: false));
            AddColumn("dbo.ComplainProcesses", "PlanSite", c => c.String(unicode: false));
            AddColumn("dbo.ComplainProcesses", "ResolveDate", c => c.DateTime(precision: 0));
            AddColumn("dbo.OnlineSustains", "ComplainNumber", c => c.String(unicode: false));
            DropColumn("dbo.ComplainProcesses", "ComplainState");
            DropColumn("dbo.ComplainProcesses", "BeginTime");
            DropColumn("dbo.ComplainProcesses", "BeginInfo");
            DropColumn("dbo.ComplainProcesses", "ProcessTime");
            DropColumn("dbo.ComplainProcesses", "ProcessInfo");
            DropColumn("dbo.ComplainProcesses", "AttachFilePath");
            DropColumn("dbo.ComplainProcesses", "ContactPerson");
            DropColumn("dbo.OnlineSustains", "FollowInfo");
        }
        
        public override void Down()
        {
            AddColumn("dbo.OnlineSustains", "FollowInfo", c => c.String(unicode: false));
            AddColumn("dbo.ComplainProcesses", "ContactPerson", c => c.String(unicode: false));
            AddColumn("dbo.ComplainProcesses", "AttachFilePath", c => c.String(unicode: false));
            AddColumn("dbo.ComplainProcesses", "ProcessInfo", c => c.String(unicode: false));
            AddColumn("dbo.ComplainProcesses", "ProcessTime", c => c.DateTime(nullable: false, precision: 0));
            AddColumn("dbo.ComplainProcesses", "BeginInfo", c => c.String(unicode: false));
            AddColumn("dbo.ComplainProcesses", "BeginTime", c => c.DateTime(nullable: false, precision: 0));
            AddColumn("dbo.ComplainProcesses", "ComplainState", c => c.Byte(nullable: false));
            DropColumn("dbo.OnlineSustains", "ComplainNumber");
            DropColumn("dbo.ComplainProcesses", "ResolveDate");
            DropColumn("dbo.ComplainProcesses", "PlanSite");
            DropColumn("dbo.ComplainProcesses", "ResolveCauseDescription");
            DropColumn("dbo.ComplainProcesses", "ResolveScheme");
            DropColumn("dbo.ComplainProcesses", "IsResolved");
            DropColumn("dbo.ComplainProcesses", "ComplainCategory");
            DropColumn("dbo.ComplainProcesses", "CoverageLevel");
            DropColumn("dbo.ComplainProcesses", "BtsId");
            DropColumn("dbo.ComplainProcesses", "BscId");
            DropColumn("dbo.ComplainProcesses", "BtsName");
            DropColumn("dbo.ComplainProcesses", "EcIo");
            DropColumn("dbo.ComplainProcesses", "Pn");
            DropColumn("dbo.ComplainProcesses", "TransmitLevel");
            DropColumn("dbo.ComplainProcesses", "ReceiveLevel");
            DropColumn("dbo.ComplainProcesses", "ProcessDate");
            DropColumn("dbo.ComplainProcesses", "BeginDate");
            DropColumn("dbo.ComplainProcesses", "ProcessSuggestion");
            DropColumn("dbo.ComplainProcesses", "CustomerType3");
            DropColumn("dbo.ComplainProcesses", "CustomerType2");
            DropColumn("dbo.ComplainProcesses", "CustomerType1");
            DropColumn("dbo.ComplainProcesses", "ComplainScene");
        }
    }
}
