namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Town_Rrc : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TownRrcStats",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TownId = c.Int(nullable: false),
                        StatTime = c.DateTime(nullable: false, precision: 0),
                        MtAccessRrcRequest = c.Int(nullable: false),
                        MtAccessRrcSuccess = c.Int(nullable: false),
                        MtAccessRrcFail = c.Int(nullable: false),
                        MoSignallingRrcRequest = c.Int(nullable: false),
                        MoSignallingRrcSuccess = c.Int(nullable: false),
                        MoSignallingRrcFail = c.Int(nullable: false),
                        MoDataRrcRequest = c.Int(nullable: false),
                        MoDataRrcSuccess = c.Int(nullable: false),
                        MoDataRrcFail = c.Int(nullable: false),
                        HighPriorityRrcRequest = c.Int(nullable: false),
                        HighPriorityRrcSuccess = c.Int(nullable: false),
                        HighPriorityRrcFail = c.Int(nullable: false),
                        EmergencyRrcRequest = c.Int(nullable: false),
                        EmergencyRrcSuccess = c.Int(nullable: false),
                        EmergencyRrcFail = c.Int(nullable: false),
                        TotalRrcRequest = c.Int(nullable: false),
                        TotalRrcSuccess = c.Int(nullable: false),
                        TotalRrcFail = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.TownRrcStats");
        }
    }
}
