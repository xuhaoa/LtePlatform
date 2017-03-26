namespace Lte.MySqlFramework.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Modify_MrGrid : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.MrGrids", "RsrpLevel", c => c.Byte(nullable: false));
            DropColumn("dbo.MrGrids", "Description");
        }
        
        public override void Down()
        {
            AddColumn("dbo.MrGrids", "Description", c => c.String(unicode: false));
            DropColumn("dbo.MrGrids", "RsrpLevel");
        }
    }
}
