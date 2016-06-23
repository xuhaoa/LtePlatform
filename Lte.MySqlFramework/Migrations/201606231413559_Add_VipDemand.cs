namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_VipDemand : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.VipDemands",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SerialNumber = c.String(unicode: false),
                        DemandLevel = c.Byte(nullable: false),
                        TownId = c.Int(nullable: false),
                        ProjectName = c.String(unicode: false),
                        NetworkType = c.Byte(nullable: false),
                        Department = c.String(unicode: false),
                        ContactPerson = c.String(unicode: false),
                        PhoneNumber = c.String(unicode: false),
                        Area = c.String(unicode: false),
                        BeginDate = c.DateTime(nullable: false, precision: 0),
                        PlanDate = c.DateTime(nullable: false, precision: 0),
                        ProjectContents = c.String(unicode: false),
                        SustainPerson = c.String(unicode: false),
                        FinishTime = c.DateTime(nullable: false, precision: 0),
                        SubscriberGotten = c.Int(nullable: false),
                        FinishResults = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.VipDemands");
        }
    }
}
