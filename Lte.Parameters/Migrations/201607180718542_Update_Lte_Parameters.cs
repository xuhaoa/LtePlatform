namespace Lte.Parameters.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Update_Lte_Parameters : DbMigration
    {
        public override void Up()
        {
            DropTable("dbo.CdmaRegionStats");
            DropTable("dbo.TopConnection3GCell");
            DropTable("dbo.TopDrop2GCell");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.TopDrop2GCell",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StatTime = c.DateTime(nullable: false),
                        City = c.String(),
                        BtsId = c.Int(nullable: false),
                        CellId = c.Int(nullable: false),
                        SectorId = c.Byte(nullable: false),
                        Frequency = c.Short(nullable: false),
                        Drops = c.Int(nullable: false),
                        MoAssignmentSuccess = c.Int(nullable: false),
                        MtAssignmentSuccess = c.Int(nullable: false),
                        TrafficAssignmentSuccess = c.Int(nullable: false),
                        CallAttempts = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.TopConnection3GCell",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StatTime = c.DateTime(nullable: false),
                        City = c.String(),
                        BtsId = c.Int(nullable: false),
                        CellId = c.Int(nullable: false),
                        SectorId = c.Byte(nullable: false),
                        WirelessDrop = c.Int(nullable: false),
                        ConnectionAttempts = c.Int(nullable: false),
                        ConnectionFails = c.Int(nullable: false),
                        LinkBusyRate = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.CdmaRegionStats",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Region = c.String(),
                        StatDate = c.DateTime(nullable: false),
                        ErlangIncludingSwitch = c.Double(nullable: false),
                        ErlangExcludingSwitch = c.Double(nullable: false),
                        Drop2GNum = c.Int(nullable: false),
                        Drop2GDem = c.Int(nullable: false),
                        CallSetupNum = c.Int(nullable: false),
                        CallSetupDem = c.Int(nullable: false),
                        EcioNum = c.Long(nullable: false),
                        EcioDem = c.Long(nullable: false),
                        Utility2GNum = c.Int(nullable: false),
                        Utility2GDem = c.Int(nullable: false),
                        Flow = c.Double(nullable: false),
                        Erlang3G = c.Double(nullable: false),
                        Drop3GNum = c.Int(nullable: false),
                        Drop3GDem = c.Int(nullable: false),
                        ConnectionNum = c.Int(nullable: false),
                        ConnectionDem = c.Int(nullable: false),
                        CiNum = c.Long(nullable: false),
                        CiDem = c.Long(nullable: false),
                        LinkBusyNum = c.Int(nullable: false),
                        LinkBusyDem = c.Int(nullable: false),
                        DownSwitchNum = c.Long(nullable: false),
                        DownSwitchDem = c.Int(nullable: false),
                        Utility3GNum = c.Int(nullable: false),
                        Utility3GDem = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
    }
}
