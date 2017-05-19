namespace Lte.Parameters.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Change_Construction1 : DbMigration
    {
        public override void Up()
        {
            DropTable("dbo.FSLEnodebs");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.FSLEnodebs",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FSLNO = c.String(maxLength: 200),
                        ENODEBID = c.Int(),
                        ENODEBNAME = c.String(maxLength: 200),
                        LONGITUDE = c.Double(),
                        LATITIUDE = c.Double(),
                        INDOOR = c.String(maxLength: 2),
                        FSCNO = c.String(maxLength: 200),
                        SITENO = c.String(maxLength: 200),
                        AREA = c.String(maxLength: 200),
                        MKTCENTER = c.String(maxLength: 200),
                        ADDRESS = c.String(maxLength: 200),
                        REMARK = c.String(maxLength: 1000),
                    })
                .PrimaryKey(t => t.Id);
            
        }
    }
}
