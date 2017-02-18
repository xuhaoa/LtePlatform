namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class rrc_zte_add_fields : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RrcZtes", "HighPriorityAccessRrcSuccess", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "HighPriorityAccessRrcFailTimer", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "HighPriorityAccessRrcFailAllow", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "HighPriorityAccessRrcFailOther", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "EmergencyRrcSuccess", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "EmergencyRrcFailTimer", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "EmergencyRrcFailAllow", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "EmergencyRrcFailOther", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "RrcTotalDuration", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "RrcMaxDuration", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "RrcReleaseTimer", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "RrcReleaseUeContextTimer", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "RrcReleaseBadRsrp", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "RrcReleaseRlcMaxRetransmit", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "RrcReleasePdcpIntegrationFail", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "RrcReleaseGptu", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "RrcReleasePathMalfunction", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "RrcReleaseFiber", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "RrcReleaseUeExit", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "RrcReleaseInterSiteReconstruction", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "RrcReleaseRedirect", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "RrcReleaseRadioLink", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "RrcReleaseReconstructionFail", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "RrcReleaseS1", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "RrcReleaseMmeOther", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "RrcReleaseSwitchFail", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "MtAccessRrcRequest", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "MoSignallingRrcRequest", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "MoDataRrcRequest", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "HighPriorityAccessRrcRequest", c => c.Int(nullable: false));
            AddColumn("dbo.RrcZtes", "EmergencyRrcRequest", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.RrcZtes", "EmergencyRrcRequest");
            DropColumn("dbo.RrcZtes", "HighPriorityAccessRrcRequest");
            DropColumn("dbo.RrcZtes", "MoDataRrcRequest");
            DropColumn("dbo.RrcZtes", "MoSignallingRrcRequest");
            DropColumn("dbo.RrcZtes", "MtAccessRrcRequest");
            DropColumn("dbo.RrcZtes", "RrcReleaseSwitchFail");
            DropColumn("dbo.RrcZtes", "RrcReleaseMmeOther");
            DropColumn("dbo.RrcZtes", "RrcReleaseS1");
            DropColumn("dbo.RrcZtes", "RrcReleaseReconstructionFail");
            DropColumn("dbo.RrcZtes", "RrcReleaseRadioLink");
            DropColumn("dbo.RrcZtes", "RrcReleaseRedirect");
            DropColumn("dbo.RrcZtes", "RrcReleaseInterSiteReconstruction");
            DropColumn("dbo.RrcZtes", "RrcReleaseUeExit");
            DropColumn("dbo.RrcZtes", "RrcReleaseFiber");
            DropColumn("dbo.RrcZtes", "RrcReleasePathMalfunction");
            DropColumn("dbo.RrcZtes", "RrcReleaseGptu");
            DropColumn("dbo.RrcZtes", "RrcReleasePdcpIntegrationFail");
            DropColumn("dbo.RrcZtes", "RrcReleaseRlcMaxRetransmit");
            DropColumn("dbo.RrcZtes", "RrcReleaseBadRsrp");
            DropColumn("dbo.RrcZtes", "RrcReleaseUeContextTimer");
            DropColumn("dbo.RrcZtes", "RrcReleaseTimer");
            DropColumn("dbo.RrcZtes", "RrcMaxDuration");
            DropColumn("dbo.RrcZtes", "RrcTotalDuration");
            DropColumn("dbo.RrcZtes", "EmergencyRrcFailOther");
            DropColumn("dbo.RrcZtes", "EmergencyRrcFailAllow");
            DropColumn("dbo.RrcZtes", "EmergencyRrcFailTimer");
            DropColumn("dbo.RrcZtes", "EmergencyRrcSuccess");
            DropColumn("dbo.RrcZtes", "HighPriorityAccessRrcFailOther");
            DropColumn("dbo.RrcZtes", "HighPriorityAccessRrcFailAllow");
            DropColumn("dbo.RrcZtes", "HighPriorityAccessRrcFailTimer");
            DropColumn("dbo.RrcZtes", "HighPriorityAccessRrcSuccess");
        }
    }
}
