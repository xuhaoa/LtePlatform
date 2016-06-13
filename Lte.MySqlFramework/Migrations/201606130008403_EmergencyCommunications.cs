namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EmergencyCommunications : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.EmergencyCommunications",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DemandLevel = c.Byte(nullable: false),
                        ProjectName = c.String(unicode: false),
                        ExpectedPeople = c.Int(nullable: false),
                        BeginDate = c.DateTime(nullable: false, precision: 0),
                        EndDate = c.DateTime(nullable: false, precision: 0),
                        VehicleType = c.Short(nullable: false),
                        Vehicles = c.Byte(nullable: false),
                        TransmitFunction = c.String(unicode: false),
                        ElectricSupply = c.String(unicode: false),
                        Area = c.String(unicode: false),
                        Department = c.String(unicode: false),
                        ContactPerson = c.String(unicode: false),
                        Description = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.EmergencyCommunications");
        }
    }
}
