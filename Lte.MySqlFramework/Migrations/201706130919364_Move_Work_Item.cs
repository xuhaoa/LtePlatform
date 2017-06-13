namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Move_Work_Item : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.WorkItems",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SerialNumber = c.String(unicode: false),
                        Type = c.Byte(nullable: false),
                        Subtype = c.Short(nullable: false),
                        ENodebId = c.Int(nullable: false),
                        SectorId = c.Byte(nullable: false),
                        BeginTime = c.DateTime(nullable: false, precision: 0),
                        Deadline = c.DateTime(nullable: false, precision: 0),
                        RepeatTimes = c.Short(nullable: false),
                        RejectTimes = c.Short(nullable: false),
                        StaffName = c.String(unicode: false),
                        FeedbackTime = c.DateTime(precision: 0),
                        FinishTime = c.DateTime(precision: 0),
                        Cause = c.Short(nullable: false),
                        State = c.Byte(nullable: false),
                        Comments = c.String(unicode: false),
                        FeedbackContents = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.WorkItems");
        }
    }
}
