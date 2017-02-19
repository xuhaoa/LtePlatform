namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class rrc_huawei_add_fields : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.RrcHuaweis",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StatTime = c.DateTime(nullable: false, precision: 0),
                        ENodebId = c.Int(nullable: false),
                        LocalCellId = c.Byte(nullable: false),
                        EmergencyRrcRequest = c.Int(nullable: false),
                        EmergencyRrcRequestAll = c.Int(nullable: false),
                        EmergencyRrcSuccess = c.Int(nullable: false),
                        HighPriorityRrcRequest = c.Int(nullable: false),
                        HighPriorityRrcRequestAll = c.Int(nullable: false),
                        HighPriorityRrcSuccess = c.Int(nullable: false),
                        MoDataRrcRequest = c.Int(nullable: false),
                        MoDataRrcRequestAll = c.Int(nullable: false),
                        MoDataRrcSuccess = c.Int(nullable: false),
                        MoSignallingRrcRequest = c.Int(nullable: false),
                        MoSignallingRrcRequestAll = c.Int(nullable: false),
                        MoSignallingRrcSuccess = c.Int(nullable: false),
                        MtAccessRrcRequest = c.Int(nullable: false),
                        MtAccessRrcRequestAll = c.Int(nullable: false),
                        MtAccessRrcSuccess = c.Int(nullable: false),
                        RrcFailOtherResource = c.Int(nullable: false),
                        RrcFailUserLimit = c.Int(nullable: false),
                        RrcRejectFail = c.Int(nullable: false),
                        RrcRejectOverload = c.Int(nullable: false),
                        RrcReconstructionLostFlowControl = c.Int(nullable: false),
                        RrcRequestLostFlowControl = c.Int(nullable: false),
                        RrcFailResourceAssignment = c.Int(nullable: false),
                        RrcFailUeNoAnswer = c.Int(nullable: false),
                        RrcFailSrsAssignment = c.Int(nullable: false),
                        RrcFailPucchAssignment = c.Int(nullable: false),
                        RrcRejectFlowControl = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.RrcHuaweis");
        }
    }
}
