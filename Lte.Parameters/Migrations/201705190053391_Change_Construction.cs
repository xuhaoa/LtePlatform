namespace Lte.Parameters.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Change_Construction : DbMigration
    {
        public override void Up()
        {
            DropTable("dbo.Construction_Information");
            DropTable("dbo.Enodeb_Base");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Enodeb_Base",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FSLNO = c.String(maxLength: 200),
                        ENODEBID = c.Int(nullable: false),
                        ENODEBNAME = c.String(maxLength: 200),
                        LONGITUDE = c.Double(nullable: false),
                        LATITIUDE = c.Double(nullable: false),
                        INDOOR = c.String(maxLength: 2),
                        FSCNO = c.String(maxLength: 200),
                        SITENO = c.String(maxLength: 200),
                        AREA = c.String(maxLength: 200),
                        MKTCENTER = c.String(maxLength: 200),
                        ADDRESS = c.String(maxLength: 200),
                        REMARK = c.String(maxLength: 1000),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Construction_Information",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FSLNO = c.String(maxLength: 200),
                        SITENO = c.String(maxLength: 200),
                        CONSTRUCT_STAUS = c.String(maxLength: 200),
                        PLANNING_ENDOBENAME = c.String(maxLength: 200),
                        ISTRANSFER = c.String(maxLength: 200),
                        OPEN_TIME = c.DateTime(),
                        COMPLETED_TIME = c.DateTime(),
                        CONSTRCTION_TIME = c.DateTime(),
                        UPLOAD_TIME = c.DateTime(),
                        CONSTRUCTION_COMPANY = c.String(maxLength: 200),
                        CONSTRUCTION_WORK = c.String(maxLength: 200),
                        BLUEPRINT = c.String(maxLength: 200),
                    })
                .PrimaryKey(t => t.Id);
            
        }
    }
}
