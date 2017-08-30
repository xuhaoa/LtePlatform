namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Change_ENodeb : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CdmaBts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ENodebId = c.Int(nullable: false),
                        Name = c.String(maxLength: 50, storeType: "nvarchar"),
                        TownId = c.Int(nullable: false),
                        Longtitute = c.Double(nullable: false),
                        Lattitute = c.Double(nullable: false),
                        Address = c.String(unicode: false),
                        BtsId = c.Int(nullable: false),
                        BscId = c.Short(nullable: false),
                        IsInUse = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ENodebs",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ENodebId = c.Int(nullable: false),
                        Name = c.String(maxLength: 50, storeType: "nvarchar"),
                        TownId = c.Int(nullable: false),
                        Longtitute = c.Double(nullable: false),
                        Lattitute = c.Double(nullable: false),
                        Factory = c.String(unicode: false),
                        IsFdd = c.Boolean(nullable: false),
                        Address = c.String(unicode: false),
                        Gateway = c.Int(nullable: false),
                        SubIp = c.Byte(nullable: false),
                        PlanNum = c.String(unicode: false),
                        OpenDate = c.DateTime(nullable: false, precision: 0),
                        IsInUse = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.ENodebs");
            DropTable("dbo.CdmaBts");
        }
    }
}
