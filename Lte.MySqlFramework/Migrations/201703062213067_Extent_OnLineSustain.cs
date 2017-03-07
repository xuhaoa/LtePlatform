namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Extent_OnLineSustain : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.OnlineSustains", "ComplainSource", c => c.Byte(nullable: false));
            AddColumn("dbo.OnlineSustains", "ComplainReason", c => c.Byte(nullable: false));
            AddColumn("dbo.OnlineSustains", "ComplainSubReason", c => c.Byte(nullable: false));
            AddColumn("dbo.OnlineSustains", "Site", c => c.String(unicode: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.OnlineSustains", "Site");
            DropColumn("dbo.OnlineSustains", "ComplainSubReason");
            DropColumn("dbo.OnlineSustains", "ComplainReason");
            DropColumn("dbo.OnlineSustains", "ComplainSource");
        }
    }
}
