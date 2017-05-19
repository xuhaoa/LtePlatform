namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Change_Construction : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ConstructionInformations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FSLNO = c.String(maxLength: 200, storeType: "nvarchar"),
                        SITENO = c.String(maxLength: 200, storeType: "nvarchar"),
                        CONSTRUCT_STAUS = c.String(maxLength: 200, storeType: "nvarchar"),
                        PLANNING_ENDOBENAME = c.String(maxLength: 200, storeType: "nvarchar"),
                        ISTRANSFER = c.String(maxLength: 200, storeType: "nvarchar"),
                        OPEN_TIME = c.DateTime(precision: 0),
                        COMPLETED_TIME = c.DateTime(precision: 0),
                        CONSTRCTION_TIME = c.DateTime(precision: 0),
                        UPLOAD_TIME = c.DateTime(precision: 0),
                        CONSTRUCTION_COMPANY = c.String(maxLength: 200, storeType: "nvarchar"),
                        CONSTRUCTION_WORK = c.String(maxLength: 200, storeType: "nvarchar"),
                        BLUEPRINT = c.String(maxLength: 200, storeType: "nvarchar"),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ENodebBases",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FSLNO = c.String(maxLength: 200, storeType: "nvarchar"),
                        ENODEBID = c.Int(nullable: false),
                        ENODEBNAME = c.String(maxLength: 200, storeType: "nvarchar"),
                        LONGITUDE = c.Double(nullable: false),
                        LATITIUDE = c.Double(nullable: false),
                        INDOOR = c.String(maxLength: 2, storeType: "nvarchar"),
                        FSCNO = c.String(maxLength: 200, storeType: "nvarchar"),
                        SITENO = c.String(maxLength: 200, storeType: "nvarchar"),
                        AREA = c.String(maxLength: 200, storeType: "nvarchar"),
                        MKTCENTER = c.String(maxLength: 200, storeType: "nvarchar"),
                        ADDRESS = c.String(maxLength: 200, storeType: "nvarchar"),
                        REMARK = c.String(maxLength: 1000, storeType: "nvarchar"),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.ENodebBases");
            DropTable("dbo.ConstructionInformations");
        }
    }
}
