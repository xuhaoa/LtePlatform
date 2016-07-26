namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_OnlineSustain_Entity : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.OnlineSustains",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        BeginDate = c.DateTime(nullable: false, precision: 0),
                        TownId = c.Int(nullable: false),
                        SerialNumber = c.String(unicode: false),
                        DutyStaff = c.String(unicode: false),
                        ComplainCategory = c.Byte(nullable: false),
                        Address = c.String(unicode: false),
                        Issue = c.String(unicode: false),
                        SpecialResponse = c.String(unicode: false),
                        IsPreProcessed = c.Boolean(nullable: false),
                        WorkItemNumber = c.String(unicode: false),
                        Longtitute = c.Double(nullable: false),
                        Lattitute = c.Double(nullable: false),
                        FollowInfo = c.String(unicode: false),
                        FeedbackInfo = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.OnlineSustains");
        }
    }
}
