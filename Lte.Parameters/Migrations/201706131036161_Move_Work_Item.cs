namespace Lte.Parameters.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Move_Work_Item : DbMigration
    {
        public override void Up()
        {
            DropTable("dbo.WorkItems");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.WorkItems",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SerialNumber = c.String(),
                        Type = c.Byte(nullable: false),
                        Subtype = c.Short(nullable: false),
                        ENodebId = c.Int(nullable: false),
                        SectorId = c.Byte(nullable: false),
                        BeginTime = c.DateTime(nullable: false),
                        Deadline = c.DateTime(nullable: false),
                        RepeatTimes = c.Short(nullable: false),
                        RejectTimes = c.Short(nullable: false),
                        StaffName = c.String(),
                        FeedbackTime = c.DateTime(),
                        FinishTime = c.DateTime(),
                        Cause = c.Short(nullable: false),
                        State = c.Byte(nullable: false),
                        Comments = c.String(),
                        FeedbackContents = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
    }
}
