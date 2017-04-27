namespace Lte.Parameters.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Construction_Update : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.FSLEnodebs", "ENODEBID", c => c.Int());
            AddColumn("dbo.FSLEnodebs", "ENODEBNAME", c => c.String(maxLength: 200));
            AddColumn("dbo.FSLEnodebs", "LONGITUDE", c => c.Double());
            AddColumn("dbo.FSLEnodebs", "LATITIUDE", c => c.Double());
            AddColumn("dbo.FSLEnodebs", "INDOOR", c => c.String(maxLength: 2));
            AddColumn("dbo.FSLEnodebs", "FSCNO", c => c.String(maxLength: 200));
            AddColumn("dbo.FSLEnodebs", "SITENO", c => c.String(maxLength: 200));
            AddColumn("dbo.FSLEnodebs", "AREA", c => c.String(maxLength: 200));
            AddColumn("dbo.FSLEnodebs", "MKTCENTER", c => c.String(maxLength: 200));
            AddColumn("dbo.FSLEnodebs", "ADDRESS", c => c.String(maxLength: 200));
            AddColumn("dbo.FSLEnodebs", "REMARK", c => c.String(maxLength: 1000));
            AlterColumn("dbo.Construction_Information", "OPEN_TIME", c => c.DateTime());
            AlterColumn("dbo.Construction_Information", "COMPLETED_TIME", c => c.DateTime());
            AlterColumn("dbo.Construction_Information", "CONSTRCTION_TIME", c => c.DateTime());
            AlterColumn("dbo.Construction_Information", "UPLOAD_TIME", c => c.DateTime());
            AlterColumn("dbo.FSLEnodebs", "FSLNO", c => c.String(maxLength: 200));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.FSLEnodebs", "FSLNO", c => c.String());
            AlterColumn("dbo.Construction_Information", "UPLOAD_TIME", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Construction_Information", "CONSTRCTION_TIME", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Construction_Information", "COMPLETED_TIME", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Construction_Information", "OPEN_TIME", c => c.DateTime(nullable: false));
            DropColumn("dbo.FSLEnodebs", "REMARK");
            DropColumn("dbo.FSLEnodebs", "ADDRESS");
            DropColumn("dbo.FSLEnodebs", "MKTCENTER");
            DropColumn("dbo.FSLEnodebs", "AREA");
            DropColumn("dbo.FSLEnodebs", "SITENO");
            DropColumn("dbo.FSLEnodebs", "FSCNO");
            DropColumn("dbo.FSLEnodebs", "INDOOR");
            DropColumn("dbo.FSLEnodebs", "LATITIUDE");
            DropColumn("dbo.FSLEnodebs", "LONGITUDE");
            DropColumn("dbo.FSLEnodebs", "ENODEBNAME");
            DropColumn("dbo.FSLEnodebs", "ENODEBID");
        }
    }
}
